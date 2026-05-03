const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = 3000;
const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

http
  .createServer((req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0]);
    if (url === '/') {
      url = '/index.html';
    }
    const fp = path.join(root, url);
    if (!fp.startsWith(root)) {
      res.writeHead(403);
      res.end('forbidden');
      return;
    }
    fs.readFile(fp, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('not found: ' + url);
        return;
      }
      const ct = types[path.extname(fp).toLowerCase()] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': ct,
        'Cache-Control': 'no-store'
      });
      res.end(data);
    });
  })
  .listen(port, '127.0.0.1', () => {
    console.log('serving ' + root + ' on http://127.0.0.1:' + port);
  });
