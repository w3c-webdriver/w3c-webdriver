import fs from 'fs';
import http from 'http';
import path from 'path';
import { findAPortNotInUse } from 'portscanner';
import url from 'url';
import { log } from '../src/logger';

const mimeTypes: { [extension: string]: string } = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  js: 'text/javascript',
  css: 'text/css',
};

const server = http.createServer((req, res) => {
  let uri = url.parse(req.url as string).pathname as string;

  if (uri === '/') uri = '/testApp.html';

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

export async function startTestApp(): Promise<void> {
  const port = await findAPortNotInUse(3000, 3050, '127.0.0.1');
  process.env.TEST_APP_PORT = port.toString();
  await new Promise<void>((resolve) => {
    server.listen(port, resolve);
  });
  log(`Test app started on port ${port}`);
}

export async function stopTestApp(): Promise<void> {
  await new Promise((resolve) => {
    server.close(resolve);
  });
}

if (require.main === module) {
  startTestApp().catch((err) => {
    log(err);
  });
}
