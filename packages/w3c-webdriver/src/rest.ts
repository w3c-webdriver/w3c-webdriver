import http from 'http';
import urlParser from 'url';
import util from 'util';
import Logger from './Logger';

export interface IWebDriverResponse {
  status?: number;
  value: { message: string; error: string } | string;
}

function getErrorFromResponse({ status, value }: IWebDriverResponse): Error | undefined {
  if (typeof status === 'number' && status !==0) {
    return new Error(`WebDriverError(${status})`);
  }

  if (typeof value === 'object' && value !== null && 'error' in value) {
    const { message, error } = value;

    return new Error(`WebDriverError(${error}): ${message}`);
  }
}

type RequestMethod = 'GET' | 'POST' | 'DELETE';

async function sendRequest<T>(method: RequestMethod, url: string, body?: object): Promise<T> {
  Logger.log(`WebDriver request: ${method} ${url} ${util.inspect(body, false, 10)}`);

  const jsonBody: string = JSON.stringify(body);
  const urlParts: urlParser.UrlWithStringQuery = urlParser.parse(url);
  const options: object = {
    method,
    hostname: urlParts.hostname,
    port: urlParts.port,
    path: urlParts.path,
    headers: body !== undefined
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
      response.on('data', (chunk: string) => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        try {
          const responseBody = <IWebDriverResponse>JSON.parse(chunks.join(''));
          Logger.log(`WebDriver response: ${chunks.join('')}`);

          const error = getErrorFromResponse(responseBody);

          if (error !== undefined) {
            reject(error);

            return;
          }

          resolve(<T><unknown>responseBody.value);
        } catch (err) {
          reject(err);
        }
      });
    });

    request.on('error', reject);

    if (body !== undefined) {
      request.write(jsonBody);
    }
    request.end();
  });
}

export const GET = async <T>(url: string) => sendRequest<T>('GET', url);
export const POST = async <T>(url: string, body: object) => sendRequest<T>('POST', url, body);
export const DELETE = async <T>(url: string, body?: object) => sendRequest<T>('DELETE', url, body);
