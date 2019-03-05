import debug from 'debug';
import util from 'util';
import { RequestMethod } from './rest';

// tslint:disable-next-line:export-name
export const log = debug('w3c-webdriver');

export function logRequest(method: RequestMethod, url: string, body: object) {
  const logSafeBody = {
    ...body,
    ...('desiredCapabilities' in body
      ? {
          desiredCapabilities: Object.entries(
            (<{ desiredCapabilities: object }>body).desiredCapabilities
          )
            .map(([key, val]) => {
              if (['browserstack.user', 'browserstack.key'].includes(key)) {
                return [key, '***'];
              }

              return [key, val];
            })
            .reduce((acc, [key, val]) => {
              return {
                ...acc,
                [<string>key]: val
              };
            }, {})
        }
      : {})
  };

  log(`WebDriver request: ${method} ${url} ${util.inspect(logSafeBody, false, 10)}`);
}
