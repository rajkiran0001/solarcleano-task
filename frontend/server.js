const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
    if (err) { res.writeHead(500); res.end('Error'); return; }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}).listen(3000, () => console.log('Frontend serving on http://0.0.0.0:3000'));
