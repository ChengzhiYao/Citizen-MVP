# Citizen Guardian — MVP

A proactive-safety concept for Citizen: a one-tap **AI companion** that unifies scattered safety tools (safe routing, live escort, incident monitoring) into a single escorted walk. As you move, an on-device risk engine scores nearby incidents by proximity, severity, credibility, and whether they're **on your path ahead** — and proactively reroutes you *before* an incident affects you.

## Live demo
Open **`guardian.html`** (served at the site root via `index.html`).

- Uses real device geolocation (requires https or localhost) with a demo-location fallback.
- Simulated compressed time + simulated incidents to show the full arc in ~90s.
- Tap **Start Guardian** → walk → watch the AI intervene with an explained reroute → arrive.

## Repo contents
- `guardian.html` — the working live app (Citizen UI + real map + Guardian flow)
- `citizen-prototype.html` — earlier clickable prototype (design system + all screens, with Design-notes / Before·After toggles)
- `Citizen-concept-talking-points.md` — product rationale & talking points
- `Guardian-run-and-AI-workflow.md` — run guide + AI-workflow write-up

## Tech
Static site — Leaflet + free CartoDB dark tiles, vanilla JS, no build step. Deploy on Vercel (static).

## Notes
The proactive "AI" is a transparent, deterministic risk engine (explainable for the demo); in production that layer is where an ML model / LLM would sit.
