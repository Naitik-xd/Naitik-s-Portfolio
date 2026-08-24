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
    // Vercel parses JSON bodies automatically if Content-Type is application/json
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { message, history } = body;

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
