import { HeaderInit } from 'node-fetch';
import {
  Capabilities as CapabilitiesType,
  Cookie as CookieType,
  IElement,
  ISession,
  LocatorStrategy as TLocatorStrategy,
  Status as StatusType,
  Timeout as TimeoutType
} from './core';
import { Capabilities } from './core/Capabilities';
import { GET, POST } from './rest';
import { Session } from './Session';

type SessionOptions = {
  /**
   * WebDriver server URL
   */
  url: string;

  /**
   * WebDriver capabilities
   */
  capabilities: Capabilities;

  /**
   * Legacy WebDriver capabilities. Can be used to enable the new W3C dialect
   */
  desiredCapabilities?: {
    'browserstack.use_w3c': boolean;
  };

  /**
   * Session creation request headers. Can be used for authorization
   * @example
   * session = await newSession({
   *   headers: {
   *     Authorization: `Basic ${Buffer.from(
   *       ['username', 'password'].join(':')
   *     ).toString('base64')}`
   *   }
   * });
   */
  headers?: HeaderInit;
};

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
 *     session = await newSession({
 *       url: 'http://localhost:4444',
 *       capabilities: {
 *         alwaysMatch: {
 *           browserName: 'Chrome'
 *         }
 *       }
 *     });
 *   } catch (err) {
 *     console.log(err.stack);
 *   } finally {
 *     session.deleteSession();
 *   }
 * })();
 */
export async function newSession({
  url,
  capabilities,
  desiredCapabilities,
  headers
}: SessionOptions): Promise<ISession> {
  const { sessionId: localSessionId, 'webdriver.remote.sessionid': remoteSessionId } = await POST<{
    sessionId?: string;
    'webdriver.remote.sessionid'?: string;
  }>(
    `${url}/session`,
    {
      capabilities,
      desiredCapabilities
    },
    headers
  );

  const sessionId = localSessionId || remoteSessionId;

  if (!sessionId) {
    throw new Error('Session creation was not successful.');
  }

  return new Session(url, sessionId);
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
 *     session.deleteSession();
 *   }
 * })();
 */
export async function status(
  // WebDriver server URL
  url: string
): Promise<StatusType> {
  return GET<StatusType>(`${url}/status`);
}

declare namespace WebDriver {
  type Cookie = CookieType;
  type Element = IElement;
  type Session = ISession;
  type Status = StatusType;
  type Timeout = TimeoutType;
  type LocatorStrategy = TLocatorStrategy;
  type Capabilities = CapabilitiesType;
}

/**
 * TypeScript types for w3c-webdriver
 */
// tslint:disable-next-line:no-unnecessary-class
class WebDriver {}

// tslint:disable-next-line:no-default-export export-name
export default WebDriver;
