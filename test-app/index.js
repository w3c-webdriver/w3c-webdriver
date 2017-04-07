const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

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

function start() {
    return new Promise((resolve) => {
        server.listen(8087, resolve);
    });
}

function stop() {
    return new Promise((resolve) => {
        server.close(resolve);
    });
}

if (require.main === module) {
    process.stdout.write('Server listening on port 8087\n');
    start();
}

module.exports = {
    start,
    stop
};
