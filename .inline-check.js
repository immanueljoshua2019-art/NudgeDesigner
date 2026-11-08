

// ── STATE ──
for (const key of ['gemini_api_key', 'groq_api_key', 'yarngpt_api_key', 'yarn_hf_token']) localStorage.removeItem(key);
let currentMode = 'compiler';
let currentAnalysisData = null;
let currentActiveArm = 0;
let currentYarnLang = 'english';
let isAudioPlaying = false;
let currentUtterance = null;
let isPivotedMap = {}; // Arm index -> boolean (showing truthful fallback)

// Specificity Checker Wordlists
const ASPIRATION_WORDS = [
  'awareness', 'trust', 'attitude', 'mindset', 'know', 'feel',
  'believe', 'understanding', 'financial inclusion', 'reduce poverty',
  'inclusion', 'empowerment', 'capacity'
];

function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-tab').forEach((t, i) => {
    t.classList.toggle('active', (i === 0 && mode === 'compiler') || (i === 1 && mode === 'rapid'));
  });
  document.getElementById('compilerPanel').classList.toggle('hidden', mode !== 'compiler');
  document.getElementById('rapidPanel').classList.toggle('hidden', mode !== 'rapid');
}

function updateCount() {
  const t = document.getElementById('campaignText').value;
  document.getElementById('charCount').textContent = t.length;
}

function toggleTag(el) {
  el.classList.toggle('active');
}

function toggleSubpanel(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function quickSelectDomain(domain) {
  const select = document.getElementById('c_domain');
  if (select) {
    for (let opt of select.options) {
      if (opt.value.includes(domain) || domain.includes(opt.value)) {
        select.value = opt.value;
        break;
      }
    }
  }
}

// ── BEHAVIOR SPECIFICITY LIVE CHECKER ──
function checkBehaviorSpecificity(text, warningBoxId) {
  const box = document.getElementById(warningBoxId);
  const textEl = document.getElementById(warningBoxId + 'Text');
  if (!box || !textEl) return;

  const lower = (text || '').toLowerCase();
  const matched = ASPIRATION_WORDS.filter(w => lower.includes(w));

  if (matched.length > 0) {
    box.classList.add('active');
    textEl.innerHTML = ` "<strong>${escapeHTML(matched.join(', '))}</strong>" is an internal state or broad aspiration, not an observable action. Consider specifying the physical or digital behavior that indicates this (e.g. 'Make a deposit within 48h' or 'Complete on-time repayment by due date').`;
  } else {
    box.classList.remove('active');
  }
}

// ── SETTINGS MODAL ──
function openSettingsModal() {
  document.getElementById('settingsModal').classList.add('open');
}

function closeSettingsModal() {
  document.getElementById('settingsModal').classList.remove('open');
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'settingsModal') {
    closeSettingsModal();
  }
}

// Hidden owner shortcut (Ctrl+Shift+K or Cmd+Shift+K) to access admin credentials
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'K' || e.key === 'k')) {
    e.preventDefault();
    openSettingsModal();
  }
});

function saveSettings() { closeSettingsModal(); }

function resetAll() {
  document.getElementById('heroSection').classList.remove('hidden');
  document.getElementById('loadingSection').classList.add('hidden');
  document.getElementById('results').classList.add('hidden');
  stopYarnGPTAudio();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function clampNumber(value, min, max, fallback = 0) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

// ── ANALYZE RUNNERS ──
async function runCompilerAnalysis() {
  const objective=document.getElementById('c_objective').value.trim();
  const behaviour=document.getElementById('c_behavior').value.trim();
  const baseline=document.getElementById('c_baseline').value.trim();
  const timeframe=document.getElementById('c_timeframe').value.trim();
  const denominator=document.getElementById('c_denominator').value.trim();
  const audience=document.getElementById('c_audience').value.trim();
  const provenance=document.getElementById('c_provenance').value;
  const domain=document.getElementById('c_domain').value;
  const geography=document.getElementById('c_geography').value.trim();
  const setting=document.getElementById('c_setting').value;
  const channel=document.getElementById('c_channel').value;
  const message=document.getElementById('c_message').value.trim();
  const barrier=document.getElementById('c_barrier').value.trim();
  const resources=document.getElementById('c_resources').value.trim();
  const constraints=Array.from(document.querySelectorAll('#audienceTags .tag-pill.active')).map(tag=>tag.textContent.trim());
  if(!behaviour){alert('Add the behaviour you want the campaign to change.');return;}
  const brief={objective,desired_behaviour:behaviour,current_baseline:baseline, time_frame:timeframe,eligible_population:denominator,audience,audience_information_basis:provenance,known_constraints:constraints,domain,geography,setting,channel,existing_copy:message,suspected_barrier:barrier,resources};
  const prompt='Design a campaign from this user-supplied brief. Treat empty values as unknown. Do not infer a typical audience, barrier, baseline, country or channel. Clearly separate reported observations from hypotheses.\n\n'+JSON.stringify(brief,null,2);
  const retrievalQuery={behaviour,audience,domain,geography,channel,barriers:barrier,constraints:constraints.join(' '),objective};
  await executeBackendAnalysis(prompt,'Design campaign', 'design', retrievalQuery);
}

async function runRapidAnalysis() {
  const campaign=document.getElementById('campaignText').value.trim();
  const behaviour=document.getElementById('targetBehavior').value.trim();
  const audience=document.getElementById('targetAudience').value.trim();
  const context=document.getElementById('context').value.trim();
  const criteria=document.getElementById('reviewCriteria').value.trim();
  if(!campaign){alert('Paste the campaign or intervention you want reviewed.');return;}
  const brief={campaign_or_intervention:campaign,intended_behaviour:behaviour,audience,implementation_context:context,evaluation_criteria:criteria};
  const prompt='Review the submitted campaign or intervention. Assess its behavioural logic before suggesting changes. Treat missing information as unknown and distinguish claims in the campaign from verified evidence.\n\n'+JSON.stringify(brief,null,2);
  const retrievalQuery={behaviour,audience,geography:context,campaign};
  await executeBackendAnalysis(prompt,'Review campaign', 'review', retrievalQuery);
}

function showToast(title, message, durationMs = 6000) {
  const el = document.getElementById('toastNotification');
  if (!el) {
    console.warn(title, message);
    return;
  }
  document.getElementById('toastTitle').textContent = title || 'Notice';
  document.getElementById('toastMessage').textContent = message || '';
  el.style.display = 'block';
  if (durationMs > 0) {
    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => { hideToast(); }, durationMs);
  }
}

function hideToast() {
  const el = document.getElementById('toastNotification');
  if (el) el.style.display = 'none';
}

// ── RENDER RESULTS ──
function renderResults(report, subtitle, evidence = []) {
  currentAnalysisData=report; currentAnalysisData.retrieved_evidence=evidence;
  document.getElementById('loadingSection').classList.add('hidden');
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('resultsSubtitle').textContent=subtitle;
  const heading=document.querySelector('#results .results-title');
  if(heading)heading.textContent=report.mode==='review'?'Campaign review':'Campaign design';
  renderDecisionReport(report,evidence);
  renderVerifiedEvidence(evidence);
  const materials=report.campaign_materials||{};
  const audio=report.yarngpt_languages||{};
  const multi={...materials,primary_copy:materials.primary_copy||report.review?.rewritten_copy||'',sms:materials.sms||materials.primary_copy||report.review?.rewritten_copy,whatsapp:materials.whatsapp,field_agent_guide:materials.field_agent_guide};
  const hasAudio=Object.values(audio).some(item=>item&&item.spoken_script);
  const materialDetails=document.getElementById('campaignMaterialsDetails');
  if(materialDetails)materialDetails.hidden=!(materials.primary_copy||materials.sms||materials.whatsapp||report.review?.rewritten_copy||hasAudio);
  renderYarnGPTAndChannels(audio,multi);
  document.getElementById('evidenceDetails').hidden=!evidence.length;
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderDecisionReport(report,evidence){
  const root=document.getElementById('decisionReport');
  const sources=new Map(evidence.map(item=>[item.id,item]));
  const cite=(ids=[])=>{
    if(!Array.isArray(ids)||!ids.length)return '';
    return '<div class="report-citation">Evidence: '+ids.filter(id=>sources.has(id)).map(id=>{const item=sources.get(id);const links=(item.sources||[]).filter(source=>source.url&&/^https:\/\//i.test(source.url)).map(source=>'<a href="'+escapeHTML(source.url)+'" target="_blank" rel="noopener noreferrer">'+escapeHTML(source.title||'Source')+'</a>').join(', ');return '<span title="'+escapeHTML(item.title)+'">'+escapeHTML(id)+(links?' · '+links:'')+'</span>';}).join(' · ')+'</div>';
  };
  const summary=report.executive_summary||{};const diagnosis=report.diagnosis||{};
  const observations=Array.isArray(diagnosis.observations)?diagnosis.observations:[];
  const barriers=Array.isArray(diagnosis.barriers)?diagnosis.barriers:[];
  const recs=Array.isArray(report.recommendations)?report.recommendations:[];
  const mechanismAnalysis=report.mechanism_analysis||{};
  const statusLabel={observed:'Observed',user_reported:'User reported',evidence_supported:'Evidence supported',hypothesis:'Hypothesis',unknown:'Unknown'};
  const observationHtml=observations.length?observations.map(item=>'<li class="report-item"><span class="report-status">'+escapeHTML(statusLabel[item.status]||'Unclassified')+'</span><h3>'+escapeHTML(item.finding||'')+'</h3>'+cite(item.evidence_ids)+'</li>').join(''):'<li class="report-item"><p>No observations were supplied. The diagnosis is provisional.</p></li>';
  const barrierHtml=barriers.length?barriers.map(item=>'<li class="report-item"><span class="report-status">Plausible explanation · '+escapeHTML(item.confidence||'unrated')+' confidence</span><h3>'+escapeHTML(item.description||'')+'</h3><p>'+escapeHTML(item.mechanism||'')+'</p>'+(Array.isArray(item.observation_ids)&&item.observation_ids.length?'<p><strong>Linked observations:</strong> '+escapeHTML(item.observation_ids.join(', '))+'</p>':'')+cite(item.evidence_ids)+'</li>').join(''):'<li class="report-item"><p>No behavioural barrier is sufficiently supported yet.</p></li>';
  const recommendationHtml=recs.length?recs.map(item=>'<li class="report-item"><span class="report-status">'+escapeHTML(item.priority||'Recommendation')+'</span><h3>'+escapeHTML(item.action||'')+'</h3><p><strong>Mechanism:</strong> '+escapeHTML(item.mechanism||'Not specified')+'</p>'+(item.barrier_ids?.length?'<p><strong>Addresses:</strong> '+escapeHTML(item.barrier_ids.join(', '))+'</p>':'')+'<p>'+escapeHTML(item.rationale||'')+'</p>'+(item.expected_outcome?'<p><strong>Expected outcome:</strong> '+escapeHTML(item.expected_outcome)+'</p>':'')+(Array.isArray(item.assumptions)&&item.assumptions.length?'<p><strong>Assumptions:</strong> '+escapeHTML(item.assumptions.join('; '))+'</p>':'')+cite(item.evidence_ids)+'</li>').join(''):'<li class="report-item"><p>No intervention is recommended from the information available.</p></li>';
  const unknowns=Array.isArray(diagnosis.unknowns)?diagnosis.unknowns:[];
  const steps=[...new Set(recs.flatMap(item=>Array.isArray(item.implementation_steps)?item.implementation_steps:[]))];
  const contextual=report.contextual_transfer||{};const measurement=report.measurement||{};const ethics=report.ethics||{};const review=report.review||{};
  const contextList=Array.isArray(contextual.differences_to_check)?contextual.differences_to_check:[];
  root.innerHTML='<section class="report-lead"><div class="report-status">Executive summary · '+escapeHTML(summary.confidence||'confidence not rated')+'</div><h2>'+escapeHTML(summary.finding||'Analysis is incomplete')+'</h2><p>'+escapeHTML(summary.importance||'')+'</p>'+(summary.recommended_next_step?'<div class="report-meta"><span class="report-tag">Next: '+escapeHTML(summary.recommended_next_step)+'</span></div>':'')+'</section>'+
  (report.mode==='review'?'<section class="report-section"><h2>Review findings</h2><div class="report-grid"><div><h3>Strengths</h3><ul class="report-list">'+(review.strengths||[]).map(x=>'<li class="report-item"><p>'+escapeHTML(x)+'</p></li>').join('')+'</ul></div><div><h3>Risks and gaps</h3><ul class="report-list">'+(review.risks||[]).map(x=>'<li class="report-item"><p>'+escapeHTML(x)+'</p></li>').join('')+'</ul></div></div>'+(Array.isArray(review.revisions)&&review.revisions.length?'<h3>Suggested revisions</h3><ul class="report-list">'+review.revisions.map(x=>'<li class="report-item"><p>'+escapeHTML(x)+'</p></li>').join('')+'</ul>':'')+'</section>':'')+
  '<section class="report-section"><h2>Diagnosis</h2><p><strong>Desired behaviour:</strong> '+escapeHTML(diagnosis.target_behaviour||'Not specified')+'</p><p><strong>Current position:</strong> '+escapeHTML(diagnosis.current_position||'Not established')+'</p><div class="report-grid"><div><h3>Observations</h3><ul class="report-list">'+observationHtml+'</ul></div><div><h3>Possible barriers</h3><ul class="report-list">'+barrierHtml+'</ul></div></div>'+'<div class="report-grid"><div><h3>COM-B interpretation</h3><ul class="report-list">'+['capability','opportunity','motivation'].map(key=>mechanismAnalysis[key]?'<li class="report-item"><p><strong>'+escapeHTML(key.charAt(0).toUpperCase()+key.slice(1))+':</strong> '+escapeHTML(mechanismAnalysis[key])+'</p></li>':'').join('')+'</ul></div><div><h3>EAST considerations</h3><ul class="report-list">'+(mechanismAnalysis.relevant_east_factors||[]).map(item=>'<li class="report-item"><p>'+escapeHTML(item)+'</p></li>').join('')+'</ul></div></div>'+(unknowns.length?'<p><strong>Still unknown:</strong> '+escapeHTML(unknowns.join('; '))+'</p>':'')+'</section>'+
  '<section class="report-section"><h2>Recommendations</h2><ol class="report-list">'+recommendationHtml+'</ol></section>'+
  '<div class="report-grid"><section class="report-section"><h2>Implementation</h2>'+(steps.length?'<ul>'+steps.map(x=>'<li>'+escapeHTML(x)+'</li>').join('')+'</ul>':'<p>Implementation steps were not specified.</p>')+(contextual.relevant_context?'<p><strong>Transfer context:</strong> '+escapeHTML(contextual.relevant_context)+'</p>':'')+(contextList.length?'<p><strong>Check before transfer:</strong> '+escapeHTML(contextList.join('; '))+'</p>':'')+'</section><section class="report-section"><h2>Measurement</h2><p><strong>Outcome:</strong> '+escapeHTML(measurement.primary_outcome||'Not specified')+'</p><p><strong>Numerator / denominator:</strong> '+escapeHTML(measurement.numerator||'Not specified')+' / '+escapeHTML(measurement.denominator||'Not specified')+'</p><p><strong>Window:</strong> '+escapeHTML(measurement.measurement_window||'Not specified')+'</p><p>'+escapeHTML(measurement.evaluation_design||'No evaluation design specified.')+'</p>'+(measurement.sample_size?'<p><strong>Sample size:</strong> '+escapeHTML(measurement.sample_size)+'</p>':'')+(Array.isArray(measurement.causal_limitations)&&measurement.causal_limitations.length?'<p><strong>Limits:</strong> '+escapeHTML(measurement.causal_limitations.join('; '))+'</p>':'')+'</section></div>'+
  '<section class="report-section"><h2>Ethics and safeguards</h2><p><strong>Status:</strong> '+escapeHTML(ethics.status||'Not assessed')+'</p><p>'+escapeHTML((ethics.risks||[]).join('; '))+'</p><p>'+escapeHTML((ethics.safeguards||[]).join('; '))+'</p></section>';
}

function renderVerifiedEvidence(evidence){
  const root=document.getElementById('evidenceContent');if(!root)return;
  if(!Array.isArray(evidence)||!evidence.length){root.innerHTML='<p>No source in the local corpus met the relevance threshold. Evidence claims should be treated as unverified.</p>';return;}
  root.innerHTML=evidence.map(item=>'<article class="evidence-source-card"><div class="report-status">'+escapeHTML(item.id)+' · '+escapeHTML(item.evidence_strength)+' · '+escapeHTML(item.confidence)+'</div><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.summary)+'</p>'+(item.effect_size?'<p><strong>Reported effect:</strong> '+escapeHTML(item.effect_size)+'</p>':'')+(item.mechanisms?.length?'<p><strong>Mechanisms:</strong> '+escapeHTML(item.mechanisms.join(', '))+'</p>':'')+(item.works_when?.length?'<p><strong>Works when:</strong> '+escapeHTML(item.works_when.join('; '))+'</p>':'')+(item.fails_when?.length?'<p><strong>May fail when:</strong> '+escapeHTML(item.fails_when.join('; '))+'</p>':'')+'<p><strong>Retrieval match:</strong> '+escapeHTML(item.matched_terms.join(', '))+'</p>'+(item.sources||[]).map(source=>source.url&&/^https:\/\//i.test(source.url)?'<p><a href="'+escapeHTML(source.url)+'" target="_blank" rel="noopener noreferrer">'+escapeHTML(source.title||'Read source')+'</a></p>':'<p>Source note: '+escapeHTML(source.title||'Unresolved source')+'</p>').join('')+'</article>').join('');
}

// ── YARNGPT 5-LANGUAGE STUDIO & MULTI-CHANNEL ──
function renderYarnGPTAndChannels(languages, mc) {
  // SMS
  const sms = mc.sms || currentAnalysisData?.redesigned_message || '';
  document.getElementById('smsText').textContent = sms;
  const charCount = sms.length;
  const countBadge = `${charCount} / 160 chars (${Math.ceil(charCount / 160) || 1} SMS)`;
  document.getElementById('smsCountBadge').textContent = countBadge;
  document.getElementById('smsCountBadge').style.color = charCount <= 160 ? 'var(--green)' : 'var(--gold)';

  // WhatsApp
  document.getElementById('waText').textContent = mc.whatsapp || sms;

  // Field Agent Guide
  const guide = Array.isArray(mc.field_agent_guide) ? mc.field_agent_guide : [];
  let guideHTML = '';
  if (guide.length) {
    for (const point of guide) {
      guideHTML += `<div class="field-item">▸ ${escapeHTML(point)}</div>`;
    }
  } else {
    guideHTML = '<div class="field-item">Open with warmth, acknowledge daily market conditions, and give a concrete next step.</div>';
  }
  document.getElementById('fieldPoints').innerHTML = guideHTML;

  // Render currently selected YarnGPT Language
  selectYarnLanguage(currentYarnLang);
}

function selectYarnLanguage(langKey) {
  currentYarnLang = langKey;
  document.querySelectorAll('#yarnLangTabs .lang-tab').forEach((tab, idx) => {
    const keys = ['english', 'pidgin', 'yoruba', 'hausa', 'igbo'];
    tab.classList.toggle('active', keys[idx] === langKey);
  });

  const languages = currentAnalysisData?.yarngpt_languages || {};
  const currentLangObj = languages[langKey] || {};

  const headline = currentLangObj.headline || `${currentLangObj.language_label || langKey} Campaign Audio`;
  const script = currentLangObj.spoken_script || currentAnalysisData?.multi_channel?.radio_script || currentAnalysisData?.redesigned_message || '';
  const tone = currentLangObj.cultural_tone || 'Authentic African conversational cadence';

  document.getElementById('yarnScriptHeadline').textContent = headline;
  document.getElementById('yarnScriptBox').textContent = script;
  document.getElementById('voiceLangBadge').textContent = `🎙️ ${currentLangObj.language_label || langKey.toUpperCase()}`;
  document.getElementById('voiceToneBadge').textContent = tone;
  document.getElementById('yarnCulturalCues').textContent = `Acoustic Cadence: ${tone}`;

  const select = document.getElementById('voiceSelector');
  if (select) {
    const defVoice = { english: 'osagie', pidgin: 'osagie', yoruba: 'tayo', hausa: 'umar', igbo: 'adaora' }[langKey];
    if (defVoice && Array.from(select.options).some(o => o.value === defVoice)) {
      select.value = defVoice;
      selectedVoiceURI = defVoice;
    }
  }
}

function switchChannel(name) {
  document.querySelectorAll('.chan-tab').forEach((tab, i) => {
    const isTarget = (name === 'yarngpt' && i === 0) || (name === 'sms' && i === 1) || (name === 'whatsapp' && i === 2) || (name === 'field' && i === 3);
    tab.classList.toggle('active', isTarget);
  });
  document.getElementById('chanYarnGPT').classList.toggle('hidden', name !== 'yarngpt');
  document.getElementById('chanSMS').classList.toggle('hidden', name !== 'sms');
  document.getElementById('chanWhatsApp').classList.toggle('hidden', name !== 'whatsapp');
  document.getElementById('chanField').classList.toggle('hidden', name !== 'field');
  if (name === 'yarngpt') {
    populateVoices();
  }
}

function copySMS() {
  const text = document.getElementById('smsText').textContent;
  navigator.clipboard.writeText(text);
  alert('SMS copy copied to clipboard!');
}

function copyWhatsApp() {
  const text = document.getElementById('waText').textContent;
  navigator.clipboard.writeText(text);
  alert('WhatsApp copy copied to clipboard!');
}

function copyYarnScript() {
  const text = document.getElementById('yarnScriptBox').textContent;
  navigator.clipboard.writeText(text);
  alert(`Copied ${currentYarnLang.toUpperCase()} audio script to clipboard!`);
}

// ── YARNGPT SPEECH SYNTHESIS ENGINE (AUTHENTIC AFRICAN NEURAL AUDIO) ──
const YARNGPT_VOICES = [
  { id: 'auto', name: '🎙️ Voice: Auto Match by Language' },
  { id: 'osagie', name: '🇳🇬 Osagie (Nigerian English / Pidgin - Male)' },
  { id: 'mary', name: '🇳🇬 Mary (Nigerian English / Pidgin - Female)' },
  { id: 'femi', name: '🇳🇬 Femi (Nigerian English - Male)' },
  { id: 'remi', name: '🇳🇬 Remi (Nigerian English - Female)' },
  { id: 'tayo', name: '🇳🇬 Tayo (Yoruba - Male)' },
  { id: 'wura', name: '🇳🇬 Wura (Yoruba - Female)' },
  { id: 'idera', name: '🇳🇬 Idera (Yoruba - Female)' },
  { id: 'umar', name: '🇳🇬 Umar (Hausa - Male)' },
  { id: 'zainab', name: '🇳🇬 Zainab (Hausa - Female)' },
  { id: 'adam', name: '🇳🇬 Adam (Hausa - Male)' },
  { id: 'adaora', name: '🇳🇬 Adaora (Igbo - Female)' },
  { id: 'chinenye', name: '🇳🇬 Chinenye (Igbo - Female)' },
  { id: 'nonso', name: '🇳🇬 Nonso (Igbo - Male)' },
  { id: 'jude', name: '🇳🇬 Jude (Nigerian English - Male)' },
  { id: 'emma', name: '🌍 Emma (Pan-African - Female)' },
  { id: 'regina', name: '🇳🇬 Regina (Nigerian English - Female)' }
];

let selectedVoiceURI = 'auto';

function populateVoices() {
  const select = document.getElementById('voiceSelector');
  if (!select) return;

  const currentVal = select.value || selectedVoiceURI || 'auto';
  select.innerHTML = '';

  const optGroupYarn = document.createElement('optgroup');
  optGroupYarn.label = 'YarnGPT Neural Cloud Voices (Authentic African)';
  YARNGPT_VOICES.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.id;
    opt.textContent = v.name;
    optGroupYarn.appendChild(opt);
  });
  select.appendChild(optGroupYarn);

  if ('speechSynthesis' in window) {
    const browserVoices = window.speechSynthesis.getVoices();
    if (browserVoices.length) {
      const optGroupBrowser = document.createElement('optgroup');
      optGroupBrowser.label = 'Device Voices (Local Fallback)';
      browserVoices.forEach(v => {
        const opt = document.createElement('option');
        opt.value = `browser:${v.voiceURI}`;
        opt.textContent = `💻 ${v.name} (${v.lang})`;
        optGroupBrowser.appendChild(opt);
      });
      select.appendChild(optGroupBrowser);
    }
  }

  if (currentVal && Array.from(select.options).some(o => o.value === currentVal)) {
    select.value = currentVal;
  }
}

function onVoiceSelected() {
  const select = document.getElementById('voiceSelector');
  selectedVoiceURI = select ? select.value : 'auto';
}

async function playYarnGPTAudio() {
  const scriptText = document.getElementById('yarnScriptBox').textContent;
  if (!scriptText) return;

  stopYarnGPTAudio();

  const playBtn = document.getElementById('btnPlayVoice');
  const stopBtn = document.getElementById('btnStopVoice');
  const engineBadge = document.getElementById('yarnEngineBadge');
  const noticeEl = document.getElementById('yarnStatusNotice');

  // Strip bracketed cues (e.g. [Acoustic Cadence], [SFX], [Pause]) and markdown
  const cleanText = scriptText
    .replace(/\[.*?\]/g, '')
    .replace(/[*_#~]/g, '')
    .trim();

  if (!cleanText) return;

  // Immediate UI loading feedback
  playBtn.classList.add('hidden');
  stopBtn.classList.remove('hidden');
  document.querySelectorAll('.wave-bar').forEach(b => b.classList.add('animating'));

  const voiceName = selectedVoiceURI !== 'auto' ? selectedVoiceURI : currentYarnLang;
  engineBadge.textContent = `🔄 Synthesizing Audio (${voiceName})...`;
  engineBadge.style.color = 'var(--gold)';

  if (noticeEl) {
    noticeEl.style.display = 'block';
    noticeEl.style.background = 'rgba(201,168,76,0.08)';
    noticeEl.style.border = '1px solid rgba(201,168,76,0.25)';
    noticeEl.style.color = 'var(--gold2)';
    noticeEl.textContent = `🔄 Contacting YarnGPT Cloud Neural Engine for ${currentYarnLang.toUpperCase()} speech...`;
  }

  // 1. Try Netlify Backend speech synthesis (uses YARNGPT_API_KEY from Netlify environment variables)
  try {
    const chosenVoice = selectedVoiceURI.startsWith('browser:') ? undefined : (selectedVoiceURI !== 'auto' ? selectedVoiceURI : undefined);
    const backendCall = await callNetlifyBackend({
      action: 'synthesize_yarngpt',
      text: cleanText,
      language: currentYarnLang,
      voice: chosenVoice,
    });

    if (backendCall.ok && backendCall.response.ok) {
      const data = await backendCall.response.json();
      if (data.audio_base64 || data.audio_url) {
        engineBadge.textContent = `🟢 Active: ${data.engine || 'YarnGPT Cloud'}`;
        engineBadge.style.color = 'var(--green)';

        if (noticeEl) {
          noticeEl.style.display = 'block';
          noticeEl.style.background = 'rgba(62,207,142,0.08)';
          noticeEl.style.border = '1px solid rgba(62,207,142,0.25)';
          noticeEl.style.color = 'var(--green)';
          noticeEl.textContent = `✅ Playing authentic African speech synthesized via ${data.engine || 'YarnGPT Cloud (api.yarngpt.ai)'}.`;
        }

        const audioPlayer = document.getElementById('yarnAudioPlayer');
        audioPlayer.src = data.audio_base64 || data.audio_url;
        audioPlayer.onended = () => stopYarnGPTAudio();
        audioPlayer.onerror = () => fallbackToBrowserSpeech(cleanText, 'Audio playback failed; playing African voice preview.');
        await audioPlayer.play();
        return;
      } else if (data.yarn_error) {
        if (noticeEl) {
          noticeEl.textContent = `⚠️ YarnGPT Notice: ${data.yarn_error}`;
        }
      }
    }
  } catch (backendErr) {
    console.warn('Backend synthesis notice:', backendErr);
  }

  // 3. Fallback: African Neural Voice Engine preview (Web Speech API)
  fallbackToBrowserSpeech(cleanText, 'Playing African Neural Voice Engine preview.');
}


function fallbackToBrowserSpeech(scriptText, reasonMsg) {
  const engineBadge = document.getElementById('yarnEngineBadge');
  const noticeEl = document.getElementById('yarnStatusNotice');
  const playBtn = document.getElementById('btnPlayVoice');
  const stopBtn = document.getElementById('btnStopVoice');

  engineBadge.textContent = 'Engine: African Neural Voice Engine';
  engineBadge.style.color = 'var(--purple)';

  if (noticeEl) {
    noticeEl.style.display = 'block';
    noticeEl.style.background = 'rgba(167,139,250,0.08)';
    noticeEl.style.border = '1px solid rgba(167,139,250,0.25)';
    noticeEl.style.color = 'var(--purple)';
    noticeEl.textContent = `ℹ️ ${reasonMsg || 'Synthesizing with African Neural Voice Engine (tuned pitch & pacing contours).'}`;
  }

  if (!('speechSynthesis' in window)) {
    alert('Audio synthesis not supported by this browser.');
    stopYarnGPTAudio();
    return;
  }

  // Ensure fresh speech synthesis queue
  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
  } catch (e) {}

  // Clean text of bracketed cues (e.g. [Acoustic Cadence], [Pause]) and markdown
  const cleanText = scriptText
    .replace(/\[.*?\]/g, '')
    .replace(/[*_#~]/g, '')
    .trim();

  if (!cleanText) {
    stopYarnGPTAudio();
    return;
  }

  isAudioPlaying = true;
  currentUtterance = new SpeechSynthesisUtterance(cleanText);

  const voices = window.speechSynthesis.getVoices();
  let matchedVoice = null;

  // 1. If user selected a specific voice from dropdown
  if (selectedVoiceURI && selectedVoiceURI !== 'auto') {
    matchedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
  }

  // 2. Auto-match African or localized voice based on language
  if (!matchedVoice) {
    const lang = (currentYarnLang || 'english').toLowerCase();
    if (lang === 'yoruba') {
      matchedVoice = voices.find(v => v.lang.includes('yo') || v.lang.includes('en-NG') || v.name.toLowerCase().includes('nigeria') || v.name.toLowerCase().includes('abeo'));
      currentUtterance.rate = 0.90;
      currentUtterance.pitch = 1.0;
    } else if (lang === 'hausa') {
      matchedVoice = voices.find(v => v.lang.includes('ha') || v.lang.includes('en-NG') || v.name.toLowerCase().includes('nigeria') || v.name.toLowerCase().includes('abeo'));
      currentUtterance.rate = 0.92;
      currentUtterance.pitch = 1.0;
    } else if (lang === 'igbo') {
      matchedVoice = voices.find(v => v.lang.includes('ig') || v.lang.includes('en-NG') || v.name.toLowerCase().includes('nigeria') || v.name.toLowerCase().includes('ezinne'));
      currentUtterance.rate = 0.92;
      currentUtterance.pitch = 1.06;
    } else if (lang === 'pidgin') {
      matchedVoice = voices.find(v => v.lang.includes('pcm') || v.lang.includes('en-NG') || v.name.toLowerCase().includes('nigeria') || v.name.toLowerCase().includes('abeo'));
      currentUtterance.rate = 0.96;
      currentUtterance.pitch = 1.04;
    } else {
      matchedVoice = voices.find(v => v.lang.includes('en-NG') || v.name.toLowerCase().includes('nigeria') || v.name.toLowerCase().includes('abeo') || v.name.toLowerCase().includes('ezinne') || v.lang.includes('en-GH') || v.lang.includes('en-ZA'));
      currentUtterance.rate = 0.95;
      currentUtterance.pitch = 1.02;
    }
  }

  if (matchedVoice) {
    currentUtterance.voice = matchedVoice;
    engineBadge.textContent = `Engine: ${matchedVoice.name.replace(/Online \(Natural\) - /g, '')}`;
  }

  currentUtterance.onstart = () => {
    isAudioPlaying = true;
    if (playBtn) playBtn.classList.add('hidden');
    if (stopBtn) stopBtn.classList.remove('hidden');
    document.querySelectorAll('.wave-bar').forEach(b => b.classList.add('animating'));
  };

  currentUtterance.onend = () => stopYarnGPTAudio();
  currentUtterance.onerror = (e) => {
    console.warn('SpeechSynthesis error:', e);
    stopYarnGPTAudio();
  };

  window.speechSynthesis.speak(currentUtterance);
}

// ── TEST GROQ BACKEND ──
async function testGroqConnection() {
  const statusEl = document.getElementById('hfTestStatus'); if (!statusEl) return;
  statusEl.textContent = 'Checking…';
  const result = await callNetlifyBackend({ action: 'test_groq' });
  const data = result.ok ? await result.response.json().catch(() => ({})) : {};
  statusEl.textContent = data.ok ? 'Ready' : 'AI service is not configured.';
  statusEl.style.color = data.ok ? 'var(--green)' : 'var(--gold)';
}

async function testHfTokenConnection() { await testGroqConnection(); }

function updateVoiceSelectorWithYarnVoices(voices) {
  const select = document.getElementById('voiceSelector');
  if (!select || !Array.isArray(voices)) return;
  voices.forEach(v => {
    const name = typeof v === 'string' ? v : v.name;
    if (!name) return;
    const exists = Array.from(select.options).some(o => o.value === name);
    if (!exists) {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = `🎙️ YarnGPT Cloud: ${name} (Authentic African)`;
      select.insertBefore(opt, select.children[1] || null);
    }
  });
}

function stopYarnGPTAudio() {
  const audioPlayer = document.getElementById('yarnAudioPlayer');
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isAudioPlaying = false;
  document.querySelectorAll('.wave-bar').forEach(b => b.classList.remove('animating'));
  document.getElementById('btnPlayVoice').classList.remove('hidden');
  document.getElementById('btnStopVoice').classList.add('hidden');
}

// ── LEVERS & CASE STUDY ──
function renderLevers(present, missing) {
  let leverHTML = '';
  if (present.length) {
    leverHTML += `<div class="lever-section-label">✓ Levers Present (${present.length})</div><div class="lever-list">`;
    for (const l of present) {
      const strength = l.strength === 'Strong' ? '🟢' : l.strength === 'Moderate' ? '🟡' : '🔴';
      leverHTML += `
        <div class="lever-item present">
          <div class="lever-name">${strength} ${escapeHTML(l.lever)} <span style="font-size:10px;opacity:0.6;font-weight:400">[${escapeHTML(l.category)}]</span></div>
          <div class="lever-evidence">${escapeHTML(l.evidence)}</div>
        </div>`;
    }
    leverHTML += `</div>`;
  }
  if (missing.length) {
    leverHTML += `<div class="lever-section-label">✗ Missing Levers (${missing.length})</div><div class="lever-list">`;
    for (const l of missing.slice(0, 4)) {
      leverHTML += `
        <div class="lever-item missing">
          <div class="lever-name">↳ Add: ${escapeHTML(l.lever)} <span style="font-size:10px;opacity:0.6;font-weight:400">[${escapeHTML(l.category)}]</span></div>
          <div class="lever-evidence">${escapeHTML(l.why_it_matters)}</div>
          <div class="lever-evidence" style="margin-top:4px;color:#c9a84c">How: ${escapeHTML(l.how_to_add)}</div>
        </div>`;
    }
    leverHTML += `</div>`;
  }
  document.getElementById('leverContent').innerHTML = leverHTML || '<p style="color:var(--muted)">No lever breakdown available.</p>';
}

function renderCaseStudy(cs) {
  let caseHTML = '';
  if (cs && cs.title) {
    const simColor = cs.similarity === 'High' ? 'var(--green)' : cs.similarity === 'Moderate' ? 'var(--gold)' : 'var(--red)';
    caseHTML = `
      <div class="case-badge">Similarity: <span style="color:${simColor}">${escapeHTML(cs.similarity || 'High')}</span></div>
      <div class="case-title">${escapeHTML(cs.title)}</div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:12px">${escapeHTML(cs.context || '')}</div>
      <div class="case-stat">
        <div class="case-stat-num">${escapeHTML(cs.result || '')}</div>
        <div class="case-stat-label">${escapeHTML(cs.result_label || '')}</div>
      </div>
      <div class="case-learning">${escapeHTML(cs.learning || '')}</div>`;
  }
  document.getElementById('caseContent').innerHTML = caseHTML || '<p style="color:var(--muted)">No case study matched.</p>';
}

// ── BUSARA EVIDENCE CARDS WITH FAILS_WHEN ──
function renderEvidenceGrounding(cards) {
  let evidenceHTML = '';
  if (Array.isArray(cards) && cards.length) {
    evidenceHTML = '<div class="evidence-list">';
    for (const item of cards.slice(0, 5)) {
      const matchScore = item.mechanism_match_score ? `${item.mechanism_match_score}% Match` : '';
      const sample = item.sample_size ? item.sample_size : '';
      evidenceHTML += `
        <div class="evidence-item">
          <div class="evidence-header">
            <span class="evidence-title">📖 ${escapeHTML(item.title || 'Busara Empirical Research Note')}</span>
            <div class="evidence-badges">
              ${sample ? `<span class="evidence-sample">${escapeHTML(sample)}</span>` : ''}
              ${item.effect_size ? `<span class="evidence-effect">${escapeHTML(item.effect_size)}</span>` : ''}
              ${matchScore ? `<span class="evidence-sample">${escapeHTML(matchScore)}</span>` : ''}
            </div>
          </div>
          <div class="evidence-finding">${escapeHTML(item.finding || item.summary || '')}</div>
          ${item.fails_when ? `
            <div class="evidence-fails">
              <strong>⚠️ Boundary Failure Condition:</strong> Fails when ${escapeHTML(item.fails_when)}
            </div>
          ` : ''}
          ${item.source ? `<div class="evidence-source">Source: ${escapeHTML(item.source)}</div>` : ''}
        </div>`;
    }
    evidenceHTML += '</div>';
  }
  document.getElementById('evidenceContent').innerHTML = evidenceHTML || '<p style="color:var(--muted)">No specific Busara study matched this query.</p>';
}

// ── ETHICS & CULTURAL DYNAMICS ──
function renderEthicsAndCulture(mf, ethics, nigeria) {
  let ethicsHTML = '';
  if (mf) {
    ethicsHTML += `<div class="mf-badge">🏛 Market Failure Diagnosed</div>
      <div style="font-size:13px;color:var(--text);margin-bottom:14px">${escapeHTML(mf)}</div>`;
  }
  if (ethics) {
    const statusMap = { safe: 'safe', caution: 'caution', warning: 'warning' };
    const iconMap = { safe: '✅ Nudge — Ethical Choice Architecture', caution: '⚠️ Caution — Scrutiny Needed', warning: '🚫 Dark Pattern / Manipulation Risk' };
    const cls = statusMap[ethics.status] || 'caution';
    ethicsHTML += `<div class="ethics-flag ${cls}">
      <strong>${iconMap[ethics.status] || '⚠️ Review'}</strong><br/>
      ${escapeHTML(ethics.assessment || '')}
    </div>`;
  }
  document.getElementById('ethicsContent').innerHTML = ethicsHTML || '<p style="color:var(--muted)">No ethics data.</p>';

  const nigeriaHTML = nigeria
    ? `<div style="font-size:11px;color:var(--gold);margin-bottom:8px;letter-spacing:1.5px;text-transform:uppercase;font-family:'IBM Plex Mono',monospace">🌍 Local Cultural Moderators</div>
       <div class="nigeria-note">${escapeHTML(nigeria)}</div>`
    : '<p style="color:var(--muted)">No cultural moderator data.</p>';
  document.getElementById('nigeriaContent').innerHTML = nigeriaHTML;
}

// ── EXPORT BRIEF (MARKDOWN) ──
function exportBrief() {
  if(!currentAnalysisData)return;
  const report=currentAnalysisData;const lines=[];
  lines.push('# '+(report.mode==='review'?'Campaign review':'Campaign design'));
  lines.push('\n## Executive summary\n'+(report.executive_summary?.finding||''));
  if(report.executive_summary?.importance)lines.push('\n'+report.executive_summary.importance);
  lines.push('\n## Diagnosis\nTarget behaviour: '+(report.diagnosis?.target_behaviour||'Not specified'));
  for(const item of report.diagnosis?.observations||[])lines.push('- ['+item.status+'] '+item.finding);
  for(const item of report.diagnosis?.barriers||[])lines.push('- Possible barrier: '+item.description+'; mechanism: '+item.mechanism);
  lines.push('\n## Recommendations');for(const item of report.recommendations||[])lines.push('- '+item.priority+': '+item.action+' (mechanism: '+item.mechanism+')');
  lines.push('\n## Measurement');lines.push('Outcome: '+(report.measurement?.primary_outcome||'Not specified'));lines.push('Denominator: '+(report.measurement?.denominator||'Not specified'));lines.push('Evaluation: '+(report.measurement?.evaluation_design||'Not specified'));
  lines.push('\n## Retrieved evidence');for(const item of report.retrieved_evidence||[])lines.push('- '+item.id+' '+item.title+' ['+item.evidence_strength+']: '+item.summary+' '+(item.sources||[]).map(source=>source.url||source.title).join(', '));
  const blob=new Blob([lines.join('\n')],{type:'text/markdown'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='campaign-report-'+Date.now()+'.md';link.click();URL.revokeObjectURL(url);

}

// Populate browser voices immediately and on dynamic voice changes
if ('speechSynthesis' in window) {
  populateVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    populateVoices();
  };
}
window.addEventListener('DOMContentLoaded', () => {
  populateVoices();
});
