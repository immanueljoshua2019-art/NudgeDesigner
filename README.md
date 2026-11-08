# NudgeDesigner

NudgeDesigner helps social-impact teams design or review behavioural campaigns. It produces a structured analysis, recommendations, measurement considerations and optional campaign materials, with relevant records from the local Busara corpus shown alongside the report.

## Workflows

- **Design campaign:** describe the desired behaviour and add any known audience, context, barriers, resources or objective.
- **Review campaign:** submit an existing message or intervention for a targeted behavioural review.

The model distinguishes observations, user-reported information and hypotheses. Retrieved records are supplied as context and exposed with the report. The local corpus is not a complete systematic evidence base; a citation indicates a retrieved record, not independent verification of a generated claim.

## Architecture

- `index.html` is the single-page frontend.
- `netlify/functions/analyze.mjs` handles campaign analysis and YarnGPT speech requests.
- `netlify/functions/busara-data.mjs` supplies the local evidence corpus.
- Groq and YarnGPT credentials are read server-side from Netlify environment variables.
- `npm run build` checks JavaScript syntax and creates `dist/` with only the app shell and routing rules.

## Local checks

```sh
npm test
npm run build
```

The tests use a mocked Groq response. They verify retrieval matching and abstention, context injection into the provider request, response secret non-disclosure, missing-key behaviour and independent workflow wiring. They do not establish live model quality or deploy the site.

## Netlify configuration

Set `GROQ_API_KEY` in the Netlify site's environment variables with **Functions** scope. Add `YARNGPT_API_KEY` if cloud speech synthesis is required. Redeploy after changing the values. Do not put credentials in frontend files or build-scoped variables.

For detailed architecture findings, known limitations and the prioritised improvement plan, see [the application audit](docs/application-audit.md).
