// Vercel serverless function — runs on the server only.
// process.env.SITE_PASSWORD is never sent to the browser.

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  const { password } = req.body || {};
  const correct = process.env.SITE_PASSWORD || '';

  const ok =
    typeof password === 'string' &&
    password.toLowerCase() === correct.toLowerCase();

  res.status(200).json({ ok });
}
