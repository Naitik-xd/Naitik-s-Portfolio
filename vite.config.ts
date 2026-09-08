import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'netlify-functions-mock',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith('/api/')) {
              try {
                // Determine which file to load based on the url (e.g. /api/chat-start -> api/chat-start.js)
                const apiPath = req.url.split('?')[0]; // remove query strings
                let body = '';
                req.on('data', chunk => body += chunk.toString());
                req.on('end', async () => {
                  try {
                    // load dynamic import without caching if possible
                    const func = await import(path.resolve(import.meta.dirname, `.${apiPath}.js`) + '?t=' + Date.now());
                    
                    // Mock Vercel req/res objects
                    const mockReq = {
                      method: req.method,
                      headers: req.headers,
                      body: body || '{}',
                    };
                    
                    let statusCode = 200;
                    const headers = {};
                    let responseBody = '';
                    
                    const mockRes = {
                      setHeader(k, v) { headers[k] = v; return this; },
                      status(code) { statusCode = code; return this; },
                      json(data) { responseBody = JSON.stringify(data); this.end(); return this; },
                      end(data) { 
                        if (data) responseBody = data; 
                        res.statusCode = statusCode;
                        for (const [k, v] of Object.entries(headers)) {
                          res.setHeader(k, v as string | number | readonly string[]);
                        }
                        res.end(responseBody);
                      }
                    };
                    
                    await func.default(mockReq, mockRes);
                  } catch (e) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: String(e) }));
                  }
                });
                return;
              } catch (e) {
                console.error(e);
              }
            }
            next();
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith('/api/')) {
              try {
                const apiPath = req.url.split('?')[0];
                let body = '';
                req.on('data', chunk => body += chunk.toString());
                req.on('end', async () => {
                  try {
                    const func = await import(path.resolve(import.meta.dirname, `.${apiPath}.js`) + '?t=' + Date.now());
                    
                    const mockReq = {
                      method: req.method,
                      headers: req.headers,
                      body: body || '{}',
                    };
                    
                    let statusCode = 200;
                    const headers = {};
                    let responseBody = '';
                    
                    const mockRes = {
                      setHeader(k, v) { headers[k] = v; return this; },
                      status(code) { statusCode = code; return this; },
                      json(data) { responseBody = JSON.stringify(data); this.end(); return this; },
                      end(data) { 
                        if (data) responseBody = data; 
                        res.statusCode = statusCode;
                        for (const [k, v] of Object.entries(headers)) {
                          res.setHeader(k, v as string | number | readonly string[]);
                        }
                        res.end(responseBody);
                      }
                    };
                    
                    await func.default(mockReq, mockRes);
                  } catch (e) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: String(e) }));
                  }
                });
                return;
              } catch (e) {
                console.error(e);
              }
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
