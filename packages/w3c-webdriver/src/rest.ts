import http from 'http';
import util from 'util';
import urlParser from 'url';
import log from './logger';

export interface IWebDriverResponse {
  status?: number;
  value: { message: string; error: string } | string;
}

function findError({ status, value }: IWebDriverResponse): Error | null {
  const hasError = !!(status || (typeof value === 'object' && value.error));

  if (!hasError) {
    return null;
  }

  const { message, error } = typeof value === 'object' ? value : { error: '', message: '' };

  return new Error(`WebDriverError(${error || status}): ${message}`);
}

function sendRequest<T>(method: string, url: string, body?: object): Promise<T> {
  log(`WebDriver request: ${method} ${url} ${util.inspect(body, false, 10)}`);

  const jsonBody = JSON.stringify(body);
  const urlParts = urlParser.parse(url);
  const options = {
    hostname: urlParts.hostname,
    port: urlParts.port,
    path: urlParts.path,
    method,
    headers: body
      ? {
          'Content-Length': Buffer.byteLength(jsonBody),
          'Content-Type': 'application/json'
        }
      : {}
  };

  return new Promise((resolve, reject) => {
    const request = http.request(options, response => {
      const chunks: string[] = [];
      response.setEncoding('utf8');
      response.on('data', chunk => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        try {
          const responseBody = JSON.parse(chunks.join(''));
          log(`WebDriver response: ${chunks.join('')}`);

          const error = findError(responseBody);

          if (error) {
            reject(error);
            return;
          }

          resolve(responseBody);
        } catch (err) {
          reject(err);
        }
      });
    });

    request.on('error', error => reject(error));

    if (body) {
      request.write(jsonBody);
    }
    request.end();
  });
}

export const GET = <T>(url: string) => sendRequest<T>('GET', url);
export const POST = <T>(url: string, body: object) => sendRequest<T>('POST', url, body);
export const DELETE = <T>(url: string, body?: object) => sendRequest<T>('DELETE', url, body);
