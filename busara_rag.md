# NudgeDesigner 3.0 — Behavioral Intelligence & Architecture Guide

NudgeDesigner 3.0 elevates the system from an LLM prompt wrapper into an evidence-grounded Behavioral Intelligence Engine. It redesigns input formulation around the **Behavioral Problem Compiler**, models cross-border replication via the **Behavioral Transfer Engine v1**, hardens ethical veracity through the **Ground-Truth Sensitivity & Backfire Audit Engine**, integrates the **YarnGPT 5-Language African Audio Studio**, and grounds all hypotheses in **60+ empirical studies from the Busara Center for Behavioral Economics** across 7 prioritized domains.

---

## 1. The Behavioral Problem Compiler (The 6 Analytical Fields)

Every field in NudgeDesigner 3.0 performs a distinct analytical job, changing either the evidence retrieved, the mechanisms evaluated, or the confidence of claims:

1. **Field 1: Target Behavior (Observable Action)**
   - *Analytical Job*: Distinguishes concrete observable actions from intermediate internal states (awareness vs. action; intention vs. completed transaction).
   - *Live Checker*: Dynamically catches aspiration terms ("awareness", "trust", "financial inclusion") and prompts the user for observable actions (e.g. deposit within 48h, repay on due date).
   - *Advanced Parameters*: Ingests baseline rates, timeframes, and evaluation denominators.

2. **Field 2: Target Audience & Behavioral Constraints**
   - *Analytical Job*: Captures decision constraints (irregular daily income, variable repayment cycles, low institutional trust, mobile hardware friction, cognitive scarcity) rather than vague demographics.
   - *Provenance Tracking*: Categorizes evidence origins (field observations, representative surveys, administrative account data, partner reports, or unverified hypotheses).

3. **Field 3: Domain & Sector Focus**
   - *Analytical Job*: Triggers targeted vector and keyword retrieval across the 7 Busara empirical domains.

4. **Field 4: Geographic Setting & Delivery Channel**
   - *Analytical Job*: Feeds the Behavioral Transfer Engine (urban vs. peri-urban vs. rural) and formats interventions to channel constraints (160c SMS, interactive WhatsApp, vernacular spoken audio, field agents, USSD).

5. **Field 5: Existing Campaign Copy (Optional Heuristic Audit)**
   - *Analytical Job*: Audits baseline copy for cognitive overload, penalty reactance, messenger credibility deficits, and action feasibility.

6. **Field 6: Core Behavioral Barrier & Hypothesis**
   - *Analytical Job*: Explicitly isolates user-suspected barriers as unverified hypotheses to cross-examine against Busara empirical findings.

---

## 2. Behavioral Transfer Engine v1

Behavioral economics interventions designed in one African market (e.g. Kenya) do not blindly transfer to another (e.g. Nigeria). The Transfer Engine models contextual replication across 5 core dimensions:

- **Population Match (0–100%)**: Literacy, income volatility, and demographic alignment.
- **Mechanism Match (0–100%)**: Behavioral friction parity (e.g. present bias vs. credit liquidity constraints).
- **Channel Compatibility (0–100%)**: Mobile money ecosystem differences (e.g. M-Pesa USSD vs. Nigerian NIP bank transfers / OPay / PalmPay apps).
- **Institutional Trust Gap (0–100%)**: Measures public and institutional skepticism, requiring peer or traditional messengers where state/bank trust is low.
- **Economic Context Match (0–100%)**: Inflation volatility, currency devaluation stress, and daily liquidity pressure.

---

## 3. Ground-Truth Sensitivity & Backfire Audit Engine

### Ethical Foundation: Factual Integrity Mandate
Nudges are structural behavioral heuristics, never drop-in copy to be populated with fabricated statistics. Fabricating statistics creates dark patterns, erodes long-term trust, and causes brand reactance.

### The Dual Trap Guardrail
1. **Trap 1: The Fabrication Trap**: Inventing statistics (e.g. claiming "85% pay on time" when ground truth is 14%) destroys credibility once discovered.
2. **Trap 2: The Blind Transparency Trap**: Blindly broadcasting true low compliance ("Only 14% pay on time") triggers Cialdini's Petrified Forest Boomerang Effect by socially validating non-compliance as the norm.

### 5 Ground-Truth Failure Modes & Truthful Adaptive Pivots:
- **Low Descriptive Norms**: Pivot honestly to *Dynamic Trend Norms* ("Adoption grew 40% this quarter"), *Injunctive Framing*, or *Collective Goal Framing*.
- **Low Institutional Trust**: Pivot from official/regulatory messengers to *Horizontal Peer Proof*, *Community Elders*, or *Process Utility Transparency*.
- **Hollow Scarcity & Artificial Urgency**: Pivot to *Opportunity Cost Framing*, *Proactive Readiness*, or *Early-Mover Onboarding*.
- **Adverse Price Anchoring & High Friction**: Pivot to *Micro-Cost Equivalent Framing* (daily/weekly rate) or *Zero-Upfront Friction*.
- **Premature Commitment Escalation**: Pivot down the *Micro-Commitment Ladder* or offer *Reversible Trialability*.

---

## 4. YarnGPT 5-Language African Audio Studio

NudgeDesigner integrates open-source **YarnGPT** (developed by Saheed Azeez, hosted at `saheedniyi/YarnGPT`) to synthesize native vernacular audio copy across 5 key languages:

1. 🇳🇬 **Nigerian English**: Pan-African educated cadence, authoritative yet warm.
2. 🇳🇬 **Nigerian Pidgin**: Street-credible, market-relatable, high relational warmth.
3. 🇳🇬 **Yoruba**: Culturally respectful honorifics (*E kaaro*, *E jowo*) and dignity-affirming appeals.
4. 🇳🇬 **Hausa**: Sahelian cadence, community-centered idioms (*Sannu*, *Ina kwana*).
5. 🇳🇬 **Igbo**: Commercial dynamism, affirmative relational cues (*Nnoo*, *Biko*).

### Speech Synthesis Execution:
- **Primary**: Direct serverless API calls to Hugging Face Inference (`saheedniyi/YarnGPT`) using `HF_TOKEN`.
- **Browser Fallback**: Responsive Web Speech API with tuned African phonetic rates and pitch contours for immediate local previews.
- **In-App Modal**: User-configurable settings for local API tokens and configuration diagnostics.

---

## 5. The 7 Prioritized Busara Research Domains (60+ Studies)

1. **Financial Inclusion & Mobile Money**: Digital credit default mitigation, overdraft friction, agent banking trust credentials, lock savings, digital Chama peer effects.
2. **Public Health & Maternal Care**: In-kind delivery incentives, morning-of SMS immunization timing, community health promoter recognition, point-of-collection chlorine water dispensers.
3. **Agriculture & Climate Adaptation**: Post-harvest fertilizer vouchers (SAFI model), visual roadside demo plots, bundled opt-out micro-insurance, pictorial color-coded soil health cards.
4. **Education & Early Learning**: Teaching at the Right Level (TaRL) cohorts, weekly bite-sized SMS learning activities, educator peer recognition, African contextualized growth mindset.
5. **Civic Trust & Tax Compliance**: Market stall fee compliance via visible public service reciprocity, property tax public goods attribution, anonymous WhatsApp voice whistleblowing, neighborhood cleanliness badges.
6. **Gender & Intra-Household Bargaining**: Women's mobile money PIN privacy, time-poverty scheduling, in-kind equipment grants over liquid cash, assertiveness coaching.
7. **Scarcity & Cognitive Bandwidth**: Poverty bandwidth tax (Haushofer & Fehr), cortisol-induced temporal discounting, administrative sludge reduction, USSD voucher simplification.

Each study in `busara-rag.json` includes `works_when`, `fails_when` boundary failure conditions, sample size `N`, and empirical effect sizes.
