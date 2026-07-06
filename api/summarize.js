// Vercel Serverless Function — turns messy incident reports into a calm, classified summary.
// Uses DeepSeek (OpenAI-compatible). The API key lives ONLY in the server env var
// DEEPSEEK_API_KEY (set in Vercel → Settings → Environment Variables). Never in the client.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' });
    return;
  }
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) {
    res.status(500).json({ error: 'Server missing DEEPSEEK_API_KEY' });
    return;
  }

  // Body may arrive parsed or as a string depending on runtime.
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (_) { body = {}; } }
  const reports = Array.isArray(body?.reports) ? body.reports : [];
  const distanceMeters = Number(body?.distanceMeters ?? 150);
  const onPath = body?.onPath !== false;
  const kind = String(body?.type || 'incident');

  const system = [
    'You are a public-safety assistant inside a personal-safety walking app.',
    'You receive RAW, messy incident reports (from residents and police scanners) about ONE incident near a pedestrian.',
    'Turn them into a CALM, factual, non-sensational summary. Do not exaggerate. Do not identify or describe individuals in a way that could enable harassment.',
    'Reply with ONLY a JSON object, no markdown, with keys:',
    '  headline: <=6 words, plain.',
    '  summary: one calm sentence describing what is happening.',
    '  severity: one of "low" | "medium" | "high".',
    '  credibility: one of "single unverified report" | "multiple reports" | "confirmed / official".',
    '  relevance: one short clause on whether this affects a pedestrian who is about this many meters ahead on their path. Be honest about uncertainty.'
  ].join('\n');

  const user = JSON.stringify({ incidentType: kind, distanceMeters, onPedestrianPath: onPath, rawReports: reports });

  try {
    const r = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({
        model: 'deepseek-chat',
        temperature: 0.2,
        max_tokens: 260,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: 'Raw incident data:\n' + user + '\n\nReturn the JSON object now.' }
        ]
      })
    });
    const j = await r.json();
    let txt = j?.choices?.[0]?.message?.content || '{}';
    txt = txt.replace(/```json/gi, '').replace(/```/g, '').trim();
    let out;
    try { out = JSON.parse(txt); }
    catch (_) { out = { headline: 'Incident nearby', summary: txt.slice(0, 200), severity: 'medium', credibility: 'multiple reports', relevance: 'May affect your path.' }; }
    res.status(200).json(out);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
