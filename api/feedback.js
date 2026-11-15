export const config = { maxDuration: 60 };

import { createClient } from '@supabase/supabase-js';

const FEEDBACK_LIMIT_MAX = 5;
const FEEDBACK_WINDOW = 3 * 60 * 60 * 1000; // 3 hours

let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function isOriginAllowed(origin) {
  if (!origin) return true;
  const cleanOrigin = origin.replace(/\/$/, '');
  if (cleanOrigin === 'https://na1t1k.vercel.app') return true;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(cleanOrigin)) return true;
  if (/^https:\/\/ais-(dev|pre)-5k22rnmiwf6qnn23nlkjdb-391725186047\.asia-southeast1\.run\.app$/.test(cleanOrigin)) return true;
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
    const rawIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    const ip = String(rawIp).split(',')[0].trim();

    if (supabase) {
      const now = Date.now();
      const feedbackIpKey = `FEEDBACK_${ip}`;
      const { data: fbRecord } = await supabase
        .from('rate_limits')
        .select('*')
        .eq('ip_address', feedbackIpKey)
        .single();

      if (fbRecord) {
        if (fbRecord.is_banned === true || (fbRecord.banned_until && fbRecord.banned_until > now)) {
          return res.status(429).json({ error: "Too many feedback submissions. Please try again later." });
        }
        const inWindow = fbRecord.reset_time && now <= fbRecord.reset_time;
        const count = inWindow ? (fbRecord.message_count || 0) : 0;
        if (count >= FEEDBACK_LIMIT_MAX) {
          return res.status(429).json({ error: "Feedback limit reached. Please try again in a few hours." });
        }
        await supabase.from('rate_limits').upsert({
          ip_address: feedbackIpKey,
          message_count: count + 1,
          reset_time: inWindow ? fbRecord.reset_time : now + FEEDBACK_WINDOW,
          strikes: 0,
          banned_until: 0,
          last_active: now
        }, { onConflict: 'ip_address' });
      } else {
        await supabase.from('rate_limits').upsert({
          ip_address: feedbackIpKey,
          message_count: 1,
          reset_time: now + FEEDBACK_WINDOW,
          strikes: 0,
          banned_until: 0,
          last_active: now
        }, { onConflict: 'ip_address' });
      }
    }

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: "Invalid request payload." });
      }
    }
    const { name, email, phone, message } = body || {};

    const cleanName = typeof name === 'string' ? name.replace(/[<>]/g, '').trim().substring(0, 100) : '';
    const cleanEmail = typeof email === 'string' ? email.replace(/[<>]/g, '').trim().substring(0, 100) : '';
    const cleanPhone = typeof phone === 'string' ? phone.replace(/[<>]/g, '').trim().substring(0, 30) : '';
    const cleanMessage = typeof message === 'string' ? message.replace(/[<>]/g, '').trim().substring(0, 1000) : '';

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    // Prepare Discord message payload
    const embed = {
      title: "New Feedback / Bug Report 🐞",
      color: 0x4A9EFF, // primaryBlue
      fields: [
        { name: "Name", value: cleanName, inline: true },
        { name: "Email", value: cleanEmail, inline: true },
      ],
      timestamp: new Date().toISOString(),
    };

    if (cleanPhone) {
      embed.fields.push({ name: "Phone", value: cleanPhone, inline: true });
    }

    embed.fields.push({ name: "Message / Experience", value: cleanMessage });

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
