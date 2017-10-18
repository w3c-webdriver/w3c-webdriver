'use strict';

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const logger = require('../test/logger');

const mimeTypes = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css'
};

const server = http.createServer((req, res) => {
  let uri = url.parse(req.url).pathname;

  if (uri === '/') uri = '/index.html';

  const filename = path.join(__dirname, uri);
  fs.exists(filename, (exists) => {
    if (!exists) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('404 Not Found\n');
      res.end();
      return;
    }
    const mimeType = mimeTypes[path.extname(filename).split('.')[1]];
    res.writeHead(200, { 'Content-Type': mimeType });

    const fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);
  });
});

function start(port) {
  return new Promise((resolve) => {
    server.listen(port, resolve);
  }).then(() => logger.info(`Test app started on port ${port}`));
}

function stop() {
  return new Promise((resolve) => {
    server.close(resolve);
  });
}

if (require.main === module) {
  start(8087);
}

module.exports = {
  start,
  stop
};
