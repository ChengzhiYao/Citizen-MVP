# Citizen Guardian — Run guide & AI-workflow log

Working demo: **`guardian.html`** — a real, running web app (reads your location, simulates a night walk in compressed time, and shows the Guardian AI proactively rerouting you around a hazard that appears on your path).

---

## How to run it

**Important:** browser geolocation only works over **https or localhost** — double-clicking the file (`file://`) will *not* get your location (it falls back to a demo location in Queens, NY, which is fine for presenting).

**Option A — local server (recommended for testing):**
1. Open a terminal in this folder.
2. Run: `python -m http.server 8000` (or `python3 -m http.server 8000`)
3. Open `http://localhost:8000/guardian.html` and allow location when asked.

**Option B — deploy a shareable URL (recommended for the panel):**
Drag this folder onto [Netlify Drop](https://app.netlify.com/drop) (or use Vercel / GitHub Pages). You get an `https://` link the panel can open on their own phones during the presentation — a strong "it's real" moment.

**Option C — just open the file:** works too; it runs on the demo NYC location.

### 90-second demo script
1. **Start Guardian** → review the one-screen plan (safest route + monitoring + who it's shared with) → **Start — I'm walking now**.
2. Watch the blue dot walk the route; the clock runs in compressed "sim time."
3. At ~⅓ of the way, a **high-severity incident appears on your path** and Guardian interrupts with a calm, explained reroute.
4. Tap **Reroute** → a green detour is drawn, you continue and **arrive safely** (contacts auto-notified).
5. **Restart demo** to run it again (try "Keep my route" to show the other branch).

---

## AI Workflow log (for Deliverable 4 — fill in as you build)

> The panel will ask: first prompt, biggest dead end, biggest breakthrough, tools, what AI got wrong, what you changed, how AI shaped the result. Below is seeded from the real process — edit into your own voice.

**Tools used:** Claude (ideation, product critique, code generation, prototyping), plus [add: Figma / Cursor / etc. if you use them].

**First prompt / framing:** Started by rebuilding Citizen's core flows to be less reactive and monetization-heavy, then evolved toward a single proactive experience.

**Biggest dead ends (be honest — panels love this):**
- AI first reached for **emoji as UI icons** — looked cheap and unprofessional; I rejected it and had it build a **consistent monochrome SVG icon system** instead.
- A **CSS bug** put the bottom nav at the top (absolute-positioned screens took the nav out of flow); I caught it from a screenshot and fixed the positioning.
- AI wrote vague microcopy ("Mostly quiet near you") that wasn't understandable; I pushed for **plain, literal status** ("1 active incident nearby · within 1 mile").
- Early scope sprawled to ~12 disconnected changes; I recognized that as the *actual problem* and refocused.

**Biggest breakthrough:** Reframing my own scattered features into **one AI-orchestrated companion (Guardian)** — the insight that the real problem wasn't missing features, it was that safety required too many manual steps. Then upgrading the deliverable from a clickable mock to a **real geolocation + simulation web app** so the AI's proactive decision is *experienced*, not described.

**What AI got wrong / I manually changed or directed (the product judgment was mine):**
- Flagged that **alert customization being paywalled** is absurd on a safety app.
- Killed the **vanity "2,090 users nearby"** metric — not actionable.
- Insisted the Safe Route handoff say **"Open safer route"**, never "guaranteed safe," with an upfront disclaimer that Google Maps may re-route.
- Designed the **geo-gated "Go Live from here"** (record only when you're actually on scene) to block fake footage.
- Drew the **free-vs-paid line**: manual control free, AI automation paid.
- Set the **AI transparency rules**: label it, explain it, cite sources, never hide life-safety, let users turn it off.

**Technical tradeoffs I can defend:**
- **Leaflet + free CartoDB dark tiles** (no API key, reliable, on-brand) over Mapbox.
- **Heuristic risk engine** (proximity × severity × credibility × on-path) instead of a live LLM call — deterministic and explainable so the demo never fails and I can justify every decision; in production this layer is where an ML model / LLM goes.
- **Simulated walk in compressed time** so the whole proactive arc is demoable at a desk; real geolocation seeds the start point.
- **Distance-based progress/ETA** so the UI stays continuous across a reroute.

**How AI shaped the final result:** It was the execution engine that let me move from critique → design → working code fast; I supplied the product judgment, caught its mistakes, and made the calls. That division — human judgment, AI velocity — is the workflow.
