function isOriginAllowed(origin) {
  if (!origin) return true;
  const cleanOrigin = origin.replace(/\/$/, '');
  if (cleanOrigin === 'https://na1t1k.vercel.app') return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(cleanOrigin)) return true;
  if (cleanOrigin.endsWith('.run.app')) return true;
  return false;
}

export default function handler(req, res) {
  const rawOrigin = req.headers?.origin || req.headers?.Origin;
  const origin = rawOrigin ? String(rawOrigin).replace(/\/$/, '') : '';

  if (!isOriginAllowed(origin)) {
    return res.status(403).json({ error: "Access forbidden: CORS origin not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", origin || "https://na1t1k.vercel.app");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Vary", "Origin");
  res.setHeader("Cache-Control", "max-age=0, s-maxage=86400, stale-while-revalidate=3600");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return res.status(200).json({
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY || ""
  });
}
