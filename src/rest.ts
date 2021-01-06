import requestWithCallback, { Headers } from 'request';
import util, { promisify } from 'util';
import { log } from './logger';

const request = promisify(requestWithCallback);

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

  const { body: result } = (await request({
    url,
    method,
    json: true,
    ...(headers && { headers }),
    ...(body && { body }),
  })) as { body: { value: T } };

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
