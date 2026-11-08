import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { handler, retrieveBusaraEvidence } from '../netlify/functions/analyze.mjs';

const report = {
  executive_summary: { finding: 'Test finding', importance: 'Test importance', recommended_next_step: 'Test step', confidence: 'moderate' },
  diagnosis: { target_behaviour: 'Pay market fee', current_position: 'Unknown', observations: [], barriers: [], unknowns: [] },
  recommendations: [],
  measurement: { primary_outcome: 'Payment', sample_size: null },
};

test('retrieval favours topic and sector matches and abstains on unrelated queries', () => {
  const tax = retrieveBusaraEvidence({ behaviour: 'tax compliance fees', domain: 'Civic Trust & Tax Compliance', geography: 'Nigeria' });
  assert.equal(tax.status, 'matched');
  assert.ok(tax.documents.length > 0);
  assert.match(tax.documents[0].title, /tax|compliance/i);

  const unrelated = retrieveBusaraEvidence({ text: 'black holes and astronomy', domain: 'space science' });
  assert.equal(unrelated.status, 'no_relevant_sources');
  assert.equal(unrelated.documents.length, 0);
});

test('review and design panels are independently wired to their matching server modes', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /id="compilerPanel"/);
  assert.match(html, /id="rapidPanel"/);
  assert.match(html, /executeBackendAnalysis\(prompt,'Design campaign', 'design'/);
  assert.match(html, /executeBackendAnalysis\(prompt,'Review campaign', 'review'/);
});

test('all five voice scripts are requested even when the primary channel is not voice', async () => {
  const previousKey = process.env.GROQ_API_KEY;
  const previousFetch = globalThis.fetch;
  process.env.GROQ_API_KEY = 'test-only-server-secret';
  let upstream;
  const modelReport = {
    ...structuredClone(report),
    campaign_materials: { primary_copy: 'Make the payment by Friday.', sms: 'Pay by Friday.' },
    yarngpt_languages: Object.fromEntries(['english', 'pidgin', 'yoruba', 'hausa', 'igbo'].map(language => [language, { spoken_script: `${language} script` }])),
  };
  globalThis.fetch = async (_url, options) => {
    upstream = JSON.parse(options.body);
    return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(modelReport) } }] }), { status: 200 });
  };
  try {
    const result = await handler({
      httpMethod: 'POST', requestContext: { identity: { sourceIp: 'audit-five-language-scripts' } },
      body: JSON.stringify({ mode: 'design', prompt: 'Design a campaign with an SMS primary channel.' }),
    });
    const systemPrompt = upstream.messages.find(message => message.role === 'system').content;
    const body = JSON.parse(result.body);
    const returned = JSON.parse(body.candidates[0].content.parts[0].text);
    assert.match(systemPrompt, /Always populate yarngpt_languages with all five spoken scripts for every design and review response/);
    assert.doesNotMatch(systemPrompt, /Return yarngpt_languages as an empty object unless/);
    assert.deepEqual(Object.keys(returned.yarngpt_languages), ['english', 'pidgin', 'yoruba', 'hausa', 'igbo']);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = previousKey;
  }
});

test('relevant retrieved evidence is included in model input and never returns the server secret', async () => {
  const previousKey = process.env.GROQ_API_KEY;
  const previousFetch = globalThis.fetch;
  const sentinel = 'test-only-server-secret-82d3';
  process.env.GROQ_API_KEY = sentinel;
  let upstream;
  const modelReport = structuredClone(report);
  modelReport.recommendations.push({ id: 'R1', evidence_ids: ['B49', 'B99'] });
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.groq.com/openai/v1/chat/completions');
    upstream = JSON.parse(options.body);
    return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(modelReport) } }] }), { status: 200 });
  };
  try {
    const result = await handler({
      httpMethod: 'POST', requestContext: { identity: { sourceIp: 'audit-design-1' } },
      body: JSON.stringify({ mode: 'design', prompt: 'Design market fee compliance campaign.', retrieval_query: { behaviour: 'tax compliance fees', domain: 'Civic Trust & Tax Compliance' } }),
    });
    const responseText = result.body;
    const responseBody = JSON.parse(responseText);
    const modelInput = upstream.messages.map(message => message.content).join('\n');
    assert.equal(result.statusCode, 200);
    assert.match(modelInput, /Informal Market Stall Tax Compliance/);
    assert.ok(responseBody.retrieved_evidence.some(item => /tax compliance/i.test(item.title)));
    assert.equal(responseBody.retrieval.status, 'matched');
    assert.deepEqual(JSON.parse(responseBody.candidates[0].content.parts[0].text).recommendations[0].evidence_ids, ['B49']);
    assert.equal(responseText.includes(sentinel), false);
    assert.equal(upstream.messages.some(message => message.role === 'system' && /British English/.test(message.content)), true);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = previousKey;
  }
});

test('irrelevant retrieval is explicitly withheld from the model context', async () => {
  const previousKey = process.env.GROQ_API_KEY;
  const previousFetch = globalThis.fetch;
  process.env.GROQ_API_KEY = 'test-only-server-secret';
  let upstream;
  globalThis.fetch = async (_url, options) => {
    upstream = JSON.parse(options.body);
    return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(report) } }] }), { status: 200 });
  };
  try {
    const result = await handler({
      httpMethod: 'POST', requestContext: { identity: { sourceIp: 'audit-design-2' } },
      body: JSON.stringify({ prompt: 'Unrelated astronomy request.', retrieval_query: { text: 'black holes astronomy', domain: 'space science' } }),
    });
    const body = JSON.parse(result.body);
    assert.equal(body.retrieval.status, 'no_relevant_sources');
    assert.equal(body.retrieved_evidence.length, 0);
    assert.match(upstream.messages[1].content, /No relevant records met the retrieval threshold/);
    assert.doesNotMatch(upstream.messages[1].content, /Informal Market Stall Tax Compliance/);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = previousKey;
  }
});

test('missing server credential returns a generic setup error without calling Groq', async () => {
  const previousKey = process.env.GROQ_API_KEY;
  const previousFetch = globalThis.fetch;
  delete process.env.GROQ_API_KEY;
  let called = false;
  globalThis.fetch = async () => { called = true; throw new Error('must not call provider'); };
  try {
    const result = await handler({ httpMethod: 'POST', requestContext: { identity: { sourceIp: 'audit-no-key' } }, body: JSON.stringify({ prompt: 'A brief' }) });
    assert.equal(result.statusCode, 503);
    assert.equal(JSON.parse(result.body).error, 'AI service is not configured.');
    assert.equal(called, false);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey !== undefined) process.env.GROQ_API_KEY = previousKey;
  }
});

test('provider failures return a safe message without upstream error details', async () => {
  const previousKey = process.env.GROQ_API_KEY;
  const previousFetch = globalThis.fetch;
  const sentinel = 'provider-internal-secret-test';
  process.env.GROQ_API_KEY = 'test-only-server-secret';
  globalThis.fetch = async () => { throw new Error(`upstream failure ${sentinel}`); };
  try {
    const result = await handler({ httpMethod: 'POST', requestContext: { identity: { sourceIp: 'audit-error' } }, body: JSON.stringify({ prompt: 'A brief' }) });
    assert.equal(result.statusCode, 502);
    assert.equal(JSON.parse(result.body).error, 'AI service could not complete the request. Please try again.');
    assert.equal(result.body.includes(sentinel), false);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.GROQ_API_KEY;
    else process.env.GROQ_API_KEY = previousKey;
  }
});
