# Citizen — Product Design Concept

**Candidate talking-points & rationale** · companion to `citizen-prototype.html`

> One-line pitch: *Keep Citizen's exact look and core loop, but shift it from a citywide firehose that monetizes anxiety into a personalized safety tool you trust — with three new core features and AI you can see.*

I deliberately changed **flows and features, not the visual language**. The dark map-first home, bottom nav, card style, type, and red/blue accents are untouched. Good product judgment is as much about what you *don't* redesign.

---

## The problem I'm responding to

From the current app and its well-known reputation, three tensions stand out:

1. **Monetization sits on top of safety.** "Customize your alerts" and custom notification areas are behind Premium; the Profile and Safety Network lead with upgrade walls and a lock icon. On a *safety* app, gating the feature that decides *which* alerts reach you taxes the core promise and erodes trust with new users before they get value.
2. **It can amplify anxiety.** The default experience is every incident, citywide, as a raw push. The common critique — "Citizen makes me more scared, not safer" — comes from volume and lack of context, not from bad data.
3. **The social-safety graph is dormant.** Safety Network, Friends, and Location Sharing exist only as static settings (mine showed "0"). There's no in-the-moment reason to use them, so the network's value is invisible until an emergency.

## The direction I'd bring

**Trust first. Personalization over volume. AI you can see.** Conversion follows retention; retention follows trust. Five moves:

### 1 · Subscription: hard wall → optional
Premium reframed as *Optional*. Critically, the paywall itself is rebuilt: today's screen sells **one** vague feature ("listen to full police & fire radio clips") with two prices and no sense of what else changes — it reads as untrustworthy. Mine is a **side-by-side Free vs Premium comparison** spelling out every feature and the exact difference (alert zones 1 → 5, history 24h → full, radio audio, advanced AI), with core safety visibly free, a clear plan choice, a 7-day trial, and "cancel anytime, safety never expires." "Continue with free Citizen" is a first-class button, not fine print. Same revenue surface — but it converts on understood value, not FOMO.

### 2 · Alerts: locked → fully customizable, free
Free **Alert filters**: per-type toggles, a distance radius, quiet hours, and **Calm mode** (group repeated updates into one thread; mute non-critical overnight; life-safety always breaks through). This is the most direct fix for the anxiety critique — the feed becomes a signal the user chose. Premium still has room upmarket (multiple saved zones, history).

### 3 · New core — Walk With Me (同行守护 / virtual escort)
One tap from the map: share a live, moving route + ETA with people you trust; auto-alert them if you stop moving or arrive late; "I arrived safely" to end. This *activates* the Safety Network users already have and gives a proactive, daily-use reason to open the app — not just reacting to fear.

### 3b · New core — Safe Route (incident-aware routing)
Citizen already knows where every active incident is — but does nothing with it for navigation. **Safe Route** turns the map into a routing input: enter a start + destination, and Citizen scans active incidents along the way and suggests a detour (e.g. *"Take Jackson Ave instead — +3 min, avoids the disturbance on 44th Dr"*). It then hands off to **Google Maps by passing the detour as a waypoint** (origin → Jackson Ave → destination), which nudges Maps onto the safer path.

It supports **walking, cycling and driving** modes — important because the highest-risk legs are often on foot, exactly where Google Maps has no reason to reroute you.

The important design call is **honesty about its limits**: the CTA is *"Open safer route in Google Maps,"* never *"guaranteed safe route,"* and a disclaimer states plainly that Maps may re-route on live traffic so the path isn't guaranteed. This keeps the feature credible — it adds real value (using incident data others ignore) without overpromising safety it can't control. Same transparency principle as the AI work.

**Why won't Google Maps just replace this?** Different objective function: Maps optimizes for *time/traffic* and only reroutes around things that slow you down (congestion, closures, crashes). A stabbing on the sidewalk, an active police scene, or a disturbance two blocks away doesn't affect drive time, so Maps ignores it. Citizen optimizes for *personal safety*, using street/block-level public-safety incidents Maps doesn't track. Google also has structural disincentives to label areas as "dangerous" (liability, bias/redlining, brand risk), whereas that's precisely Citizen's brand permission. And Safe Route *augments* Maps via a waypoint handoff rather than competing on navigation — it adds the one layer Google won't.

**Information architecture.** As the proactive tools grew (Walk With Me, Safe Route, Safety Network), I promoted a **Safety hub into the bottom nav** rather than leaving them scattered across map quick-actions and Profile. It's the clearest structural statement of the whole thesis: Citizen moving from a reactive fear feed to a proactive safety product. (Map quick-actions stay as fast contextual access.)

### 4 · New core — Trust & context layer (社区参与 / 可信度)
Each incident gets a **confirmation/trust signal**, and **Still-active / Resolved** buttons. Confirmations build each reporter's trust score and auto-expire stale alerts, so the feed self-cleans and unverified panic spreads less.

### 4b · News — one firehose → manual filters + a transparent AI filter
*(Another usability finding.)* News today is a single undifferentiated stream: no category filters, no relevance/distance control, no explanation of why a story appears. My version adds **manual control** (a For you / Nearby / All segmented view + scrollable category chips) and, on top, a Premium **AI Smart Filter** that auto-hides low-relevance citywide noise while labelling *why* each item surfaced ("matches your commute route," "within your 0.5 mi radius"). It never hides safety-critical alerts.

This also draws the **monetization line** cleanly and consistently with the rest of the concept: **manual filtering is free** (never gate basic control), while **AI doing the curation work for you is Premium** (the same engine as AI Deep Filter). So I'm not contradicting "don't gate basics" — customization and manual filters stay free; what Premium sells is *automation and intelligence on top*, which is genuinely worth paying for.

### 4c · Alerts — geo-gated "Go Live from here"
Each alert gets a **Go Live from here** button that is **geo-gated**: it's only tappable when the user is inside the incident's radius. A nearby alert shows a live red button; far-away alerts show it disabled with the reason ("be within 0.5 mi to record"). This does two things at once: it turns bystanders into **verified on-scene sources** with one tap from the notification, and the location gate **structurally blocks remote or fake footage** — you can't "cover" an incident you're nowhere near. It also reinforces the trust/credibility layer: footage tied to presence is inherently more reliable.

### 5 · AI — invisible → transparent, plus a calm summary
For a public-safety product, **transparency about AI is non-negotiable**. So:

- Every place AI touches the experience carries an **"AI-generated" / "AI-ranked"** badge.
- An expandable **"How this was made"** states *what the AI did*, *which sources it used* (e.g. 12 reports + 2 video transcripts), *what personal data it touched* (only distance + saved routes), and a plain **"it can be wrong — trust what you see, call 911"** caveat.
- AI **assists, humans verify** — the AI never confirms facts or contacts authorities.
- Users can **toggle AI features off** in settings.

The **AI Incident Summary** is the user-facing payoff: instead of scrolling a scary feed, you get a one-line recap + a **personal-relevance line** ("Low relevance — you're 0.4 mi away, off the affected block") so you answer *"is this about me?"* in one glance.

### 5b · A Premium feature worth paying for — AI Deep Filter
The fix for alert customization being paywalled isn't just "make it free" — it's giving Premium a feature people will *gladly* pay for instead. **AI Deep Filter** (Premium) scores every alert by **importance, credibility and relevance**, merges duplicates, and strips vague single-source noise — surfacing only what matters (e.g. *47 raw alerts → 6*). It has a tunable importance threshold and per-rule toggles (hide unverified, merge duplicates, summarize before notifying). Crucially it stays honest, per the AI principles: it **explains its reasoning**, **never deletes** anything (the 41 set-aside alerts are one tap away), and **never hides a life-safety alert** even a low-credibility one. This is the model I'd argue for: Premium earns its price by *adding value on top of the noise problem*, not by gating basics like customization.

### 6 · Go Live — confusing → a transparent, end-to-end flow
*(My usability finding from testing the live app.)* Tapping Go Live drops you straight onto a record screen with no explanation: it never says how long to record, what the upload steps are, whether anyone reviews it, where the video ends up, or where to find your past uploads. I couldn't tell if that opacity was intentional or just a UX gap — either way it costs trust on a feature that depends on it.

My redesign makes the whole journey legible:

- **Upfront model** — a 3-step "how it works" (Record → We review → Posts to map & alerts) and length guidance ("15–60s works best, no minimum") *before* recording.
- **Recording** — a visible timer and a safety prompt ("narrate what you see; don't put yourself in danger").
- **Review before posting** — plainly states what will happen: posted anonymously, moderated before public (usually <2 min), approximate location attached, audience ~1 mi, and "delete anytime."
- **Upload pipeline** — an explicit status track: Uploaded → Safety review → Published, with a "we'll notify you when it's live" promise.
- **Confirmation** — answers *"where did my video go?"*: on the live map, attached to the incident thread, and saved to a new **Your broadcasts** history.
- **Your broadcasts** — a creator history (which the app lacks entirely) with status chips: *In review / Live / Archived*, plus views.

This is the clearest example of the through-line: **make the system legible at every step.** I'd frame it in the interview as a concrete usability finding I turned into a flow.

---

## Design principles I applied

- **Don't gate safety.** Free tier must stand alone as a real safety tool.
- **Reduce, don't add, anxiety.** Context and grouping before raw volume.
- **Make the network active, not stored.** Features that get used *before* an emergency.
- **Show your AI.** Label it, explain it, source it, let users turn it off.
- **Respect the existing brand.** New surfaces reuse existing components and motion.
- **Every number must earn its place.** The home footer's two cryptic stats — "🔥 01" (incidents) and "2090" (users nearby) — got replaced by one plain-language area status ("Mostly quiet near you · 1 active incident within 1 mile"), and the vanity user count was cut. A safety surface should answer "how safe is it around me?" at a glance, not show metrics the user can't act on.

## How I'd measure it

- **Trust/retention:** D7 / D30 retention; share of new users who tune ≥1 filter in week 1; notification opt-out and uninstall rates (should fall).
- **Anxiety proxy:** alerts muted vs. tuned ratio; CSAT on "Citizen helps me feel safer."
- **Engagement quality:** Walk With Me sessions/user; Safety Network connections (today ~0); incident confirm/resolve rate; median time-to-"is this about me?".
- **Business:** free→Premium conversion and churn — the thesis is that trust-led free *raises* LTV, not lowers it.
- **AI safety:** summary correction/dispute rate; % of AI surfaces with disclosure viewed.

## Rollout (lightweight)

**Phase 1** free Alert filters + soft paywall (lowest risk, addresses the loudest complaint). **Phase 2** AI Incident Summary + transparency layer behind a flag, monitor correction rate. **Phase 3** Walk With Me + trust scores. Each phase is independently shippable and measurable.

---

## Likely interview questions — my answers

**"Doesn't free customization kill Premium revenue?"** The wall mostly suppresses *retention*, which caps the funnel. Free safety grows the trusted base; Premium moves to value people pay for willingly (multi-zone, history, broadcast). I'd A/B it and watch LTV, not just conversion.

**"Isn't an AI summary risky if it's wrong?"** That's exactly why it's labelled, sourced, caveated, and toggleable, and why AI never verifies or contacts authorities. It *summarizes human reports* and rates relevance from the user's own distance/route — it doesn't invent facts.

**"How is Walk With Me different from Find My / Life360?"** It's contextual to Citizen's incident graph — it can warn if your live route approaches an active incident, which a generic location-share can't. It also activates a network users already configured here.

**"What would you cut if you had two weeks?"** Ship Phase 1 only (free filters + soft paywall). It's the highest-trust, lowest-risk change and it's measurable on its own.

---

*Deliverables: `citizen-prototype.html` (tap through it; toggle **Design notes** and **Before · After** at the top) + this document.*
