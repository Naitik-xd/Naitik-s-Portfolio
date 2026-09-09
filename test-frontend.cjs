const http = require('http');

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/ask-naitik',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, (res) => {
  let buffer = '';
  res.on('data', (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      console.log("PARSED CHUNK:", JSON.parse(line));
    }
  });
});
req.write(JSON.stringify({message: "hi", history: [], userName: "test", userContact: "test"}));
req.end();
