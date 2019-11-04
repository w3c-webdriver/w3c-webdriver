import fetch, { HeaderInit } from 'node-fetch';
import util from 'util';
import { log } from './logger';

interface IErrorValue {
  error: string;
  message: string;
}

// tslint:disable-next-line:no-any
function isError(value: any): value is IErrorValue {
  return (
    typeof value === 'object' && value !== null && typeof (<IErrorValue>value).error === 'string'
  );
}

export type RequestMethod = 'GET' | 'POST' | 'DELETE';

async function sendRequest<T>(
  method: RequestMethod,
  url: string,
  body?: object,
  headers?: HeaderInit
): Promise<T> {

  log(`WebDriver request: ${method} ${url} ${body ? util.inspect(body, false, 10) : ''}`);

  const response = await fetch(url, {
    method,
    headers,
    body: body && JSON.stringify(body)
  });

  const responseBodyAsText = await response.text();

  let bodyAsJson;

  try {
    bodyAsJson = <{ value: T }>JSON.parse(responseBodyAsText);
  } catch (err) {
    throw new Error(responseBodyAsText);
  }

  log(`WebDriver response: ${util.inspect(bodyAsJson, false, 10)}`);

  const { value } = bodyAsJson;

  if (isError(value)) {
    const { message, error } = value;

    throw new Error(`WebDriverError(${error}): ${message}`);
  }

  return value;
}

export const GET = async <T>(url: string) => sendRequest<T>('GET', url);
export const POST = async <T>(url: string, body: object = {}, headers?: HeaderInit) =>
  sendRequest<T>('POST', url, body, headers);
export const DELETE = async <T>(url: string, body?: object) => sendRequest<T>('DELETE', url, body);
