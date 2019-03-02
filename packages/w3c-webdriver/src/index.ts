import {
  ICookie,
  IElement,
  ISession,
  IStatus,
  ITimeout,
  LocatorStrategy as TLocatorStrategy
} from './core';
import { GET, POST } from './rest';
import { Session } from './Session';

/**
 * This function creates a new WebDriver session.
 * @returns session
 * @see {@link https://www.w3.org/TR/webdriver/#new-session|WebDriver spec}
 * @example
 * import webdriver from 'w3c-webdriver';
 *
 * let session;
 *
 * (async () => {
 *   try {
 *     session = await newSession('http://localhost:4444', {
 *       desiredCapabilities: {
 *         browserName: 'Chrome'
 *       }
 *     });
 *   } catch (err) {
 *     console.log(err.stack);
 *   } finally {
 *     session.close();
 *   }
 * })();
 */
export async function newSession(
  // WebDriver server URL
  url: string,
  // configuration object for creating the session
  options: object
): Promise<ISession> {
  const { sessionId, JsonWire } = await POST<{ sessionId: string; JsonWire: boolean }>(
    `${url}/session`,
    options
  );

  return new Session(url, sessionId, { JsonWire });
}
/**
 * This function queries the WebDriver server's current status.
 * @returns status
 * @see {@link https://www.w3.org/TR/webdriver/#status|WebDriver spec}
 * @example
 * import webdriver from 'w3c-webdriver';
 *
 * (async () => {
 *   try {
 *     const status = await status('http://localhost:4444');
 *     // status = {
 *     //   build: { version: '1.2.0' },
 *     //   os: { name: 'mac', version: 'unknown', arch: '64bit' }
 *     // }
 *   } catch (err) {
 *     console.log(err.stack);
 *   } finally {
 *     session.close();
 *   }
 * })();
 */
export async function status(
  // WebDriver server URL
  url: string
): Promise<IStatus> {
  return GET<IStatus>(`${url}/status`);
}

declare namespace WebDriver {
  type Cookie = ICookie;
  type Element = IElement;
  type Session = ISession;
  type Status = IStatus;
  type Timeout = ITimeout;
  type LocatorStrategy = TLocatorStrategy;
}

/**
 * TypeScript types for w3c-webdriver
 */
// tslint:disable-next-line:no-unnecessary-class
class WebDriver {}

// tslint:disable-next-line:no-default-export export-name
export default WebDriver;
