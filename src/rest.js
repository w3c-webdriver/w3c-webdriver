import http from 'http';
import util from 'util';
import urlParser from 'url';
import log from './logger';

function findError({ status, value }) {
  const hasError = !!(status || (value && value.error));

  if (!hasError) {
    return null;
  }

  const { message, error } = value;

  return new Error(`WebDriverError(${error || status}): ${message}`);
}

function sendRequest(method, url, body) {
  log(`WebDriver request: ${method} ${url} ${util.inspect(body, false, 10)}`);

  const jsonBody = JSON.stringify(body);
  const urlParts = urlParser.parse(url);
  const options = {
    hostname: urlParts.hostname,
    port: urlParts.port,
    path: urlParts.path,
    method,
    headers: {}
  };

  if (body) {
    options.headers['Content-Length'] = Buffer.byteLength(jsonBody);
    options.headers['Content-Type'] = 'application/json';
  }

  return new Promise((resolve, reject) => {
    const request = http.request(options, response => {
      const chunks = [];
      response.setEncoding('utf8');
      response.on('data', chunk => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        let responseBody;

        try {
          responseBody = JSON.parse(chunks.join(''));
        } catch (err) {
          reject(err);
        }

        log(`WebDriver response: ${chunks.join('')}`);

        const error = findError(responseBody);

        if (error) {
          reject(error);
          return;
        }

        resolve(responseBody);
      });
    });

    request.on('error', error => reject(error));

    if (body) {
      request.write(jsonBody);
    }
    request.end();
  });
}

export const GET = url => sendRequest('GET', url);
export const POST = (url, body) => sendRequest('POST', url, body);
export const DELETE = (url, body) => sendRequest('DELETE', url, body);
