import fetch, { HeaderInit } from 'node-fetch';
import util from 'util';
import { log } from './logger';

interface ErrorValue {
  error: string;
  message: string;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
function isError(value: any): value is ErrorValue {
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
  headers?: HeaderInit
): Promise<T> {
  log(
    `WebDriver request: ${method} ${url} ${
      body ? util.inspect(body, false, 10) : ''
    }`
  );

  const response = await fetch(url, {
    method,
    headers,
    body: body && JSON.stringify(body)
  });

  const responseBodyAsText = await response.text();

  let bodyAsJson;

  try {
    bodyAsJson = JSON.parse(responseBodyAsText) as { value: T };
  } catch (err) {
    /* istanbul ignore next */
    throw new Error(responseBodyAsText);
  }

  log(`WebDriver response: ${util.inspect(bodyAsJson, false, 10)}`);

  const { value } = bodyAsJson;

  if (isError(value)) {
    const { message } = value;

    throw new Error(message);
  }

  return value;
}

export const GET = async <T>(url: string): Promise<T> =>
  sendRequest<T>('GET', url);
export const POST = async <T>(
  url: string,
  body: object = {},
  headers?: HeaderInit
): Promise<T> => sendRequest<T>('POST', url, body, headers);
export const DELETE = async <T>(url: string, body?: object): Promise<T> =>
  sendRequest<T>('DELETE', url, body);
