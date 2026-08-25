// Initialize global tracking for IP rate limiting and bans
global.ipTracker = global.ipTracker || {};
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW = 3 * 60 * 60 * 1000; // 3 hours
const BAN_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Helper for webhooks
async function notifyDiscord(msg) {
  if (process.env.DISCORD_WEBHOOK_URL) {
    try {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: msg })
      });
    } catch (e) {
      console.error("Webhook error:", e);
    }
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const ip = rawIp.split(',')[0].trim();

    // Vercel parses JSON bodies automatically if Content-Type is application/json
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { message, history } = body;

    // Handle admin unban command
    if (message && message.startsWith('/admin-unban')) {
      const parts = message.split(' ');
      const pass = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : null;
      
      if (pass && message.includes(pass)) {
        let targetIp = parts[1] ? parts[1].trim().toLowerCase() : '';
        if (targetIp === 'me') targetIp = ip;
        
        delete global.ipTracker[targetIp];
        return res.status(200).json({ reply: `Success: IP ${targetIp} has been unbanned and rate limits reset.` });
      }
      return res.status(200).json({ reply: "Failed to unban: Incorrect password or format. Use: /admin-unban [IP or 'me'] [PASSWORD]" });
    }

    // Handle admin ban command
    if (message && message.startsWith('/admin-ban')) {
      const parts = message.split(' ');
      const pass = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : null;
      
      if (pass && message.includes(pass)) {
        let targetIp = parts[1] ? parts[1].trim().toLowerCase() : '';
        if (targetIp === 'me') targetIp = ip;
        
        const now = Date.now();
        global.ipTracker[targetIp] = global.ipTracker[targetIp] || { count: 0, resetTime: now + RATE_LIMIT_WINDOW, strikes: 0, bannedUntil: 0 };
        global.ipTracker[targetIp].bannedUntil = now + BAN_DURATION;
        global.ipTracker[targetIp].strikes = 3;
        
        notifyDiscord(`🛡️ **Manual Ban Admin**: IP \`${targetIp}\` was just manually BANNED for 24 hours.`);
        
        return res.status(200).json({ reply: `Success: IP ${targetIp} has been manually banned for 24 hours.` });
      }
      return res.status(200).json({ reply: "Failed to ban: Incorrect password or format. Use: /admin-ban [IP] [PASSWORD]" });
    }

    const now = Date.now();
    let tracker = global.ipTracker[ip] || { count: 0, resetTime: now + RATE_LIMIT_WINDOW, strikes: 0, bannedUntil: 0 };
    
    // Reset counters if window passed
    if (now > tracker.resetTime) {
      tracker.count = 0;
      tracker.resetTime = now + RATE_LIMIT_WINDOW;
    }
    
    // Check if banned
    if (tracker.bannedUntil > now) {
      return res.status(200).json({ reply: "You have been temporarily blocked due to abuse or spam. Please try again tomorrow." });
    }
    
    // Check rate limit
    if (tracker.count >= RATE_LIMIT_MAX) {
      if (tracker.count === RATE_LIMIT_MAX) {
         notifyDiscord(`⚠️ **Rate Limit Reached**: IP \`${ip}\` hit the ${RATE_LIMIT_MAX} message limit.`);
         tracker.count++; // Increment so we only notify once
         global.ipTracker[ip] = tracker;
      }
      return res.status(200).json({ reply: "You've reached the message limit. Please try again in a few hours." });
    }
    
    // Increment message count
    tracker.count++;
    global.ipTracker[ip] = tracker;

    const systemPrompt = `You are NA Assistant on Naitik Agarwal portfolio. Be casual and helpful.
Naitik is an AI Explorer, Prompt Engineer, Vibe Coder and Creator.
Motto: Skills matter more than degrees.
Skills: Color Grading, Vibe Coding, Prompt Engineering, AI Tool Scouting, No-Code Development, Photography, Canva and AI Design.
AI Tools: Claude, Gemini, ChatGPT, Lovable, Antigravity, Nano Banana, Google Veo, Google AI Studio.
Projects: 
1. Bioluminescent Streetlight — vibe coded with Claude and Lovable, zero traditional code, live at https://bioluminescent-streetlights.lovable.app
2. Lumine-bay — a full-stack AI-powered salon booking platform built during a hackathon. It allows users to book appointments and consult with an AI stylist for an upgraded experience. Features a dedicated admin panel for salon owners. Live at https://luminae-bay.vercel.app/ (Note: Some backend functions might be disabled to save resources, but ~80% of the features are fully functional).
3. StageMap — Built in 8 hours for HackDevengers 10 — StageMap lets anyone in tier-2/3 India discover, post, and RSVP to local events with AI-assisted creation and verified digital tickets. Live at https://na1t1k-hackathon3.vercel.app/ (Note: All the projects are just made for hackathon purpose and they are not applicable for real world).
Achievements: Ideathon 2025 Top 100 of 1400. Ideathon 2026 Participated. MDI Gurugram Photography 4th of 135.
Badges & Certificates: 109+ Google Cloud Skills Boost badges. [Professional Certificates](https://drive.google.com/drive/folders/1Mvz1GK2IPJupNpuuxeZEsHP81d7avSaj?usp=sharing)
Photography Portfolio: [View Samples](https://drive.google.com/drive/folders/13o9lsdFMzAd1akjRWrQ6kRFkeVkwBRYQ?usp=sharing) (Provide this link whenever asked for photographs, image links, or samples).
Goals: Achieve big in AI, shape it not just use it, stay curious.
Contact: Naitik.270810@outlook.com
Social Links:
- [GitHub](https://github.com/Naitik-xd)
- [LinkedIn](https://www.linkedin.com/in/na1t1k)
- [X (Twitter)](https://x.com/NA1T1Kxd)
- [Google Skills Profile](https://www.skills.google/public_profiles/38b0b619-88ee-4eea-845e-97512f415e2e)
- [Google Developer Profile](https://g.dev/na1t1k)
Rules: Keep answers concise. Use bullet points for lists. **Always use Markdown formatting for URLs (e.g., [Link Text](https://...)) instead of raw plain-text URLs.** Never make up information. End contact answers with his email or provide relevant social links. Furthermore, ensure that all responses respect legal boundaries and copyright laws.`;

    const apiKey = process.env.GAPI_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GAPI_KEY is not configured" });
    }

    const modelsToTry = [
      'gemini-2.5-flash',
      'gemini-3.5-flash',
      'gemini-flash-latest'
    ];

    // Construct the contents payload for Gemini API
    const contents = [];
    
    // Using system instructions supported via system_instruction in Gemini REST API
    const system_instruction = {
      parts: [{ text: systemPrompt }]
    };

    if (history && history.length > 0) {
      for (const msg of history) {
        if (msg.role && msg.content) {
          contents.push({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const payload = {
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      tools: [{
        functionDeclarations: [
          {
            name: "switchTheme",
            description: "Switches the website's theme between light and dark mode. Use this when the user asks to change the theme, colors, or switch to light/dark mode.",
            parameters: {
              type: "OBJECT",
              properties: {
                theme: {
                  type: "STRING",
                  description: "The target theme mode. Should be either 'light' or 'dark'."
                }
              },
              required: ["theme"]
            }
          },
          {
            name: "reportAbuse",
            description: "Use this tool to report the user if they are being highly hostile, aggressively swearing, or repeatedly typing random gibberish/spam. This issues a strike against the user.",
            parameters: {
              type: "OBJECT",
              properties: {
                reason: {
                  type: "STRING",
                  description: "The reason for reporting the user."
                }
              },
              required: ["reason"]
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1500 // Allow enough tokens for thinking models
      }
    };

    let response;
    let data;
    let lastError = "Upstream API error";

    for (const model of modelsToTry) {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        data = await response.json();

        if (response.ok) {
          // Success! Break out of the loop
          break;
        } else {
          lastError = (data.error && data.error.message) ? data.error.message : `API Error on ${model}`;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    if (!response || !response.ok) {
      // If all models hit quota or fail, return the error so the user can debug their API key
      return res.status(200).json({ reply: `Error: ${lastError}` });
    }

    let reply = "I couldn't process that request at this time.";
    let action = null;
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts.length > 0) {
      const parts = data.candidates[0].content.parts;
      const functionCallPart = parts.find(p => p.functionCall);
      const textPart = parts.find(p => p.text);

      if (functionCallPart) {
        const functionName = functionCallPart.functionCall.name;
        const args = functionCallPart.functionCall.args;
        if (functionName === 'switchTheme') {
          action = { type: 'switchTheme', theme: args.theme };
          reply = textPart ? textPart.text : `Switched the website to ${args.theme} mode!`;
        } else if (functionName === 'reportAbuse') {
          // Handle abuse strike
          tracker.strikes++;
          global.ipTracker[ip] = tracker;
          
          if (tracker.strikes >= 3) {
             tracker.bannedUntil = now + BAN_DURATION;
             global.ipTracker[ip] = tracker;
             if (tracker.strikes === 3) {
                 notifyDiscord(`🚨 **SPAM ALERT**: IP \`${ip}\` was just BANNED for 24 hours after 3 strikes. Reason: ${args.reason}`);
             }
             reply = "Conversation terminated due to abuse. You are blocked for 24 hours.";
          } else if (tracker.strikes === 2) {
             reply = "Warning: Please ask a clear question or stop the inappropriate behavior, or I will have to pause this chat.";
          } else {
             reply = "I didn't quite catch that. Did you have a question about Naitik's work?";
          }
        }
      } else if (textPart) {
        reply = textPart.text;
      }
    }

    return res.status(200).json({ reply, action });
  } catch (error) {
    console.error("Function error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
