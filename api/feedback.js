export const config = { maxDuration: 60 };

function isOriginAllowed(origin) {
  if (!origin) return true;
  const cleanOrigin = origin.replace(/\/$/, '');
  if (cleanOrigin === 'https://na1t1k.vercel.app') return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(cleanOrigin)) return true;
  if (cleanOrigin.endsWith('.run.app')) return true;
  return false;
}

export default async function handler(req, res) {
  const rawOrigin = req.headers?.origin || req.headers?.Origin;
  const origin = rawOrigin ? String(rawOrigin).replace(/\/$/, '') : '';

  if (!isOriginAllowed(origin)) {
    return res.status(403).json({ error: "Access forbidden: CORS origin not allowed" });
  }

  // CORS setup
  res.setHeader("Access-Control-Allow-Origin", origin || "https://na1t1k.vercel.app");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is missing.");
    return res.status(500).json({ error: "Server misconfiguration." });
  }

  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prepare Discord message payload
    const embed = {
      title: "New Feedback / Bug Report 🐞",
      color: 0x4A9EFF, // primaryBlue
      fields: [
        { name: "Name", value: name, inline: true },
        { name: "Email", value: email, inline: true },
      ],
      timestamp: new Date().toISOString(),
    };

    if (phone) {
      embed.fields.push({ name: "Phone", value: phone, inline: true });
    }

    embed.fields.push({ name: "Message / Experience", value: message });

    const discordPayload = {
      embeds: [embed],
      allowed_mentions: { parse: [] }
    };

    // Send to Discord
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send to Discord:", errorText);
      return res.status(500).json({ error: "Failed to submit feedback." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Feedback handler error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
