import got from 'got';
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

async function sendRequest<T>(
  method: RequestMethod,
  url: string,
  body?: object,
  headers?: Record<string, string | string[] | undefined>
): Promise<T> {
  log(
    `WebDriver request: ${method} ${url} ${
      body ? util.inspect(body, false, 10) : ''
    }`
  );

  const result = await got(url, {
    method,
    ...(body && { json: body }),
    ...(headers && { headers }),
  }).json<{ value: T }>();

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
  headers?: Record<string, string | string[] | undefined>
): Promise<T> => sendRequest<T>('POST', url, body, headers);
export const DELETE = async <T>(url: string, body?: object): Promise<T> =>
  sendRequest<T>('DELETE', url, body);
