import { GET, POST } from './rest';
import Session from './session';
import WebDriver from './types';

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
 *     session = await webdriver.newSession('http://localhost:4444', {
 *       desiredCapabilities: {
 *         browserName: 'Chrome'
 *       }
 *     });
 *   } catch (err) {
 *     console.log(err.stack);
 *   } finally {
 *     session.delete();
 *   }
 * })();
 */
export async function newSession(
  /* WebDriver server URL */
  url: string,
  /* configuration object for creating the session */
  options: object
): Promise<WebDriver.Session> {
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
 *     const status = await webdriver.status('http://localhost:4444');
 *     // status = {
 *     //   build: { version: '1.2.0' },
 *     //   os: { name: 'mac', version: 'unknown', arch: '64bit' }
 *     // }
 *   } catch (err) {
 *     console.log(err.stack);
 *   } finally {
 *     session.delete();
 *   }
 * })();
 */
export async function status(
  /* WebDriver server URL */
  url: string
): Promise<WebDriver.Status> {
  const status = await GET<WebDriver.Status>(`${url}/status`);

  return status;
}

export default WebDriver;
