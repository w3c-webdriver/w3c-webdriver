import request, { Headers } from 'request';
import util from 'util';
import { log } from './logger';

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

  const value = await new Promise<T>((resolve, reject) => {
    const json = Buffer.from(body ? JSON.stringify(body) : '', 'utf8');
    const hasContent = !!json.length;
    request(
      {
        url,
        method,
        json: true,
        headers: {
          ...headers,
          // // This can be removed in favour of using `json` property if https://github.com/SeleniumHQ/selenium/issues/7986 is resolved
          // ...(hasContent && {
          //   'Content-Type': 'application/json;charset=UTF-8',
          //   'Content-Length': json.length,
          // }),
        },
        ...(hasContent && { body: json }),
      },
      (error: Error, _response, body) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          const result = JSON.parse(body) as { value: T };
          log(`WebDriver response: ${util.inspect(result, false, 10)}`);
          resolve(result.value);
        } catch (e) {
          /* istanbul ignore next */
          reject(body);
        }
      }
    );
  });

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
