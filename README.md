<div align="center">

# ✦ Naitik Agarwal | AI Explorer & Vibe Coder ✦
**"Skills matter more than degrees."**

An interactive, cinema-inspired portfolio powered by React, Three.js, GSAP, Tailwind CSS, and a Gemini-powered AI Assistant.

[![Live Site](https://img.shields.io/badge/Live-na1t1k.vercel.app-4A9EFF?style=for-the-badge&logo=vercel&logoColor=white)](https://na1t1k.vercel.app/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](#)
[![Gemini API](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-F5A623?style=for-the-badge)](./LICENSE)

</div>

---

## 🌌 Overview
Built around **Prompt Engineering, AI Tool Scouting, and Vibe Coding**, this portfolio showcases projects, verified skill badges, photography, and hackathon milestones alongside **Ask Naitik**, a streaming Gemini AI assistant with real-time Discord notifications and automated visitor workflows.

---

## ✨ Key Features

- **🤖 Streaming "Ask Naitik" AI Assistant (`/api/ask-naitik`):**
  - Context-aware Gemini AI assistant with multi-model fallback (`gemini-2.5-flash`, `gemini-3.5-flash`, `gemini-flash-latest`).
  - Function calling for **theme switching**, **lead/contact forwarding** (`sendContactLeadToDiscord`), **feedback capture** (`sendFeedbackToDiscord`), **unknown query escalation** (`forwardUnknownQuery`), and **automated abuse moderation** (`reportAbuse`).
- **🔔 Real-Time Discord Notifications & Welcome Emails (`/api/chat-start`, `/api/feedback`):**
  - Sends instant Discord alerts for new chat sessions, visitor contact requests, bug reports, and rate-limit events.
  - Sends automated HTML welcome emails via Nodemailer (Gmail OAuth2 / App Password) with disposable-email blocking and 24-hour cooldowns.
- **🛡️ Production Security & Rate Limiting:**
  - Strict CORS origin allowlist (`https://na1t1k.vercel.app` and local dev), Content Security Policy (`script-src-attr 'none'`), and XSS-safe Markdown rendering.
  - Supabase-backed rate limiting across chat and feedback endpoints, plus Google reCAPTCHA v3 verification on session start.
  - Discord webhook `allowed_mentions: { parse: [] }` and payload length capping to prevent mention pings and truncation errors.
- **🎨 Interactive Experience:**
  - Three.js 3D particle canvas, GSAP scroll animations, Web Audio synthesized soundscapes, Dark/Light mode toggle, and 173+ verified skill badges (including 123+ Google Cloud Skills Boost badges).
- **⚡ Automated Supabase Keep-Alive (`.github/workflows/keep-supabase-alive.yml`):**
  - Scheduled GitHub Actions workflow pinging Supabase 3 days a week (Mon/Wed/Fri) to prevent free-tier inactivity pausing.

---

## 🏆 Highlights & Projects

- **Bioluminescent Streetlight** — Built via prompt-driven vibe coding with Claude & Lovable ([Live](https://bioluminescent-streetlights.lovable.app))
- **Luminae Bay** — AI-powered salon booking & styling consultation platform ([Live](https://luminae-bay.vercel.app/))
- **StageMap** — 8-hour hackathon build for local event discovery & digital ticketing ([Live](https://na1t1k-hackathon3.vercel.app/))
- **Lumen Vibe** — 24-hour build for **Shinchan Online Hackathon 2026** by Devengers & Unstop (**Rank 24 / 746**) ([Live](https://lumen-vibe.vercel.app/))
- **Google Code Vipassana Season 16** — Top 100 Leaderboard (**Position 52**) ([Event](https://rsvp.withgoogle.com/events/cv?pli=1))
- **Ideathon 2025** — Top 100 / 1,400 Globally
- **MDI Gurugram Photography** — Selected Entry (*Sky Tower*, **4th / 135**)

---

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Three.js, GSAP, Lucide Icons, Marked
- **Backend / API:** Vercel Serverless Functions (`/api/*`) & Express.js dev/prod server (`server.ts`)
- **Database & Security:** Supabase (PostgreSQL rate limiting), Helmet, Google reCAPTCHA v3
- **AI & Messaging:** Google Gemini REST API, Discord Webhooks, Nodemailer

---

## 🚀 Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**  
   Copy `.env.example` to `.env` and fill in your credentials (`GAPI_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `DISCORD_WEBHOOK_URL`, `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, and email credentials).
3. **Run development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

---

## ⚖️ License
Licensed under the [MIT License](./LICENSE) © 2026 Naitik Agarwal.

<div align="center">
  <br />
  <i>Designed and engineered by Naitik Agarwal.</i>
</div>
