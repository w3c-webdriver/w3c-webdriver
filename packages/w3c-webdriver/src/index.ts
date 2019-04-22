import { HeaderInit } from 'node-fetch';
import { Capabilities, Status } from './core';
import { GET, POST } from './rest';
import { Session } from './Session';

/**
 * This function creates a new WebDriver session.
 * @returns session
 * @see {@link https://www.w3.org/TR/webdriver/#new-session|WebDriver spec}
 * @example
 * import { newSession } from 'w3c-webdriver';
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
 *     session.close();
 *   }
 * })();
 */
export async function newSession(options: {
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
}): Promise<Session> {
  const {
    url,
    capabilities,
    desiredCapabilities,
    headers
  } = options;
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
 * import { newSession } from 'w3c-webdriver';
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
): Promise<Status> {
  return GET<Status>(`${url}/status`);
}

export * from './Element';
export * from './Session';
export * from './core';
