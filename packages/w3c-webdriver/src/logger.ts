import debug from 'debug';
import util from 'util';
import { RequestMethod } from './rest';

// tslint:disable-next-line:export-name
export const log = debug('w3c-webdriver');

export function logRequest(method: RequestMethod, url: string, body: object) {
  const logSafeBody = {
    ...body,
    auth: undefined
  };

  log(`WebDriver request: ${method} ${url} ${util.inspect(logSafeBody, false, 10)}`);
}
