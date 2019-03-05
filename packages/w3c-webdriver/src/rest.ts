// tslint:disable-next-line:import-name
import fetch from 'node-fetch';
import util from 'util';
import { log, logRequest } from './logger';

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

async function sendRequest<T>(method: RequestMethod, url: string, body?: object): Promise<T> {
  if (log.enabled && body) {
    logRequest(method, url, body);
  }

  const response = await fetch(url, { method, body: body && JSON.stringify(body) });
  // tslint:disable-next-line:no-any
  const json = <{ value: any }>await response.json();

  log(`WebDriver response: ${util.inspect(json, false, 10)}`);

  const { value } = json;

  if (isError(value)) {
    const { message, error } = value;

    throw new Error(`WebDriverError(${error}): ${message}`);
  }

  return <T>value;
}

export const GET = async <T>(url: string) => sendRequest<T>('GET', url);
export const POST = async <T>(url: string, body: object) => sendRequest<T>('POST', url, body);
export const DELETE = async <T>(url: string, body?: object) => sendRequest<T>('DELETE', url, body);
