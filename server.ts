import express from "express";
import path from "path";
import helmet from "helmet";

async function startServer() {
  const app = express();
  const PORT = 3000;

  const isDev = process.env.NODE_ENV !== "production";

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://www.google.com/recaptcha/", "https://www.gstatic.com/recaptcha/"],
          frameSrc: ["'self'", "https://www.google.com/recaptcha/"],
          objectSrc: ["'none'"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com"
          ],
          imgSrc: ["'self'", "data:", "https://i.ibb.co", "https://raw.githubusercontent.com", "*"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          connectSrc: [
            "'self'",
            "ws:", // For Vite HMR
            "https://generativelanguage.googleapis.com", 
            "https://vitals.vercel-insights.com",
            "https://raw.githubusercontent.com", 
            "*"
          ],
          frameAncestors: ["*"],
        },
      },
      crossOriginResourcePolicy: { policy: "cross-origin" },
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      xContentTypeOptions: true,
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    })
  );

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // NOTE: Express 4 format for catch-all
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
