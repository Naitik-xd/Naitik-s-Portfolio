import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const WELCOME_COOLDOWN = 24 * 60 * 60 * 1000; // 24 hours

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

let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Ensure nodemailer transporter is set up correctly with OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'hi.naitik.dev@gmail.com', // user's new email
    // These will be retrieved from the OAuth integration context:
    clientId: process.env.OAUTH_CLIENT_ID || process.env.CLIENT_ID || '701672043717-bc1mqag2qgbhqktrh2v4hb0jukvg5kh7.apps.googleusercontent.com',
    clientSecret: process.env.OAUTH_CLIENT_SECRET || process.env.CLIENT_SECRET || '',
    refreshToken: process.env.OAUTH_REFRESH_TOKEN || '', 
  }
});

// Fallback to App Password if refresh token fails or is not present
const fallbackTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'hi.naitik.dev@gmail.com',
    pass: process.env.EMAIL_APP_PASSWORD || ''
  }
});

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
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);
    const { userName, userContact } = body;

    const safeName = (userName || "Anonymous").substring(0, 50).replace(/[<>]/g, "");
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
    
    // 1. Notify Discord (Immediate)
    await notifyDiscord(`👋 **New chat started!**\nName: ${safeName}\nContact: ${userContact || 'None provided'}\nIP: ||${ip}||`);

    // 2. Email logic (Only if contact is an email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userContact && emailRegex.test(userContact)) {
      
      const now = Date.now();
      let canSend = true;
      let emailTrackerKey = `EMAIL_${userContact.toLowerCase()}`;

      if (supabase) {
        const { data: record, error } = await supabase
          .from('rate_limits')
          .select('*')
          .eq('ip_address', emailTrackerKey)
          .single();

        if (record && record.banned_until && record.banned_until > now) {
          canSend = false; // Using banned_until as the cooldown timer
        }
      }

      if (canSend) {
        // Prepare Email
        const mailOptions = {
          from: `"Naitik Agarwal" <${process.env.EMAIL_USER || 'hi.naitik.dev@gmail.com'}>`,
          to: userContact,
          subject: 'Thanks for visiting my portfolio!',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden;">
                      <!-- Header -->
                      <tr>
                        <td align="center" style="background-color: #07091a; padding: 40px 20px; border-bottom: 4px solid #4a9eff;">
                          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">Naitik Agarwal</h1>
                          <p style="color: #4a9eff; margin: 8px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">AI Explorer & Vibe Coder</p>
                        </td>
                      </tr>
                      <!-- Body -->
                      <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                          <h2 style="color: #1e293b; font-size: 20px; margin-top: 0; margin-bottom: 20px;">Hi ${safeName},</h2>
                          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                            Thank you for visiting my interactive portfolio and exploring my work. I truly appreciate you taking the time out of your day to chat with my AI assistant and view my projects.
                          </p>
                          
                          <!-- Feedback Block -->
                          <div style="background-color: #f1f5f9; border-left: 4px solid #4a9eff; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                            <h3 style="margin-top: 0; color: #0f172a; font-size: 16px; margin-bottom: 12px;">I would value your feedback</h3>
                            <p style="color: #475569; font-size: 15px; line-height: 1.5; margin: 0;">
                              Whether it's a thought on the user experience, a bug you spotted, or just a quick hello—your feedback helps me continuously improve.
                            </p>
                            <p style="color: #475569; font-size: 15px; line-height: 1.5; margin: 16px 0 0 0;">
                              You can share your thoughts by:
                              <br><br>
                              ✉️ <strong>Replying</strong> directly to this email<br>
                              💬 <strong>Messaging</strong> me on WhatsApp: <a href="https://wa.me/919259645560" style="color: #4a9eff; text-decoration: none; font-weight: 600;">+91 92596 45560</a>
                            </p>
                          </div>

                          <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 40px;">
                            Looking forward to connecting with you!
                          </p>
                        </td>
                      </tr>
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                          <p style="color: #94a3b8; font-size: 13px; margin: 0; line-height: 1.5;">
                            © ${new Date().getFullYear()} Naitik Agarwal. All rights reserved.<br>
                            You are receiving this automated welcome email because you visited my portfolio.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `
        };

        try {
          // Attempt sending with fallback if OAuth tokens are missing
          if (process.env.OAUTH_REFRESH_TOKEN) {
            await transporter.sendMail(mailOptions);
          } else if (process.env.EMAIL_APP_PASSWORD) {
            await fallbackTransporter.sendMail(mailOptions);
          } else {
             console.log("No Email Credentials available to send email to", userContact);
          }

          // Mark cooldown in Supabase
          if (supabase) {
            await supabase.from('rate_limits').upsert({
              ip_address: emailTrackerKey,
              strikes: 0,
              message_count: 1,
              banned_until: now + WELCOME_COOLDOWN
            }, { onConflict: 'ip_address' });
          }
        } catch (mailError) {
          console.error("Failed to send welcome email:", mailError);
        }
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Chat start error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
