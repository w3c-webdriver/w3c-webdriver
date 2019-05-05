import fs from 'fs';
import http from 'http';
import path from 'path';
import url from 'url';
import { log } from '../src/logger';

const mimeTypes: { [extension: string]: string } = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css'
};

const server = http.createServer((req, res) => {
  let uri = <string>url.parse(<string>req.url).pathname;

  if (uri === '/') uri = '/test-app.html';

  const filename = path.join(__dirname, uri);
  fs.exists(filename, exists => {
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

export async function start(port: number) {
  await new Promise(resolve => {
    server.listen(port, resolve);
  });
  log(`Test app started on port ${port}`)
}

export async function stop() {
  await new Promise(resolve => {
    server.close(resolve);
  });
}

if (require.main === module) {
  start(8087).catch((err: Error) => {
    if (err.stack) {
      log(err.stack);
    }
  });
}
