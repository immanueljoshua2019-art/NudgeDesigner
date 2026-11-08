# Application audit and improvement plan

## Purpose and current structure

NudgeDesigner is a static, single-page behavioural campaign tool for practitioners developing or reviewing social-impact interventions. The two main workflows are campaign design and campaign review. The page collects a structured brief and calls the Netlify `analyze` Function; the Function retrieves records from the local Busara corpus, asks Groq for a JSON report, validates its broad shape and returns the report plus the retrieved records. The page renders the report, source cards and optional campaign copy/audio. YarnGPT speech synthesis is also proxied by that Function.

There is no application database, frontend framework or runtime package dependency. Netlify is configured to run the function with esbuild. `GROQ_API_KEY`, `YARNGPT_API_KEY` and the legacy `HF_TOKEN` fallback are read by server code only. The public build now contains only `index.html` and `_redirects`.

## Findings

### Critical

- The earlier function called `getEnv()` without defining it. Syntax checks passed, but every credential-backed operation would fail at runtime. The function now defines the accessor using `process.env` and has a request-level regression test.
- Netlify previously published the repository root. This included development and evaluation files in the deploy surface. The build now copies only the app shell and redirects into `dist/`, and Netlify publishes that directory.
- The earlier output format encouraged unsupported precision and disconnected report sections. The generation contract now asks for observations, qualified barriers, linked recommendations, evidence IDs, unknowns, qualitative outcomes and measurement limitations. Invented sample sizes, effects, confidence figures and citations are prohibited.

### High value

- Design and review now have separate brief language and server-side task instructions. Review starts from the supplied intervention and produces strengths, risks and targeted revisions; design starts from the stated objective and constraints.
- The report is organised around an executive finding, diagnosis, observations, plausible barriers, COM-B/EAST interpretation, recommendations, implementation, measurement and ethics. Recommendation-to-barrier and observation-to-barrier references are filtered to IDs actually present in the report.
- The former retrieval method was token overlap with hand-written phrase boosts. Retrieval now uses inverse document frequency weighting across meaningful corpus fields, sector filtering, a relevance threshold and a per-domain diversity cap. The selected evidence and match terms are returned for inspection.
- English output instructions specify British spelling and distinguish evidence, user reports, assumptions and hypotheses. Existing API field names and technical identifiers remain unchanged.

### Limitations and follow-up

- The corpus is a curated local JSON dataset, not a live vector database. Current retrieval is field-weighted lexical retrieval with a small synonym map. It has no embeddings, hybrid search, reranker, query-rewrite model or contradiction detector; those would add complexity and should only follow an evaluation showing lexical retrieval is insufficient.
- The function passes retrieved records to Groq in the user message, and tests verify that relevant records are present in the exact upstream request while irrelevant queries are explicitly marked as having no matched records. This proves the context path is active. A live model comparison with RAG on/off or conflicting evidence requires a configured Groq key and has not been performed here, so semantic improvement from the model is not claimed.
- Corpus source strength and provenance vary. Retrieved records are shown with their available provenance, but the corpus lacks a complete, standardised study-level schema (for example, sample size is not consistently available). Recommendations can be evidence-linked only when the retrieved record supports that link.
- The existing evaluation report's 9.20/10 score is not reproducible from the checked-in files: the benchmark runner and scoring records are missing. It is now clearly labelled unverified and is not used as evidence of output quality.
- The per-IP rate limit is in-memory and local to a warm function instance. It reduces bursts but is not a global abuse-control system across instances. Stronger controls would require platform-level rate limiting or a shared store.
- The model response is shape-checked, and evidence IDs are constrained to retrieved IDs, but there is no semantic claim verifier. User testing and a real-model evaluation set remain necessary.

## Generation and retrieval path

1. The design panel collects objective, desired behaviour, audience, context, suspected barrier, resources and optional details. The review panel requires campaign material and accepts optional audience, intended behaviour, context and review criteria.
2. The client sends the brief, mode and retrieval query to `/api/analyze` (with a direct Netlify Function fallback). No provider key is sent from or stored in the browser.
3. The Function validates method, body size, prompt presence and prompt length, enforces a per-instance request limit, and reads `GROQ_API_KEY` from the server environment.
4. `retrieveBusaraEvidence()` ranks local corpus records and applies domain/relevance limits. The resulting records are explicitly added to the model request with an instruction to preserve evidence strength and limitations.
5. Groq is asked for a structured report. The Function rejects malformed JSON/required fields and removes evidence IDs that do not refer to retrieved records. Provider error details are not returned to the browser.
6. The client renders the narrative report, source cards and optional creative/audio materials. Export uses the same report and retrieved records.

## Prioritised next steps

| Priority | Change | Expected value | Complexity / trade-off |
|---|---|---|---|
| Critical, implemented | Define server environment access; narrow Netlify publish artefact | Prevent runtime failure and reduce public deploy surface | Low; adds a tiny static copy build |
| High, implemented | Separate design/review instructions and narrative JSON contract | Better task fit and traceable reasoning | Low; one model call remains, so latency/cost do not multiply |
| High, implemented | Field-weighted corpus retrieval, domain filter, threshold and visible source matches | Better relevance and inspectable grounding | Moderate; lexical matching still misses semantic paraphrases |
| High, implemented | British English and qualified evidence/output rules | Consistent language and fewer unsupported causal claims | Low; model compliance still requires live evaluation |
| Next | Build a labelled retrieval set for each corpus domain and measure precision/recall and abstention | Tune threshold and synonym coverage on evidence rather than intuition | Moderate; requires domain review and ongoing corpus maintenance |
| Next | Run paired live-model evaluations (no context, relevant context, irrelevant context, and carefully curated conflicting records) | Establish whether context changes substance appropriately | Requires Groq credentials, review time and cost; no conclusion should be drawn from wording alone |
| Later | Add hybrid or reranked retrieval only if the labelled evaluation shows a meaningful gain | Could improve paraphrase recall | Adds service/model cost and operational complexity |
| Later | Add a semantic review rubric for evidence-to-barrier-to-intervention links | Catch incoherent recommendations | Could use deterministic checks for links first; an extra LLM call risks cost and latency |

## Verification completed

`npm test` exercises retrieval relevance/abstention, separate panel wiring, Groq request construction with relevant context, withholding unrelated records, secret non-disclosure and missing-key handling. `npm run build` syntax-checks the Netlify Function and inline frontend JavaScript, creates the public `dist/` artefact, and scans the shipped assets for credential-like key patterns and source maps.

These local checks do not deploy the site, invoke Groq, or verify the actual Netlify environment. A live provider comparison and deployed smoke check remain outstanding.
