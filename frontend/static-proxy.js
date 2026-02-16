#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const STATIC_DIR = path.join(__dirname, 'dist', 'frontend');
const BACKEND_HOST = process.env.BACKEND_HOST || 'localhost';
const BACKEND_PORT = process.env.BACKEND_PORT || 8080;
const PORT = process.env.PORT || 8081;

function proxyRequest(req, res) {
  const options = {
    hostname: BACKEND_HOST,
    port: BACKEND_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxy = http.request(options, (backendRes) => {
    res.writeHead(backendRes.statusCode, backendRes.headers);
    backendRes.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    res.statusCode = 502;
    res.end('Bad Gateway: ' + err.message);
  });

  req.pipe(proxy, { end: true });
}

function serveStatic(req, res) {
  const parsed = url.parse(req.url || '/');
  let pathname = decodeURIComponent(parsed.pathname || '/');
  if (pathname === '/' || pathname === '') pathname = '/index.html';

  const filePath = path.join(STATIC_DIR, pathname);
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const stream = fs.createReadStream(filePath);
      const ext = path.extname(filePath).slice(1);
      const mimeTypes = {
        html: 'text/html',
        js: 'application/javascript',
        css: 'text/css',
        json: 'application/json',
        png: 'image/png',
        jpg: 'image/jpeg',
        svg: 'image/svg+xml',
        ico: 'image/x-icon',
      };
      const mime = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      stream.pipe(res);
    } else {
      // SPA fallback -> index.html
      const index = path.join(STATIC_DIR, 'index.html');
      fs.readFile(index, (err2, data) => {
        if (err2) {
          res.statusCode = 404;
          res.end('Not found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.url && req.url.startsWith('/api')) {
    proxyRequest(req, res);
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Static+proxy server running on http://localhost:${PORT} -> proxy /api -> http://${BACKEND_HOST}:${BACKEND_PORT}`);
});
