import { GET, POST } from './rest';
import sessionFactory from './session';

/**
 * This function creates a new WebDriver session.
 * @param {string} url WebDriver server URL
 * @param {object} options configuration object for creating the session
 * @returns {Promise<Session>} session
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
export const newSession = (url, options) => POST(`${url}/session`, options).then(({ value, sessionId }) => sessionFactory(
  url,
  sessionId || value.sessionId, { JsonWire: !!sessionId }
));
/**
 * This function queries the WebDriver server's current status.
 * @param {string} url WebDriver server URL
 * @returns {Promise<Object>} status
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
export const status = url => GET(`${url}/status`).then(({ value }) => value);
