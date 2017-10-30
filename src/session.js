import { GET, POST, DELETE } from './rest';
import elementFactory from './element';

export default (url, sessionId, { JsonWire }) => (
  /**
   * This object represents a WebDriver session.
   * @typedef {Object} Session
   * @property {Session.delete} delete - Delete the session.
   * @property {Session.go} go - Navigate to a new URL.
   * @property {Session.getTitle} getTitle - Get the current page title.
   * @property {Session.findElement} findElement - Search for an element on the page,
   *  starting from the document root.
   */
  ({
    /**
     * Delete the session.
     * @name Session.delete
     * @function
     * @returns {Promise}
     * @see {@link https://www.w3.org/TR/webdriver/#delete-session|WebDriver spec}
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
    delete: () => DELETE(`${url}/session/${sessionId}`),

    /**
     * Navigate to a new URL.
     * @name Session.go
     * @function
     * @param {string} targetUrl The URL to navigate to.
     * @returns {Promise}
     * @see {@link https://www.w3.org/TR/webdriver/#go|WebDriver spec}
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
     *     await session.go('http://localhost:8080');
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    go: targetUrl => POST(`${url}/session/${sessionId}/url`, { url: targetUrl }),

    /**
     * Get the current page title.
     * @name Session.getTitle
     * @function
     * @returns {Promise<string>} The current page title.
     * @see {@link https://www.w3.org/TR/webdriver/#get-title|WebDriver spec}
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
     *     await session.go('http://localhost:8080');
     *     const title = await session.getTitle();
     *     // title = 'web page title'
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    getTitle: () => GET(`${url}/session/${sessionId}/title`).then(body => body.value),

    /**
     * Search for an element on the page, starting from the document root.
     * @name Session.findElement
     * @function
     * @param {string} strategy Locator strategy
     * ("css selector", "link text", "partial link text", "tag name", "xpath").
     * @param {string} selector Selector string.
     * @returns {Promise<Element>}
     * @see {@link https://www.w3.org/TR/webdriver/#find-element|WebDriver spec}
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
     *     await session.go('http://localhost:8080');
     *     const element = await session.findElement('css', 'h2');
     *     // element = <webdriver element>
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    findElement: (strategy, selector) => POST(`${url}/session/${sessionId}/element`, {
      using: strategy,
      value: selector
    }).then(body => elementFactory(
      url,
      sessionId,
      // JSON Wire       || Web Driver
      body.value.ELEMENT || Object.values(body.value)[0],
      { JsonWire }
    )),

    /**
     * Gets timeout durations associated with the current session.
     * @name Session.getTimeout
     * @function
     * @return {Promise<object>} - Timeout durations associated with the current session
     * in milliseconds.
     * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#get-timeouts|WebDriver spec}
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
     *     const timeout = await session.getTimeout();
     *     // timeout = {
     *     //   script: 30000,
     *     //   pageLoad: 60000,
     *     //   implicit: 40000
     *     // }
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    getTimeout: () => GET(`${url}/session/${sessionId}/timeouts`).then(body => body.value),

    /**
     * Configure the amount of time that a particular type of operation can execute for before
     * they are aborted and a |Timeout| error is returned to the client.
     * @name Session.setTimeout
     * @function
     * @param {object} timeouts - Timout configuration object with values in milliseconds.
     * @param {number} timeouts.script - Session script timeout - Determines when to interrupt
     *  a script that is being evaluated.
     * @param {number} timeouts.pageLoad - Session page load timeout - Provides the timeout
     *  limit used to interrupt navigation of the browsing context.
     * @param {number} timeouts.implicit - Session implicit wait timeout -Gives the timeout
     *   of when to abort locating an element.
     * @return {Promise}
     * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#set-timeouts|WebDriver spec}
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
     *     await session.setTimeout({
     *       script: 30000,
     *       pageLoad: 60000,
     *       implicit: 40000
     *     });
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    setTimeout: ({ script, pageLoad, implicit }) => POST(`${url}/session/${sessionId}/timeouts`, {
      script,
      pageLoad,
      implicit
    }),

    /**
     * Returns a string serialization of the DOM of the current browsing context active document.
     *
     * @name Session.getPageSource
     * @return {Promise<string>} - The current page source.
     * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#getting-page-source|WebDriver spec}
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
     *     await session.go('http://localhost:8080');
     *     const source = await session.getPageSource();
     *     // source = '<!DOCTYPE html><head><title>...'
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    getPageSource: () => GET(`${url}/session/${sessionId}/source`).then(body => body.value),

    /**
     * Inject a snippet of JavaScript into the page for execution in the context of the
     * currently selected frame. The executed script is assumed to be synchronous and
     * the result of evaluating the script is returned to the client.
     *
     * @name Session.executeScript
     * @param {string} script -  The script to execute.
     * @param {array} [args] - The script arguments.
     * @return {Promise<*>} - The script result.
     * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#execute-script|WebDriver spec}
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
     *     await session.go('http://localhost:8080');
     *     const script = 'const [from] = arguments; return `Hello from ${from}!`;';
     *     const message = await session.executeScript(script, ['WebDriver']);
     *     // message = 'Hello from WebDriver!'
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    executeScript: (script, args = []) => POST(`${url}/session/${sessionId}/execute${!JsonWire ? '/sync' : ''}`, {
      script,
      args
    }).then(body => body.value),

    /**
     * The Take Screenshot command takes a screenshot of the top-level browsing context’s viewport.
     *
     * @name Session.takeScreenshot
     * @return {Promise<Buffer>} - The screenshot as a PNG.
     * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#take-screenshot|WebDriver spec}
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
     *     await session.go('http://localhost:8080');
     *     const screenshot = await session.takeScreenshot();
     *     // screenshot = Buffer containing PNG
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    takeScreenshot: () => GET(`${url}/session/${sessionId}/screenshot`).then(body => Buffer.from(body.value, 'base64'))
  })
);
