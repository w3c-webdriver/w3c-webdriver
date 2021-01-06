import { Headers } from 'request';
import { Capabilities, Status } from './core';
import { GET, POST } from './rest';
import { Session } from './Session';

/**
 * Before we can send any command to the browser we drive we need to create a [WebDriver](https://www.w3.org/TR/webdriver) session.
 * This should be always the first step of interaction through the protocol.
 * After executing this command the browser will be started and ready to receive the commands.
 * As part of session creation we have to provide the url of WebDriver protocol compliant server.
 * This can be a locally running browser driver server ([Chromedriver](http://chromedriver.chromium.org), [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver), etc.),
 * [Selenium Server or Grid](https://www.seleniumhq.org) or cloud provider url ([BrowserStack](https://www.browserstack.com), [Sauce Labs](https://saucelabs.com), .etc.).
 * Also we can set the browser and operating system parameters we want to interact with.
 * @section Sessions
 * @returns session
 * @see {@link https://www.w3.org/TR/webdriver/#new-session|WebDriver spec}
 * @param options Object with configuration for new session creation
 * @param options.url WebDriver server URL
 * @param options.capabilities WebDriver capabilities
 * @param options.desiredCapabilities Legacy WebDriver capabilities. Can be used to enable the new W3C dialect
 * @param options.headers Session creation request headers. Can be used for authorization. See example
 * @example
 * import { newSession } from 'w3c-webdriver';
 *
 * let session;
 *
 * (async () => {
 * try {
 * session = await newSession({
 * url: 'http://localhost:4444',
 * capabilities: {
 * alwaysMatch: {
 * browserName: 'Chrome'
 * }
 * }
 * });
 * } catch (err) {
 * console.log(err.stack);
 * } finally {
 * session.close();
 * }
 * })();
 * @example
 * const credentials = Buffer.from(['myusername', 'Password123'].join(':')).toString('base64');
 * const session = await newSession({
 * headers: {
 * Authorization: `Basic ${credentials}`
 * }
 * });
 */
export async function newSession(options: {
  url: string;
  capabilities: Capabilities;
  desiredCapabilities?: {
    'browserstack.use_w3c': boolean;
  };
  headers?: Headers;
}): Promise<Session> {
  const { url, capabilities, desiredCapabilities, headers } = options;
  const { sessionId } = await POST<{
    sessionId: string;
  }>(
    `${url}/session`,
    {
      ...(capabilities && { capabilities }),
      ...(desiredCapabilities && { desiredCapabilities }),
    },
    headers
  );

  return new Session(url, sessionId);
}
/**
 * To be able to verify if the WebDriver server is ready for new session creation sometimes it can be useful to query it's status.
 * This function queries the WebDriver server's current status.
 * The status contains meta information about the WebDriver server and operating system.
 *
 * @section Sessions
 * @returns status
 * @see {@link https://www.w3.org/TR/webdriver/#status|WebDriver spec}
 * @example
 * import { status } from 'w3c-webdriver';
 *
 * const status = await status('http://localhost:4444');
 * // status = {
 * //   build: { version: '1.2.0' },
 * //   os: { name: 'mac', version: 'unknown', arch: '64bit' }
 * // }
 * @param url Location of WebDriver API
 */
export async function status(url: string): Promise<Status> {
  return GET<Status>(`${url}/status`);
}

export * from './core';
export * from './Element';
export * from './Session';
