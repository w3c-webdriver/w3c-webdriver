import http from 'http';
import https from 'https';
import { URL } from 'url';
import { log } from './logger';
import util from 'util';

interface ErrorValue {
  error: string;
  message: string;
}

function isError(value: unknown): value is ErrorValue {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as ErrorValue).error === 'string'
  );
}

export type RequestMethod = 'GET' | 'POST' | 'DELETE';

export type Headers = Record<string, string | string[] | undefined>;

async function sendRequest<T>(
  method: RequestMethod,
  url: string,
  body?: object,
  headers?: Headers
): Promise<T> {
  log(
    `WebDriver request: ${method} ${url} ${
      body ? util.inspect(body, false, 10) : ''
    }`
  );

  const jsonBody = JSON.stringify(body);
  const { hostname, port, pathname: path, protocol } = new URL(url);
  const protocolBasedPort = protocol === 'https:' ? 443 : 80;
  const options = {
    method,
    hostname,
    port: port || protocolBasedPort,
    path,
    headers: body
      ? {
          ...headers,
          'Content-Length': Buffer.byteLength(jsonBody, 'utf8'),
          'Content-Type': 'application/json',
        }
      : headers,
  };

  const result = await new Promise<{ value: T }>((resolve, reject) => {
    const request = (protocol === 'https:' ? https : http).request(
      options,
      (response) => {
        const chunks: string[] = [];
        response.setEncoding('utf8');
        response.on('data', (chunk: string) => {
          chunks.push(chunk);
        });
        response.on('end', () => {
          try {
            resolve(JSON.parse(chunks.join('')) as { value: T });
          } catch (err) {
            reject(err);
          }
        });
      }
    );

    request.on('error', reject);

    if (body) {
      request.write(jsonBody);
    }
    request.end();
  });

  log(`WebDriver response: ${util.inspect(result, false, 10)}`);

  const { value } = result;

  if (isError(value)) {
    const { error, message } = value;

    throw new Error(message || error);
  }

  return value;
}

export const GET = async <T>(url: string): Promise<T> =>
  sendRequest<T>('GET', url);
export const POST = async <T>(
  url: string,
  body: object = {},
  headers?: Headers
): Promise<T> => sendRequest<T>('POST', url, body, headers);
export const DELETE = async <T>(url: string, body?: object): Promise<T> =>
  sendRequest<T>('DELETE', url, body);
