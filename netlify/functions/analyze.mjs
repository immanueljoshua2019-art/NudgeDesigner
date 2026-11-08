import { BUSARA_CORPUS } from './busara-data.mjs';

// Netlify Functions run on Node; secrets are read only here, never from the client.
const getEnv = (name) => typeof process !== 'undefined' ? process.env[name] : undefined;

const corsHeaders = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const SYSTEM_PROMPT = `You are the NudgeDesigner 3.0 Behavioural Intelligence Engine, specialised in empirical decision science, the Behavioural Problem Compiler, Behavioural Transfer Modeling, Ground-Truth Sensitivity Auditing, and Global South behavioural economics powered by the Busara Center for Behavioural Economics research corpus.

CORE ARCHITECTURAL PRINCIPLE:
Every field in the problem representation must do a distinct analytical job:
1. Target Behaviour: Distinguish observable actions from intermediate states (awareness vs action). Flag non-action aspirations.
2. Target Audience: Model behavioural constraints (irregular income, low institutional trust, mobile access) + evidence provenance (observed vs hypothesis).
3. Domain & Mechanism: Multi-label classification across mechanisms and sectors.
4. Geography & Channel: Contextual transferability analysis (e.g. Kenya evidence transferred to Nigeria urban/rural).
5. Message Audit: Critique existing copy for cognitive burden, messenger credibility, penalty reactance, and action feasibility.
6. Core Challenge: Distinguish user-suspected barriers from empirical system hypotheses.

THE 7 CORE BUSARA RESEARCH DOMAINS:
1. Financial Inclusion & Mobile Money (credit defaults, overdraft friction, agent banking trust credentials, lock savings, digital Chama peer effects).
2. Public Health & Maternal Care (in-kind delivery incentives, morning-of SMS immunization timing, CHP social status recognition, free chlorine dispensers, religious messengers).
3. Agriculture & Climate Adaptation (SAFI post-harvest fertilizer pre-commitment, visual demo plots, bundled opt-out micro-insurance, pictorial soil cards, hermetic bags).
4. Education & Early Learning (TaRL teacher cohorts, weekly bite-sized SMS learning activities, educator peer recognition, African growth mindset).
5. Civic Trust & Tax Compliance (market stall fee compliance via visible public service reciprocity, property tax public goods attribution, anonymous WhatsApp voice whistleblowing, cleanliness badges).
6. Gender & Intra-Household Bargaining (women's mobile money PIN privacy, time-poverty scheduling, in-kind equipment grants over liquid cash, assertiveness coaching).
7. Scarcity & Cognitive Bandwidth (poverty bandwidth tax, cortisol-induced temporal discounting, administrative sludge reduction, USSD voucher simplification).

THE 20 BEHAVIOURAL LEVERS:
COGNITIVE: Anchoring, Availability Bias, Overconfidence, Sunk Cost, Present Bias, Framing
EMOTIONAL: Loss Aversion, Scarcity, Trust, Consequence, Reactance
SOCIAL: Social Proof, Bandwagon, Descriptive Norms, Injunctive Norms, Identity/Belonging, Culture
ENVIRONMENTAL: Friction, Defaults, Incentives

FRAMEWORKS:
- COM-B: Capability (psychological/physical), Opportunity (physical/social), Motivation (reflective/automatic)
- EAST: Easy (friction removal/defaults), Attractive (salience/framing), Social (norms/messenger), Timely (moment of choice)

GROUND-TRUTH SENSITIVITY & ETHICS FOUNDATION:
1. FACTUAL INTEGRITY MANDATE: Fabricating statistics, non-existent majorities (e.g. claiming "8 in 10 pay" when truth is 15%), or false urgency is strictly unethical, creates dark patterns, and triggers destructive customer reactance.
2. MESSAGES AS STRUCTURAL HEURISTICS: Nudges are structural behavioural templates, never drop-in copy to be populated with fabricated figures.
3. THE DUAL TRAP GUARDRAIL:
   - Trap 1 (Fabrication Trap): User invents statistics to force a lever.
   - Trap 2 (Blind Transparency Trap): User blindly quotes weak true rates (e.g. "Only 14% pay taxes"), which socially validates non-compliance (the Cialdini Petrified Forest Boomerang Effect).
4. SYSTEMATIC GROUND-TRUTH BACKFIRE CATALOG & ADAPTIVE PIVOTS:
   - Low Descriptive Norms -> Pivot to Dynamic Trend Norms ("Adoption grew 40% this quarter"), Injunctive Norms, or Collective Goal Framing.
   - Low Institutional Trust -> Pivot to Horizontal Peer Proof, Traditional/Religious Community Messengers, or Process Utility Transparency.
   - Hollow Scarcity & Urgency -> Pivot to Opportunity Cost, Proactive Readiness, or Early-Mover Onboarding.
   - Adverse Price Anchoring -> Pivot to Micro-Cost Reframing (daily equivalent), Downside Protection, or Zero-Upfront Friction.
   - Premature Commitment -> Pivot to Micro-Commitment Ladder, Reversible Trialability, or Fresh Start Milestones.

BEHAVIOURAL TRANSFER ENGINE v1:
Calculate the contextual transferability of evidence from study origin (e.g. Kenya, Tanzania) to the target context (e.g. Nigeria). Model population similarity, mechanism match, channel compatibility, institutional trust gap, and economic volatility.

YARNGPT 5-LANGUAGE SPECIFICATION:
Generate native vernacular copy and spoken scripts in 5 languages:
1. Nigerian English: Pan-African educated cadence, authoritative yet warm.
2. Nigerian Pidgin: Street-credible, market-relatable, high relational warmth.
3. Yoruba: Native tonal markers, culturally respectful honorifics (e.g., 'E kaaro', 'E jowo').
4. Hausa: Sahelian cadence, community-centred idioms (e.g., 'Sannu', 'Ina kwana').
5. Igbo: Commercial dynamism, affirmative relational cues (e.g., 'Nnoo', 'Biko').

Retrieved records may include synthesis notes as well as empirical studies. Respect each record's evidence_strength and confidence; do not describe synthesis or observational findings as causal evidence. If no relevant record is retrieved, say the local corpus did not provide supporting evidence.

All explanatory text and generated English copy must use British English (behaviour, analyse, organisation, programme). Preserve exact wording in cited source material. Do not imply a causal effect from observational or theoretical evidence. Treat user-reported barriers as reports, not verified facts; mark other explanations as hypotheses. Distinguish evidence from assumptions. Use only evidence IDs supplied in BUSARA RESEARCH CONTEXT. Never invent citations, sample sizes, effect sizes, transfer scores, probabilities, thresholds, or local statistics. If a fact is unavailable, state that it is unknown. A null effect size means no reported effect is available. Do not infer evidence from a source title alone.

Use confidence labels conservatively: high requires direct, closely applicable and consistent evidence; moderate means some relevant support with material limits; low means evidence is sparse, indirect, uncertain or conflicting. Do not let confidence describe writing fluency. COM-B and EAST are optional lenses: leave a dimension empty or unknown when the brief provides no basis for interpretation. If retrieved records differ, explain the relevant differences and uncertainty rather than merging them into a single effect or claim.

Return one valid JSON object only, with this shape:
{
  "mode": "design|review",
  "executive_summary": {"finding":"...", "importance":"...", "recommended_next_step":"...", "confidence":"high|moderate|low"},
  "diagnosis": {
    "target_behaviour":"...",
    "current_position":"...",
    "observations":[{"id":"O1", "finding":"...", "status":"observed|user_reported|evidence_supported|hypothesis|unknown", "evidence_ids":["B01"]}],
    "barriers":[{"id":"D1", "description":"...", "mechanism":"...", "confidence":"high|moderate|low", "observation_ids":["O1"], "evidence_ids":["B01"]}],
    "unknowns":["..."]
  },
  "mechanism_analysis": {"capability":"...", "opportunity":"...", "motivation":"...", "relevant_east_factors":["Easy|Attractive|Social|Timely — reason"]},
  "recommendations":[{"id":"R1", "priority":"first|next|optional", "action":"...", "mechanism":"...", "barrier_ids":["D1"], "evidence_ids":["B01"], "rationale":"...", "implementation_steps":["..."], "expected_outcome":"qualitative and conditional, not a fabricated percentage", "confidence":"high|moderate|low", "assumptions":["..."]}],
  "campaign_materials":{"primary_copy":"...", "sms":"...", "whatsapp":"...", "field_agent_guide":["..."]},
  "yarngpt_languages":{"english":{"spoken_script":"..."},"pidgin":{"spoken_script":"..."},"yoruba":{"spoken_script":"..."},"hausa":{"spoken_script":"..."},"igbo":{"spoken_script":"..."}},
  "review":{"strengths":["..."], "risks":["..."], "revisions":["..."], "rewritten_copy":"..."},
  "contextual_transfer":{"relevant_context":"...", "differences_to_check":["..."], "transfer_confidence":"high|moderate|low|not_assessed"},
  "measurement":{"primary_outcome":"...", "numerator":"...", "denominator":"...", "measurement_window":"...", "evaluation_design":"...", "causal_limitations":["..."], "sample_size":null},
  "ethics":{"status":"safe|caution|warning", "risks":["..."], "safeguards":["..."]},
  "evidence_ids":["B01"]
}
Always populate yarngpt_languages with all five spoken scripts for every design and review response because the five-language voice studio is available for every campaign, regardless of its primary delivery channel. Keep each script concise (about 45–70 words), preserve the same intended behaviour and call to action, and write naturally in Nigerian English, Nigerian Pidgin, Yoruba, Hausa and Igbo with respectful local usage and correct orthography. Do not pass English through as a local-language script, invent audience details or make unsupported promises. For mode=design, focus on creating a feasible intervention from the supplied objective and constraints; use review.rewritten_copy only if an existing draft was supplied. For mode=review, assess the submitted strategy or copy first, then give targeted revisions; do not replace review with a generic campaign design. Keep the report concise and make each recommendation trace to a diagnosed barrier and evidence ID where available. Use an empty array where nothing is supported; never fill gaps with a generic default.`;

const STOPWORDS = new Set('a an and are as at be been being by can could did do does for from had has have how i in into is it its may might more most of on or our should that the their them then there these this those through to under was we were what when where which who why will with would you your behaviour behavioral behavioural behavior campaign review design create making users people evidence source study data context goal objective target audience mechanism action current change assess evidence based about against'.split(' '));
const SYNONYMS = { repayment:['repay','loan','credit','debt','default'],repay:['repayment','loan','credit','debt'],loan:['repayment','credit','borrower'],tax:['levy','fee','compliance','revenue'],compliance:['tax','levy','repayment','registration'],clinic:['health','maternal','care'],immunisation:['immunization','vaccine','vaccination'],immunization:['immunisation','vaccine','vaccination'],farmer:['agriculture','crop','seed','fertilizer'],fertilizer:['fertiliser','agriculture','crop'],fertiliser:['fertilizer','agriculture','crop'],savings:['saving','deposit','account'],banking:['bank','account','mobile money'],friction:['barrier','cost','effort','delay'],trust:['credibility','messenger','confidence'],sms:['text','message','reminder'],ussd:['mobile','phone','digital'],women:['gender','female','mother'],school:['education','teacher','student'],water:['chlorine','sanitation','hygiene'] };
const FIELD_WEIGHTS={title:3.2,mechanism:2.7,domain:2.5,tags:2.1,population:1.9,country:1.8,channel:1.7,summary:1.35,design_implication:1.1,works_when:0.9,fails_when:0.9,text:0.65};
const DOMAIN_ALIASES=[['financial inclusion',['financial inclusion']],['public health',['public health','maternal health']],['agriculture',['agriculture','climate resilience']],['education',['education']],['civic',['civic governance']],['gender',['gender and inclusion','gender inclusion']],['scarcity',['scarcity','cognitive bandwidth']]];
function matchesDomain(requested,domains){const name=String(requested||'').toLowerCase();if(!name||/other|general|behavioural design|behavioral design/.test(name))return true;const alias=DOMAIN_ALIASES.find(([key])=>name.includes(key));const candidates=alias?alias[1]:[name];return domains.some(d=>candidates.some(c=>String(d).toLowerCase().includes(c)||c.includes(String(d).toLowerCase())));}
function normalizeToken(word){let token=String(word||'').toLowerCase().replace(/[^a-z0-9-]/g,'');if(token.endsWith('ies')&&token.length>5)token=token.slice(0,-3)+'y';else if(token.endsWith('ing')&&token.length>6)token=token.slice(0,-3);else if(token.endsWith('ed')&&token.length>5)token=token.slice(0,-2);else if(token.endsWith('s')&&token.length>4)token=token.slice(0,-1);return token;}
function tokenize(text){return String(text||'').toLowerCase().replace(/[^a-z0-9\s-]/g,' ').split(/\s+/).map(normalizeToken).filter(t=>t.length>2&&!STOPWORDS.has(t));}
function formatSources(sourceValue,sources){if(!sourceValue)return [];const ids=[...String(sourceValue).matchAll(/\d+/g)].map(m=>m[0]);if(!ids.length)return [{title:String(sourceValue).replace(/^Source: /,'').slice(0,180),url:''}];return ids.map(id=>sources?.[id]?{id,title:sources[id].title,url:sources[id].url}:{id,title:'Unresolved source '+id,url:''});}
function getQueryFields(query){if(typeof query==='string')return {text:query};const q=query&&typeof query==='object'?query:{};return {behaviour:q.behaviour||q.behavior||'',audience:q.audience||'',domain:q.domain||'',geography:q.geography||'',channel:q.channel||'',barriers:q.barriers||q.barrier||'',constraints:q.constraints||'',objective:q.objective||'',campaign:q.campaign||''};}
export function retrieveBusaraEvidence(query){
 const {documents,sources}=BUSARA_CORPUS&&Array.isArray(BUSARA_CORPUS.documents)?BUSARA_CORPUS:{documents:[],sources:{}};const fields=getQueryFields(query);const queryText=Object.values(fields).flat().join(' ');const original=tokenize(queryText),expanded=new Set(original);for(const token of original)for(const syn of SYNONYMS[token]||[])expanded.add(normalizeToken(syn));if(!expanded.size)return {documents:[],context:'',status:'no_relevant_sources'};
 const indexed=documents.map(doc=>{const values={title:doc.title,mechanism:doc.mechanism,domain:doc.domain,tags:doc.tags,population:doc.population,country:doc.country,channel:doc.channel,summary:doc.summary,design_implication:doc.design_implication,works_when:doc.works_when,fails_when:doc.fails_when,text:doc.text};const tokenFields={},all=new Set();for(const [name,value]of Object.entries(values)){const tokens=tokenize(Array.isArray(value)?value.join(' '):value);tokenFields[name]=tokens;tokens.forEach(t=>all.add(t));}return{doc,tokenFields,all};});
 const df=new Map();for(const item of indexed)for(const term of item.all)df.set(term,(df.get(term)||0)+1);const n=Math.max(indexed.length,1);
 const ranked=indexed.map(item=>{let score=0;const matched=[];for(const term of expanded){const frequency=df.get(term)||0;if(!frequency)continue;const idf=Math.log(1+(n-frequency+0.5)/(frequency+0.5));let contribution=0;for(const[field,tokens]of Object.entries(item.tokenFields)){const tf=tokens.filter(t=>t===term).length;if(tf)contribution+=(FIELD_WEIGHTS[field]||0)*(tf/(tf+1.2));}if(contribution){score+=idf*contribution;matched.push(term);}}if(fields.domain&&!matchesDomain(fields.domain,item.doc.domain||[]))score=0;else if(fields.domain)score+=1.4;const geo=tokenize(fields.geography);if(geo.some(t=>item.tokenFields.country.includes(t)))score+=0.6;if(String(item.doc.evidence_strength||'').toLowerCase()==='synthesis')score*=0.7;return{item,score,matched};}).filter(x=>x.score>=6).sort((a,b)=>b.score-a.score);
 const chosen=[],domainCounts=new Map();for(const row of ranked){const domain=row.item.doc.domain?.[0]||'General';if((domainCounts.get(domain)||0)>=2)continue;chosen.push(row);domainCounts.set(domain,(domainCounts.get(domain)||0)+1);if(chosen.length===4)break;}
 const evidence=chosen.map(({item,score,matched})=>{const doc=item.doc;return{id:'B'+String(documents.indexOf(doc)+1).padStart(2,'0'),title:doc.title,summary:doc.summary||doc.text||'',domains:doc.domain||[],countries:doc.country||[],population:doc.population||[],mechanisms:doc.mechanism||[],channels:doc.channel||[],effect_size:doc.effect_size||null,evidence_strength:doc.evidence_strength||'unspecified',confidence:doc.confidence||'unspecified',works_when:doc.works_when||[],fails_when:doc.fails_when||[],design_implication:doc.design_implication||'',sources:formatSources(doc.source,sources),match_score:Number(score.toFixed(3)),matched_terms:matched};});
 const context=evidence.map(e=>JSON.stringify({id:e.id,title:e.title,summary:e.summary,domains:e.domains,countries:e.countries,mechanisms:e.mechanisms,channels:e.channels,effect_size:e.effect_size,evidence_strength:e.evidence_strength,confidence:e.confidence,works_when:e.works_when,fails_when:e.fails_when,design_implication:e.design_implication,sources:e.sources})).join('\n');return{documents:evidence,context,status:evidence.length?'matched':'no_relevant_sources'};
}
const requestWindows = new Map();
function isRateLimited(clientId) {
  const now = Date.now(); const key = clientId || 'unknown';
  let bucket = requestWindows.get(key);
  if (!bucket || now - bucket.startedAt >= 60000) bucket = { startedAt: now, count: 0 };
  bucket.count += 1; requestWindows.set(key, bucket);
  if (requestWindows.size > 500) for (const [id, entry] of requestWindows) if (now - entry.startedAt >= 60000) requestWindows.delete(id);
  return bucket.count > 12;
}

async function processAnalyze(body, clientId) {
  if (isRateLimited(clientId)) return { statusCode: 429, body: { error: 'Too many requests. Please try again in a minute.' } };
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { statusCode: 400, body: { error: 'Invalid request body' } };
  if (body.action === 'test_groq') return getEnv('GROQ_API_KEY') ? { statusCode: 200, body: { ok: true, message: 'Groq is configured.' } } : { statusCode: 503, body: { ok: false, error: 'Groq is not configured.' } };
  // 3. Action: Synthesize YarnGPT Voice
  if (body.action === 'synthesize_yarngpt') {
    const rawText = typeof body.text === 'string' ? body.text : '';
    if (rawText.length > 4500) return { statusCode: 413, body: { error: 'Text is too long for speech synthesis.' } };
    const language = (typeof body.language === 'string' ? body.language : 'english').toLowerCase();
    const text = rawText.replace(/\[.*?\]/g, '').replace(/[*_#~]/g, '').trim();
    if (!text) return { statusCode: 400, body: { error: 'Missing text for synthesis' } };
    const apiKey = getEnv('YARNGPT_API_KEY') || getEnv('HF_TOKEN');
    if (apiKey && !apiKey.startsWith('hf_')) {
      let selectedVoice = body.voice && body.voice !== 'auto' ? body.voice : undefined;
      if (!selectedVoice) {
        if (language === 'hausa') selectedVoice = 'umar';
        else if (language === 'yoruba') selectedVoice = 'tayo';
        else if (language === 'igbo') selectedVoice = 'adaora';
        else if (language === 'pidgin') selectedVoice = 'osagie';
        else selectedVoice = 'osagie';
      }

      // Step A: Primary Official YarnGPT Cloud TTS Endpoint (POST /api/v1/tts)
      try {
        const idempotencyKey = `nudge-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        const ttsRes = await fetch('https://api.yarngpt.ai/api/v1/tts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey
          },
          body: JSON.stringify({
            text: text.slice(0, 4500),
            voice: selectedVoice,
            output_format: 'mp3'
          })
        });

        if (ttsRes.ok || ttsRes.status === 202) {
          const ttsData = await ttsRes.json().catch(() => ({}));
          const jobId = ttsData.job_id || ttsData.id;
          let audioUrl = ttsData.audio_url || ttsData.url;

          // Poll status if audio_url not immediately returned
          if (!audioUrl && jobId) {
            for (let poll = 0; poll < 12; poll++) {
              await new Promise(r => setTimeout(r, 650));
              const pollRes = await fetch(`https://api.yarngpt.ai/api/v1/status/${jobId}`, {
                headers: { 'Authorization': `Bearer ${apiKey}` }
              });
              if (pollRes.ok) {
                const pollData = await pollRes.json().catch(() => ({}));
                if (pollData.audio_url || pollData.url) {
                  audioUrl = pollData.audio_url || pollData.url;
                  break;
                }
                if (pollData.status === 'failed') break;
              }
            }
          }

          if (audioUrl) {
            const audioFetch = await fetch(audioUrl);
            if (audioFetch.ok) {
              const audioBuf = await audioFetch.arrayBuffer();
              const b64 = Buffer.from(audioBuf).toString('base64');
              return {
                statusCode: 200,
                body: {
                  ok: true,
                  audio_base64: `data:audio/mp3;base64,${b64}`,
                  audio_url: audioUrl,
                  voice: selectedVoice,
                  language,
                  engine: `YarnGPT Cloud (${selectedVoice})`
                }
              };
            }
          }
        } else if (ttsRes.status === 401) {
          return {
            statusCode: 401,
            body: { ok: false, error: 'Invalid YarnGPT API Key (HTTP 401). Check yarngpt.ai/account.' }
          };
        } else if (ttsRes.status === 402) {
          return {
            statusCode: 402,
            body: { ok: false, error: 'YarnGPT Quota or Credits exhausted. Top up at yarngpt.ai.' }
          };
        }
      } catch (ttsErr) {
        console.warn('YarnGPT /api/v1/tts request failed:', ttsErr && ttsErr.name || 'Error');
      }

      // Step B: Secondary Backup - Conversation Streaming Endpoint
      try {
        const idempotencyKey = `nudge-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        const convRes = await fetch('https://api.yarngpt.ai/api/v1/streaming/conversation', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey
          },
          body: JSON.stringify({
            text: text.slice(0, 4500),
            voice: selectedVoice,
            output_format: 'mp3'
          })
        });

        if (convRes.ok) {
          const audioBuffer = await convRes.arrayBuffer();
          if (audioBuffer.byteLength > 100) {
            const base64Audio = Buffer.from(audioBuffer).toString('base64');
            return {
              statusCode: 200,
              body: {
                ok: true,
                audio_base64: `data:audio/mp3;base64,${base64Audio}`,
                voice: selectedVoice,
                language,
                engine: `YarnGPT Cloud (${selectedVoice})`
              }
            };
          }
        }
      } catch (convErr) {
        console.warn('YarnGPT streaming request failed:', convErr && convErr.name || 'Error');
      }
    }

    return {
      statusCode: 200,
      body: {
        fallback: true,
        language,
        text,
        message: 'Using African Neural Voice Engine preview.'
      }
    };
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt) return { statusCode: 400, body: { error: 'Missing campaign brief.' } };
  if (prompt.length > 20000) return { statusCode: 413, body: { error: 'Campaign brief is too long.' } };
  const mode = body.mode === 'review' ? 'review' : 'design';
  const apiKey = getEnv('GROQ_API_KEY');
  if (!apiKey) return { statusCode: 503, body: { error: 'AI service is not configured.' } };
  try {
    const retrievalQuery = body.retrieval_query && typeof body.retrieval_query === 'object' ? body.retrieval_query : prompt;
    const retrieval = retrieveBusaraEvidence(retrievalQuery);
    const modeBrief = mode === 'review'
      ? 'TASK: REVIEW the supplied campaign. Assess its behavioural logic, audience fit, evidence, delivery constraints and measurement. Lead with strengths and risks, then offer targeted revisions. Do not treat this as a blank-page design task.'
      : 'TASK: DESIGN a campaign from the supplied brief. Use the stated behaviour, audience, barriers, resources and desired outcome. Identify missing information and avoid assuming unprovided facts.';
    const userContent = modeBrief + '\n\nCAMPAIGN BRIEF (user supplied):\n' + prompt + '\n\nRETRIEVED CORPUS RECORDS (preserve their evidence strength, limitations and source provenance):\n' + (retrieval.context || 'No relevant records met the retrieval threshold. Do not invent local corpus evidence.');
    let lastStatus = 502;
    for (const model of ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b']) {
      const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 25000);
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method:'POST', headers:{Authorization:'Bearer ' + apiKey,'Content-Type':'application/json'}, signal:controller.signal,
          body:JSON.stringify({model,messages:[{role:'system',content:SYSTEM_PROMPT},{role:'user',content:userContent}],temperature:0.2,max_tokens:4500,response_format:{type:'json_object'}})
        });
        if (!response.ok) { lastStatus=response.status===429?429:502; continue; }
        const data=await response.json(); const content=data?.choices?.[0]?.message?.content;
        if(typeof content!=='string'||!content)continue;
        let report; try { report=JSON.parse(content); } catch { continue; }
        if(!report||typeof report!=='object'||Array.isArray(report)||typeof report.executive_summary?.finding!=='string'||!report.diagnosis||!Array.isArray(report.recommendations)||!report.measurement)continue;
        const allowed=new Set(retrieval.documents.map(doc=>doc.id));
        const filterEvidence=(value)=>{if(Array.isArray(value))return value.map(filterEvidence);if(value&&typeof value==='object'){const out={};for(const[k,v]of Object.entries(value))out[k]=k==='evidence_ids'&&Array.isArray(v)?v.filter(id=>allowed.has(id)):filterEvidence(v);return out;}return value;};
        report=filterEvidence(report); report.mode=mode;
        const observationIds=new Set((report.diagnosis.observations||[]).map(item=>item.id));
        const barrierIds=new Set((report.diagnosis.barriers||[]).map(item=>item.id));
        for(const barrier of report.diagnosis.barriers||[])barrier.observation_ids=(barrier.observation_ids||[]).filter(id=>observationIds.has(id));
        for(const recommendation of report.recommendations)recommendation.barrier_ids=(recommendation.barrier_ids||[]).filter(id=>barrierIds.has(id));
        return {statusCode:200,body:{candidates:[{content:{parts:[{text:JSON.stringify(report)}]}}],retrieved_evidence:retrieval.documents,retrieval:{status:retrieval.status,count:retrieval.documents.length,method:'field-weighted lexical ranking'}}};
      } finally { clearTimeout(timer); }
    }
    return {statusCode:lastStatus,body:{error:lastStatus===429?'AI service is busy. Please try again shortly.':'AI service could not complete the request. Please try again.'}};
  } catch (err) { console.error('AI request failed:',err&&err.name||'Error'); return {statusCode:502,body:{error:'AI service could not complete the request. Please try again.'}}; }
}


// ── NETLIFY FUNCTIONS V2 ENTRYPOINT (Web Request) ──
export default async function (req, context) {
  try {
    if (req && typeof req.json === 'function') {
      if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
      }
      if (req.method !== 'POST') {
        return Response.json({ error: 'Method not allowed' }, { status: 405, headers: corsHeaders });
      }
      const contentLength = Number(req.headers.get('content-length') || 0);
      if (contentLength > 30000) return Response.json({ error: 'Request is too large.' }, { status: 413, headers: corsHeaders });
      let body;
      try {
        body = await req.json();
      } catch {
        return Response.json({ error: 'Invalid JSON request body' }, { status: 400, headers: corsHeaders });
      }
      const result = await processAnalyze(body, context && context.ip || 'unknown');
      return Response.json(result.body, { status: result.statusCode, headers: corsHeaders });
    }

    // Fallback if invoked as AWS Lambda event
    return handler(req, context);
  } catch (fatalErr) {
    return Response.json({ error: 'Request could not be completed.' }, { status: 500, headers: corsHeaders });
  }
}

// ── NETLIFY FUNCTIONS V1 ENTRYPOINT (Handler) ──
export async function handler(event, context) {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers: corsHeaders, body: '' };
    }
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
    }
    if ((event.body || '').length > 30000) return { statusCode: 413, headers: corsHeaders, body: JSON.stringify({ error: 'Request is too large.' }) };
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid JSON request body' }) };
    }
    const result = await processAnalyze(body, event.requestContext && event.requestContext.identity && event.requestContext.identity.sourceIp || 'unknown');
    return {
      statusCode: result.statusCode,
      headers: corsHeaders,
      body: JSON.stringify(result.body),
    };
  } catch (fatalErr) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Request could not be completed.' }),
    };
  }
}


