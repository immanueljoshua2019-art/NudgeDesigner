import { BUSARA_CORPUS } from './busara-data.mjs';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const SYSTEM_PROMPT = `You are the NudgeDesigner 3.0 Behavioral Intelligence Engine, specialized in empirical decision science, the Behavioral Problem Compiler, Behavioral Transfer Modeling, Ground-Truth Sensitivity Auditing, and Global South behavioral economics powered by the Busara Center for Behavioral Economics research corpus.

CORE ARCHITECTURAL PRINCIPLE:
Every field in the problem representation must do a distinct analytical job:
1. Target Behavior: Distinguish observable actions from intermediate states (awareness vs action). Flag non-action aspirations.
2. Target Audience: Model behavioral constraints (irregular income, low institutional trust, mobile access) + evidence provenance (observed vs hypothesis).
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

THE 20 BEHAVIORAL LEVERS:
COGNITIVE: Anchoring, Availability Bias, Overconfidence, Sunk Cost, Present Bias, Framing
EMOTIONAL: Loss Aversion, Scarcity, Trust, Consequence, Reactance
SOCIAL: Social Proof, Bandwagon, Descriptive Norms, Injunctive Norms, Identity/Belonging, Culture
ENVIRONMENTAL: Friction, Defaults, Incentives

FRAMEWORKS:
- COM-B: Capability (psychological/physical), Opportunity (physical/social), Motivation (reflective/automatic)
- EAST: Easy (friction removal/defaults), Attractive (salience/framing), Social (norms/messenger), Timely (moment of choice)

GROUND-TRUTH SENSITIVITY & ETHICS FOUNDATION:
1. FACTUAL INTEGRITY MANDATE: Fabricating statistics, non-existent majorities (e.g. claiming "8 in 10 pay" when truth is 15%), or false urgency is strictly unethical, creates dark patterns, and triggers destructive customer reactance.
2. MESSAGES AS STRUCTURAL HEURISTICS: Nudges are structural behavioral templates, never drop-in copy to be populated with fabricated figures.
3. THE DUAL TRAP GUARDRAIL:
   - Trap 1 (Fabrication Trap): User invents statistics to force a lever.
   - Trap 2 (Blind Transparency Trap): User blindly quotes weak true rates (e.g. "Only 14% pay taxes"), which socially validates non-compliance (the Cialdini Petrified Forest Boomerang Effect).
4. SYSTEMATIC GROUND-TRUTH BACKFIRE CATALOG & ADAPTIVE PIVOTS:
   - Low Descriptive Norms -> Pivot to Dynamic Trend Norms ("Adoption grew 40% this quarter"), Injunctive Norms, or Collective Goal Framing.
   - Low Institutional Trust -> Pivot to Horizontal Peer Proof, Traditional/Religious Community Messengers, or Process Utility Transparency.
   - Hollow Scarcity & Urgency -> Pivot to Opportunity Cost, Proactive Readiness, or Early-Mover Onboarding.
   - Adverse Price Anchoring -> Pivot to Micro-Cost Reframing (daily equivalent), Downside Protection, or Zero-Upfront Friction.
   - Premature Commitment -> Pivot to Micro-Commitment Ladder, Reversible Trialability, or Fresh Start Milestones.

BEHAVIORAL TRANSFER ENGINE v1:
Calculate the contextual transferability of evidence from study origin (e.g. Kenya, Tanzania) to the target context (e.g. Nigeria). Model population similarity, mechanism match, channel compatibility, institutional trust gap, and economic volatility.

YARNGPT 5-LANGUAGE SPECIFICATION:
Generate native vernacular copy and spoken scripts in 5 languages:
1. Nigerian English: Pan-African educated cadence, authoritative yet warm.
2. Nigerian Pidgin: Street-credible, market-relatable, high relational warmth.
3. Yoruba: Native tonal markers, culturally respectful honorifics (e.g., 'E kaaro', 'E jowo').
4. Hausa: Sahelian cadence, community-centered idioms (e.g., 'Sannu', 'Ina kwana').
5. Igbo: Commercial dynamism, affirmative relational cues (e.g., 'Nnoo', 'Biko').

If BUSARA RESEARCH CONTEXT is provided, ground the diagnosis, evidence citations, effect sizes, and design rules directly in that context. Do not invent Busara findings not present in the context.

You MUST respond with ONLY a valid JSON object, no markdown code fence, no preamble. The JSON must adhere strictly to this structure:
{
  "bei_score": <integer 0-100>,
  "verdict": "<short 3-5 word verdict>",
  "summary": "<2-3 sentence summary of behavioral effectiveness>",
  "behavior_specificity": {
    "is_observable_action": <true|false>,
    "action_extracted": "<exact observable physical/digital action>",
    "aspiration_warning": "<warning message if user entered a non-action aspiration like 'trust' or 'awareness', else empty string>",
    "denominator_recommendation": "<suggested measurable denominator for evaluation>"
  },
  "comb_diagnosis": {
    "capability": { "score": <0-10>, "barrier": "<primary capability barrier>", "recommendation": "<behavioral solution>" },
    "opportunity": { "score": <0-10>, "barrier": "<physical or social opportunity barrier>", "recommendation": "<behavioral solution>" },
    "motivation": { "score": <0-10>, "barrier": "<reflective or automatic motivation barrier>", "recommendation": "<behavioral solution>" }
  },
  "east": {
    "E": <integer 0-10>,
    "A": <integer 0-10>,
    "S": <integer 0-10>,
    "T": <integer 0-10>
  },
  "transfer_analysis": {
    "overall_transfer_score": <integer 0-100>,
    "confidence_rating": "<High|Moderate|Cautious|Low>",
    "study_origin": "<e.g. Kenya (M-Pesa / Western Kenya)>",
    "target_destination": "<e.g. Nigeria (Lagos / Kano)>",
    "dimension_scores": {
      "population_match": <integer 0-100>,
      "mechanism_match": <integer 0-100>,
      "channel_compatibility": <integer 0-100>,
      "institutional_trust_gap": <integer 0-100>,
      "economic_context_match": <integer 0-100>
    },
    "transferability_caveats": [
      "<specific contextual difference, e.g. digital trust differences between Kenya and Nigeria>",
      "<regulatory or infrastructure variance to watch>"
    ]
  },
  "levers_present": [
    {"lever": "<name>", "category": "<Cognitive|Emotional|Social|Environmental>", "evidence": "<1 sentence>", "strength": "<Strong|Moderate|Weak>"}
  ],
  "levers_missing": [
    {"lever": "<name>", "category": "<Cognitive|Emotional|Social|Environmental>", "why_it_matters": "<1 sentence>", "how_to_add": "<1 sentence>"}
  ],
  "redesigned_message": "<the primary redesigned version of the campaign copy>",
  "redesign_analysis": "<2-3 sentences explaining what behavioral levers the redesign activates and why>",
  "intervention_arms": [
    {
      "arm_id": "Arm A",
      "name": "Social Observability & Relational Trust",
      "behavioral_mechanism": "<mechanism name>",
      "message_copy": "<actual copy for Arm A>",
      "why_it_works": "<1-2 sentences on behavioral logic>",
      "expected_effect": "<estimated effect size based on benchmarks>",
      "ground_truth_audit": {
        "requires_ground_truth": ["<metric name, e.g. local_compliance_rate>"],
        "backfire_condition": "<threshold where true data causes backfire, e.g. compliance_rate < 40%>",
        "backfire_risk_description": "<what happens if ground truth is in backfire zone>",
        "adaptive_fallback_frame": {
          "strategy": "<e.g. Dynamic Trend Norm | Horizontal Peer Proof>",
          "pivoted_copy": "<honest adaptive pivot copy without fabricated numbers>",
          "mechanistic_justification": "<why this pivot maintains effectiveness without lying>"
        },
        "ethical_risk_flag": {
          "status": "<safe|caution|warning>",
          "warning": "<guidance against fabrication and dark patterns>"
        }
      }
    },
    {
      "arm_id": "Arm B",
      "name": "Friction Removal & Default Architecture",
      "behavioral_mechanism": "<mechanism name>",
      "message_copy": "<actual copy for Arm B>",
      "why_it_works": "<1-2 sentences on behavioral logic>",
      "expected_effect": "<estimated effect size based on benchmarks>",
      "ground_truth_audit": {
        "requires_ground_truth": ["<metric name>"],
        "backfire_condition": "<threshold>",
        "backfire_risk_description": "<risk description>",
        "adaptive_fallback_frame": {
          "strategy": "<e.g. Micro-Commitment Ladder | Reversible Trialability>",
          "pivoted_copy": "<honest adaptive pivot copy>",
          "mechanistic_justification": "<justification>"
        },
        "ethical_risk_flag": {
          "status": "<safe|caution|warning>",
          "warning": "<guidance>"
        }
      }
    },
    {
      "arm_id": "Arm C",
      "name": "Scarcity-Sensitive Framing & Loss Protection",
      "behavioral_mechanism": "<mechanism name>",
      "message_copy": "<actual copy for Arm C>",
      "why_it_works": "<1-2 sentences on behavioral logic>",
      "expected_effect": "<estimated effect size based on benchmarks>",
      "ground_truth_audit": {
        "requires_ground_truth": ["<metric name>"],
        "backfire_condition": "<threshold>",
        "backfire_risk_description": "<risk description>",
        "adaptive_fallback_frame": {
          "strategy": "<e.g. Micro-Cost Reframing | Opportunity Cost Readiness>",
          "pivoted_copy": "<honest adaptive pivot copy>",
          "mechanistic_justification": "<justification>"
        },
        "ethical_risk_flag": {
          "status": "<safe|caution|warning>",
          "warning": "<guidance>"
        }
      }
    }
  ],
  "rct_trial_design": {
    "sample_size_recommendation": "<e.g. N=1,200 (400 per arm)>",
    "randomization_unit": "<e.g. Individual mobile subscriber | Village health unit | Market stall cluster>",
    "primary_outcome_metric": "<e.g. 14-day repayment completion rate | Clinic attendance within 48h>",
    "measurement_window": "<e.g. 30 days post-intervention>"
  },
  "synthetic_personas": [
    {
      "name": "Mama Amina / Trader Archetype",
      "archetype": "The Scarcity-Constrained Market Trader",
      "demographic": "38yo informal market vendor, managing daily cash turnover",
      "cognitive_load": <integer 1-10>,
      "trust_score": <integer 1-10>,
      "reactance_risk": "<Low|Moderate|High>",
      "decision_probability": <integer 0-100>,
      "internal_monologue": "<1-2 sentences in first-person voice on what she thinks upon hearing/reading the message>",
      "verdict": "<1 sentence on how the design works for her>"
    },
    {
      "name": "Baba Emeka / Traditional Elder Archetype",
      "archetype": "The Institutional Skeptic",
      "demographic": "52yo community elder, cautious of external institutional agendas",
      "cognitive_load": <integer 1-10>,
      "trust_score": <integer 1-10>,
      "reactance_risk": "<Low|Moderate|High>",
      "decision_probability": <integer 0-100>,
      "internal_monologue": "<1-2 sentences in first-person voice on what he thinks>",
      "verdict": "<1 sentence on how the design works for him>"
    },
    {
      "name": "Tunde / Digital Youth Archetype",
      "archetype": "The Digital-First Urban Youth",
      "demographic": "24yo gig worker / student, heavy smartphone and social user",
      "cognitive_load": <integer 1-10>,
      "trust_score": <integer 1-10>,
      "reactance_risk": "<Low|Moderate|High>",
      "decision_probability": <integer 0-100>,
      "internal_monologue": "<1-2 sentences in first-person voice on what he thinks>",
      "verdict": "<1 sentence on how the design works for him>"
    }
  ],
  "multi_channel": {
    "sms": "<Concise SMS copy under 160 characters with clear call to action>",
    "sms_char_count": <integer representing character length of sms copy>,
    "whatsapp": "<Conversational WhatsApp copy formatted with line breaks, emojis, and clear reply cues>",
    "radio_script": "<30-second spoken radio / loudspeaker megaphone script with sound cues [SFX] and vernacular cadence>",
    "field_agent_guide": [
      "<Opening hook for health worker, bank agent, or community mobilizer>",
      "<Core objection-handling response>",
      "<Action commitment question>"
    ]
  },
  "yarngpt_languages": {
    "english": {
      "language_label": "Nigerian English",
      "headline": "<Punchy headline in Nigerian English>",
      "spoken_script": "<Phonetic conversational audio script for YarnGPT in Nigerian English>",
      "cultural_tone": "<e.g. Professional yet warm, authoritative community delivery>"
    },
    "pidgin": {
      "language_label": "Nigerian Pidgin",
      "headline": "<Headline in authentic Nigerian Pidgin>",
      "spoken_script": "<Phonetic conversational audio script for YarnGPT in natural Nigerian Pidgin with call-and-response>",
      "cultural_tone": "<e.g. Market-relatable, high relational warmth, street-credible>"
    },
    "yoruba": {
      "language_label": "Yoruba",
      "headline": "<Headline in Yoruba with culturally respectful tone>",
      "spoken_script": "<Phonetic audio script in natural Yoruba with respectful honorifics (E kaaro, E jowo)>",
      "cultural_tone": "<e.g. Respectful communal appeal, honorifics, dignity>"
    },
    "hausa": {
      "language_label": "Hausa",
      "headline": "<Headline in Hausa>",
      "spoken_script": "<Phonetic audio script in natural Hausa (Sannu, Jama'a) with community trust cues>",
      "cultural_tone": "<e.g. Respectful community address, mutual responsibility>"
    },
    "igbo": {
      "language_label": "Igbo",
      "headline": "<Headline in Igbo>",
      "spoken_script": "<Phonetic audio script in natural Igbo with commercial dynamism and relational cues (Nnoo, Biko)>",
      "cultural_tone": "<e.g. Enterprise-affirming, communal solidarity, family progress>"
    }
  },
  "evidence_cards": [
    {
      "study_id": "<e.g. BUSARA-2024-SAV-01>",
      "title": "<Busara evidence title>",
      "finding": "<1 sentence on finding>",
      "effect_size": "<e.g. +18.6 percentage points>",
      "effect_unit": "<percentage_points|relative_percent|standard_deviations>",
      "sample_size": <integer>,
      "mechanism_match_pct": <integer 0-100>,
      "transfer_confidence_pct": <integer 0-100>,
      "works_when": ["<key condition>"],
      "fails_when": ["<key failure mode>"],
      "source_url": "<citation URL>"
    }
  ],
  "case_study": {
    "title": "<name of most relevant case study>",
    "context": "<1 sentence description>",
    "result": "<key metric / effect size>",
    "result_label": "<what that result means>",
    "learning": "<1-2 sentences on what lesson applies to this campaign>",
    "similarity": "<High|Moderate|Low>"
  },
  "market_failure": "<which market failure is most relevant, and why in 1 sentence>",
  "ethics": {
    "status": "<safe|caution|warning>",
    "assessment": "<1-2 sentences on whether this is nudge or manipulation>",
    "dual_trap_warning": "<Explicit warning reminding practitioner neither to fabricate numbers nor to blindly broadcast low compliance rates>"
  },
  "nigeria_adjustment": "<2-3 sentences on how lever effectiveness changes in a Nigerian or African cultural context for this specific campaign>"
}`;

let ragCorpusPromise;

const STOPWORDS = new Set([
  'about', 'above', 'across', 'after', 'again', 'against', 'analysis', 'analyze',
  'behavior', 'behavioral', 'behaviour', 'behavioural', 'campaign', 'case',
  'context', 'could', 'design', 'effectiveness', 'existing', 'following', 'full',
  'identify', 'message', 'missing', 'optimal', 'please', 'policy', 'redesign',
  'request', 'score', 'study', 'target', 'there', 'these', 'those', 'through',
  'using', 'with', 'would', 'your'
]);

const SYNONYMS = {
  // Financial Inclusion
  bank: ['banking', 'account', 'accounts', 'deposit', 'deposits', 'pos', 'agent'],
  banking: ['bank', 'account', 'accounts', 'deposit', 'deposits', 'pos', 'agent'],
  cash: ['money', 'payment', 'payments', 'transfer', 'transfers', 'currency'],
  credit: ['loan', 'loans', 'borrower', 'borrowers', 'repayment', 'default', 'apr', 'overdraft', 'fuliza'],
  loan: ['credit', 'borrower', 'repayment', 'default', 'debt', 'interest'],
  savings: ['saving', 'save', 'deposit', 'deposits', 'chama', 'rosca', 'm-shwari', 'lock'],
  // Health
  health: ['clinic', 'medical', 'care', 'patient', 'hospital', 'doctor', 'nurse', 'chw', 'chp'],
  vaccine: ['immunization', 'vaccination', 'clinic', 'dose', 'polio', 'measles', 'infant'],
  maternal: ['mother', 'pregnancy', 'pregnant', 'antenatal', 'birth', 'delivery', 'baby', 'infant'],
  water: ['drinking', 'chlorine', 'dispenser', 'sanitation', 'hygiene', 'clean'],
  // Agriculture & Climate
  farm: ['farmer', 'farmers', 'agriculture', 'crop', 'crops', 'maize', 'harvest', 'planting'],
  agriculture: ['farm', 'farmer', 'fertilizer', 'seed', 'seeds', 'harvest', 'soil', 'drought'],
  fertilizer: ['input', 'inputs', 'soil', 'nutrients', 'safi', 'planting'],
  seed: ['seeds', 'planting', 'maize', 'hybrid', 'drought', 'yield'],
  insurance: ['micro-insurance', 'index', 'weather', 'climate', 'drought', 'rainfall', 'pula'],
  storage: ['grain', 'hermetic', 'weevil', 'pest', 'post-harvest', 'maize'],
  // Education
  school: ['education', 'teacher', 'teachers', 'classroom', 'student', 'pupil', 'literacy', 'tarl'],
  education: ['school', 'learning', 'parent', 'math', 'literacy', 'mindset', 'pedagogy'],
  teacher: ['educator', 'attendance', 'classroom', 'school', 'coaching'],
  // Civic & Tax
  tax: ['taxes', 'compliance', 'levy', 'market', 'stall', 'revenue', 'property', 'municipal'],
  civic: ['governance', 'citizen', 'corruption', 'reporting', 'whistleblower', 'voice'],
  // Gender & Inclusion
  women: ['woman', 'female', 'gender', 'mother', 'mothers', 'wife', 'kinship', 'time-poverty'],
  gender: ['women', 'female', 'intra-household', 'bargaining', 'agency', 'privacy'],
  // Scarcity & Psychology
  scarcity: ['poverty', 'bandwidth', 'stress', 'cortisol', 'discounting', 'sludge', 'friction'],
  trust: ['trusted', 'credibility', 'suspicion', 'elder', 'religious', 'messenger', 'reputation'],
  reminder: ['reminders', 'sms', 'timing', 'notification', 'prompt', 'alert'],
};

function json(data, init = {}) {
  return Response.json(data, {
    ...init,
    headers: { ...corsHeaders, ...(init.headers || {}) },
  });
}

function getEnv(key) {
  const keysToTry = [key, key.toLowerCase(), key.toUpperCase()];
  if (key === 'GEMINI_API_KEY') {
    keysToTry.push('GOOGLE_API_KEY', 'GEMINI_KEY', 'google_api_key', 'gemini_api_key');
  }
  if (key === 'YARNGPT_API_KEY' || key === 'HF_TOKEN') {
    keysToTry.push('YARNGPT_API_KEY', 'HF_TOKEN', 'hf_token', 'yarngpt_api_key', 'HUGGINGFACE_TOKEN', 'YARN_API_KEY', 'YARNGPT_KEY');
  }

  for (const k of keysToTry) {
    try {
      if (typeof process !== 'undefined' && process.env && process.env[k]) {
        return process.env[k];
      }
    } catch {}
    try {
      if (typeof Netlify !== 'undefined' && Netlify?.env?.get && typeof Netlify.env.get === 'function') {
        const val = Netlify.env.get(k);
        if (val) return val;
      }
    } catch {}
  }
  return undefined;
}

async function loadBusaraCorpus() {
  if (BUSARA_CORPUS && Array.isArray(BUSARA_CORPUS.documents)) {
    return BUSARA_CORPUS;
  }
  return { documents: [], sources: {} };
}

function normalizeToken(word) {
  let token = String(word || '').toLowerCase();
  if (token.endsWith('ies') && token.length > 5) token = `${token.slice(0, -3)}y`;
  else if (token.endsWith('ing') && token.length > 6) token = token.slice(0, -3);
  else if (token.endsWith('ed') && token.length > 5) token = token.slice(0, -2);
  else if (token.endsWith('s') && token.length > 5) token = token.slice(0, -1);
  return token;
}

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map(normalizeToken)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

function tokenSet(text) {
  return new Set(tokenize(text));
}

function expandQueryTokens(tokens) {
  const expanded = new Set(tokens);
  for (const token of tokens) {
    for (const synonym of SYNONYMS[token] || []) {
      expanded.add(normalizeToken(synonym));
    }
  }
  return expanded;
}

function phraseBoost(prompt, doc) {
  const promptText = String(prompt || '').toLowerCase();
  const docText = [
    doc.title,
    doc.summary,
    doc.tags?.join(' '),
    doc.domain?.join(' '),
    doc.country?.join(' '),
    doc.population?.join(' '),
    doc.mechanism?.join(' '),
    doc.channel?.join(' '),
    doc.text
  ]
    .join(' ')
    .toLowerCase();

  let score = 0;
  for (const phrase of [
    'mobile money', 'digital credit', 'cash transfer', 'cash transfers',
    'social norms', 'social norm', 'public health', 'health worker',
    'savings group', 'savings groups', 'community health', 'mobile banking',
    'financial inclusion', 'informal settlement', 'teacher performance',
    'maternal health', 'antenatal care', 'child immunization', 'vaccine uptake',
    'clean water', 'chlorine dispenser', 'weather insurance', 'index insurance',
    'fertilizer adoption', 'drought tolerant', 'soil testing', 'hermetic storage',
    'teaching at the right level', 'tarl', 'parental engagement', 'growth mindset',
    'tax compliance', 'property tax', 'civic reporting', 'anonymous reporting',
    'kinship tax', 'women empowerment', 'time poverty', 'in-kind grants',
    'cognitive tax', 'bandwidth poverty', 'temporal discounting', 'sludge audit',
    'e-voucher', 'agent banking', 'fuliza', 'chama', 'rosca'
  ]) {
    if (promptText.includes(phrase) && docText.includes(phrase)) score += 9;
  }
  return score;
}

async function retrieveBusaraContext(prompt) {
  const { documents, sources } = await loadBusaraCorpus();
  if (!documents.length) return '';

  const queryTokens = expandQueryTokens(tokenize(prompt));
  const scored = documents
    .map((doc) => {
      const titleTokens = tokenSet(doc.title);
      const summaryTokens = tokenSet(doc.summary);
      const tagTokens = tokenSet(doc.tags?.join(' '));
      const domainTokens = tokenSet(doc.domain?.join(' '));
      const countryTokens = tokenSet(doc.country?.join(' '));
      const populationTokens = tokenSet(doc.population?.join(' '));
      const mechanismTokens = tokenSet(doc.mechanism?.join(' '));
      const channelTokens = tokenSet(doc.channel?.join(' '));
      const textTokens = tokenSet(doc.text);
      let score = phraseBoost(prompt, doc);
      for (const token of queryTokens) {
        if (countryTokens.has(token)) score += 9;
        if (domainTokens.has(token)) score += 8;
        if (mechanismTokens.has(token)) score += 8;
        if (populationTokens.has(token)) score += 7;
        if (tagTokens.has(token)) score += 6;
        if (channelTokens.has(token)) score += 5;
        if (titleTokens.has(token)) score += 5;
        if (summaryTokens.has(token)) score += 3;
        if (textTokens.has(token)) score += 1;
      }
      return { doc, score };
    })
    .filter((item) => item.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!scored.length) return '';

  return scored
    .map(({ doc }, index) => {
      const source = formatSources(doc.source, sources);
      const meta = [
        fieldList('Domains', doc.domain),
        fieldList('Countries', doc.country),
        fieldList('Populations', doc.population),
        fieldList('Mechanisms', doc.mechanism),
        fieldList('Channels', doc.channel),
        fieldValue('Effect', doc.effect_size),
        fieldValue('Design implication', doc.design_implication),
        fieldList('Works when', doc.works_when),
        fieldList('Fails when', doc.fails_when),
        fieldValue('Evidence', doc.evidence_strength),
        fieldValue('Confidence', doc.confidence),
        fieldList('Tags', doc.tags),
      ].filter(Boolean).join(' ');
      const body = doc.summary || doc.text || '';
      return `${index + 1}. [${doc.domain?.join(', ') || 'General'}] ${doc.title || 'Untitled Busara note'} - ${body} ${meta}${source ? ` Source: ${source}` : ''}`;
    })
    .join('\n');
}

function fieldList(label, values) {
  return Array.isArray(values) && values.length ? `${label}: ${values.join(', ')}.` : '';
}

function fieldValue(label, value) {
  return value ? `${label}: ${value}.` : '';
}

function formatSources(sourceValue, sources) {
  if (!sourceValue) return '';

  const raw = String(sourceValue);
  const ids = [...raw.matchAll(/\d+/g)].map((match) => match[0]);
  if (!ids.length) return raw;

  const resolved = ids
    .map((id) => sources[id] ? `[${id}] ${sources[id].title}: ${sources[id].url}` : `[${id}]`)
    .join('; ');

  return resolved || raw;
}

async function discoverSupportedGeminiModels(apiKey) {
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`, {
      signal: ctrl.signal
    });
    clearTimeout(tid);
    if (res.ok) {
      const data = await res.json();
      return (data.models || [])
        .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
        .map(m => m.name.replace(/^models\//, ''));
    }
  } catch (e) {
    console.warn('Model discovery notice:', e.message);
  }
  return [];
}

async function processAnalyze(body) {
  // 1. Diagnostic: Test Gemini Key & List Available Models
  if (body.action === 'test_gemini' || body.action === 'list_models') {
    const key = (body.gemini_key || body.api_key || '').trim() || getEnv('GEMINI_API_KEY');
    if (!key) {
      return {
        statusCode: 400,
        body: { ok: false, error: 'No GEMINI_API_KEY detected in Netlify environment variables.' }
      };
    }
    try {
      const models = await discoverSupportedGeminiModels(key);
      if (models.length > 0) {
        return {
          statusCode: 200,
          body: {
            ok: true,
            models: models.slice(0, 10),
            message: `Google Gemini API connected via Netlify! Active models: ${models.slice(0, 4).join(', ')}`
          }
        };
      }
      const testRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash?key=${encodeURIComponent(key)}`);
      if (testRes.ok) {
        return {
          statusCode: 200,
          body: { ok: true, message: 'Google Gemini 2.5 Flash connected via Netlify!' }
        };
      }
      const errJson = await testRes.json().catch(() => ({}));
      return {
        statusCode: testRes.status,
        body: { ok: false, error: errJson?.error?.message || `HTTP ${testRes.status}` }
      };
    } catch (err) {
      return { statusCode: 500, body: { ok: false, error: err.message } };
    }
  }

  // 1b. Diagnostic: Test Direct Model Generation & Measure Latency
  if (body.action === 'test_model') {
    const key = (body.gemini_key || body.api_key || '').trim() || getEnv('GEMINI_API_KEY');
    const model = body.model || 'gemini-2.5-flash';
    const start = Date.now();
    try {
      const genConfig = {
        maxOutputTokens: 100,
        temperature: 0.3
      };
      if (body.thinkingBudget !== undefined) {
        genConfig.thinkingConfig = { thinkingBudget: body.thinkingBudget };
      }
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: body.prompt || "Hello! Reply with 'OK' in 1 word." }] }],
          generationConfig: genConfig
        })
      });
      const elapsed = Date.now() - start;
      const data = await res.json().catch(() => ({}));
      return { statusCode: res.status, body: { ok: res.ok, elapsed, model, data } };
    } catch (e) {
      return { statusCode: 500, body: { ok: false, error: e.message } };
    }
  }


  // 2. Diagnostic: Test YarnGPT / HF Token
  if (body.action === 'test_hf_token' || body.action === 'test_voice_key') {
    const clientToken = (body.hf_token || body.api_key || body.yarngpt_key || '').trim();
    const token = clientToken || getEnv('YARNGPT_API_KEY') || getEnv('HF_TOKEN');

    if (!token) {
      return {
        statusCode: 200,
        body: { 
          ok: false, 
          error: 'No key detected. Please add YARNGPT_API_KEY (or HF_TOKEN) in Netlify environment variables.' 
        }
      };
    }

    if (!token.startsWith('hf_')) {
      try {
        const yarnRes = await fetch('https://api.yarngpt.ai/api/v1/voices', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (yarnRes.ok) {
          const voices = await yarnRes.json().catch(() => []);
          const voiceNames = Array.isArray(voices) ? voices.map(v => v.name).filter(Boolean) : [];
          return {
            statusCode: 200,
            body: {
              ok: true,
              provider: 'yarngpt',
              voices: voiceNames,
              message: `YarnGPT API Key is valid! Authenticated with YarnGPT Cloud (Voices available: ${voiceNames.slice(0, 4).join(', ') || 'default'}).`
            }
          };
        } else if (yarnRes.status === 401) {
          return {
            statusCode: 401,
            body: { ok: false, error: 'Invalid YarnGPT API Key (HTTP 401). Verify your key from yarngpt.ai/account.' }
          };
        } else {
          const errData = await yarnRes.json().catch(() => ({}));
          const errMsg = errData?.error?.user_message || errData?.error?.message || `YarnGPT HTTP ${yarnRes.status}`;
          return { statusCode: 200, body: { ok: false, error: `YarnGPT API: ${errMsg}` } };
        }
      } catch (yErr) {
        return { statusCode: 200, body: { ok: false, error: `Connection to YarnGPT API failed: ${yErr.message}` } };
      }
    }

    try {
      const whoamiRes = await fetch('https://huggingface.co/api/whoami-v2', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (whoamiRes.ok) {
        const userInfo = await whoamiRes.json().catch(() => ({}));
        const username = userInfo.name || userInfo.username || 'User';
        return {
          statusCode: 200,
          body: {
            ok: true,
            provider: 'huggingface',
            username,
            message: `HF_TOKEN is valid! Authenticated as @${username} on Hugging Face.`
          }
        };
      } else {
        const errInfo = await whoamiRes.json().catch(() => ({}));
        return {
          statusCode: 200,
          body: { ok: false, error: errInfo.error || `Invalid Hugging Face token (HTTP ${whoamiRes.status}).` }
        };
      }
    } catch (testErr) {
      return { statusCode: 500, body: { ok: false, error: testErr.message } };
    }
  }

  // 3. Action: Synthesize YarnGPT Voice
  if (body.action === 'synthesize_yarngpt') {
    const rawText = body.text || '';
    const language = (body.language || 'english').toLowerCase();
    const clientToken = (body.hf_token || body.api_key || body.yarngpt_key || '').trim();
    const customEndpoint = (body.endpoint_url || getEnv('YARNGPT_ENDPOINT_URL') || '').trim();
    const apiKey = clientToken || getEnv('YARNGPT_API_KEY') || getEnv('HF_TOKEN');

    const text = rawText
      .replace(/\[.*?\]/g, '')
      .replace(/[*_#~]/g, '')
      .trim();

    if (!text) {
      return { statusCode: 400, body: { error: 'Missing text for synthesis' } };
    }

    if (customEndpoint) {
      try {
        const epRes = await fetch(customEndpoint, {
          method: 'POST',
          headers: {
            'Authorization': apiKey ? `Bearer ${apiKey}` : undefined,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ inputs: text, text, language, voice: body.voice || undefined })
        });
        if (epRes.ok) {
          const contentType = epRes.headers.get('content-type') || 'audio/wav';
          const audioBuffer = await epRes.arrayBuffer();
          const base64Audio = Buffer.from(audioBuffer).toString('base64');
          return {
            statusCode: 200,
            body: {
              ok: true,
              audio_base64: `data:${contentType};base64,${base64Audio}`,
              language,
              engine: 'Custom YarnGPT Endpoint (Active)'
            }
          };
        }
      } catch (epErr) {
        console.warn('Custom endpoint synthesis error:', epErr.message);
      }
    }

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
        console.warn('YarnGPT /api/v1/tts error:', ttsErr.message);
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
        console.warn('YarnGPT streaming error:', convErr.message);
      }
    }

    return {
      statusCode: 200,
      body: {
        fallback: true,
        language,
        text,
        has_token: !!apiKey,
        message: apiKey
          ? (apiKey.startsWith('hf_')
              ? 'HF_TOKEN detected. For official YarnGPT Cloud speech, add YARNGPT_API_KEY from yarngpt.ai/account.'
              : 'Using African Neural Voice Engine preview.')
          : 'Using African Neural Voice Engine preview.'
      }
    };
  }

  // 4. Default: Run Behavioral Synthesis via Google Gemini
  const { prompt } = body;
  if (!prompt || typeof prompt !== 'string') {
    return { statusCode: 400, body: { error: 'Missing prompt' } };
  }
  if (prompt.length > 20000) {
    return { statusCode: 413, body: { error: 'Prompt is too long. Please shorten the campaign details.' } };
  }

  const apiKey = getEnv('GEMINI_API_KEY') || (body.gemini_key || body.api_key || '').trim();
  if (!apiKey) {
    return {
      statusCode: 500,
      body: { error: 'GEMINI_API_KEY not configured. Add it in Netlify → Site configuration → Environment variables.' }
    };
  }

  try {
    const busaraContext = await retrieveBusaraContext(prompt);
    const SPEED_DIRECTIVE = `\nPERFORMANCE DIRECTIVE: Output concise, high-density behavioral precision (max 15 words per description, max 25 words per spoken script, max 2 items in levers_present, levers_missing, evidence_cards, and transferability_caveats). Ensure complete, valid JSON under 1200 tokens.`;
    const fullPrompt = busaraContext
      ? `${SYSTEM_PROMPT}\n\nBUSARA RESEARCH CONTEXT (7 PRIORITIZED DOMAINS):\n${busaraContext}\n\nUSER REQUEST (STRUCTURED PROBLEM SPECIFICATION):\n${prompt}${SPEED_DIRECTIVE}`
      : `${SYSTEM_PROMPT}\n\nUSER REQUEST (STRUCTURED PROBLEM SPECIFICATION):\n${prompt}${SPEED_DIRECTIVE}`;

    // NudgeDesigner Resilient Multi-Tier Model Fallback Pipeline:
    // 1. gemini-3.5-flash-lite: Sub-500ms latency, independent quota tier, robust JSON.
    // 2. gemini-3.5-flash: High-capability reasoning model with thinkingBudget 0.
    // 3. gemini-2.5-flash: Standard production workhorse with thinkingBudget 0.
    // 4. gemini-flash-lite-latest: Additional dynamic failover endpoint.
    const candidateModels = [
      { name: 'gemini-3.5-flash-lite', timeoutMs: 8000 },
      { name: 'gemini-3.5-flash', thinkingBudget: 0, timeoutMs: 8000 },
      { name: 'gemini-2.5-flash', thinkingBudget: 0, timeoutMs: 8000 },
      { name: 'gemini-flash-lite-latest', timeoutMs: 8000 }
    ];

    let lastError = null;
    let geminiData = null;

    for (const candidate of candidateModels) {
      const candidateName = typeof candidate === 'string' ? candidate : candidate.name;
      const budget = typeof candidate === 'object' && candidate.thinkingBudget !== undefined ? candidate.thinkingBudget : null;
      const timeoutMs = (typeof candidate === 'object' && candidate.timeoutMs) || 8000;
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${candidateName}:generateContent?key=${encodeURIComponent(apiKey)}`;
      
      const genConfig = {
        maxOutputTokens: 3500,
        temperature: 0.3,
        responseMimeType: "application/json"
      };
      if (budget !== null && budget !== undefined) {
        genConfig.thinkingConfig = { thinkingBudget: budget };
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        let geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            generationConfig: genConfig
          })
        });
        clearTimeout(timeoutId);

        // If HTTP 400 (e.g. model rejects thinkingConfig or responseMimeType), retry once with plain config
        if (geminiRes.status === 400) {
          const retryCtrl = new AbortController();
          const retryTid = setTimeout(() => retryCtrl.abort(), 8000);
          geminiRes = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: retryCtrl.signal,
            body: JSON.stringify({
              contents: [{ parts: [{ text: fullPrompt }] }],
              generationConfig: {
                maxOutputTokens: 3500,
                temperature: 0.3
              }
            })
          });
          clearTimeout(retryTid);
        }

        if (geminiRes.ok) {
          geminiData = await geminiRes.json();
          break;
        } else {
          const errJson = await geminiRes.json().catch(() => ({}));
          lastError = errJson?.error?.message || `Gemini API HTTP ${geminiRes.status} (${candidateName})`;
          // Seamlessly try next candidate model on any transient error (404, 400, 403, 429, 500, 502, 503)
          if (geminiRes.status >= 400) {
            continue; // try next candidate model
          }
          break;
        }
      } catch (reqErr) {
        lastError = `${candidateName}: ${reqErr.message}`;
        continue;
      }
    }

    if (!geminiData || !Array.isArray(geminiData.candidates) || !geminiData.candidates.length) {
      const blockReason = geminiData?.promptFeedback?.blockReason;
      const errorMsg = blockReason 
        ? `Gemini request blocked by safety filter: ${blockReason}`
        : (lastError || 'Gemini generation returned no candidates');
      return { statusCode: 502, body: { error: errorMsg } };
    }

    return { statusCode: 200, body: geminiData };

  } catch (err) {
    console.error('Gemini error:', err);
    return { statusCode: 500, body: { error: err.message } };
  }
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
      let body;
      try {
        body = await req.json();
      } catch {
        return Response.json({ error: 'Invalid JSON request body' }, { status: 400, headers: corsHeaders });
      }
      const result = await processAnalyze(body);
      return Response.json(result.body, { status: result.statusCode, headers: corsHeaders });
    }

    // Fallback if invoked as AWS Lambda event
    return handler(req, context);
  } catch (fatalErr) {
    return Response.json({ error: fatalErr.message }, { status: 500, headers: corsHeaders });
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
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid JSON request body' }) };
    }
    const result = await processAnalyze(body);
    return {
      statusCode: result.statusCode,
      headers: corsHeaders,
      body: JSON.stringify(result.body),
    };
  } catch (fatalErr) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: fatalErr.message }),
    };
  }
}
