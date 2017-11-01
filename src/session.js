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
    getTitle: () => GET(`${url}/session/${sessionId}/title`).then(({ value }) => value),

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
     *     const element = await session.findElement('css selector', 'h2');
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
    }).then(({ value: element }) => elementFactory(
      url,
      sessionId,
      // JSON Wire    || Web Driver
      element.ELEMENT || Object.values(element)[0],
      { JsonWire }
    )),

    /**
     * Search for multiple elements on the page, starting from the identified element. The located
     * elements will be returned as a WebElement JSON objects. The table below lists the locator
     * strategies that each server should support. Elements should be returned in the order located
     * in the DOM.
     * @name Session.findElements
     * @function
     * @param {string} strategy Locator strategy
     * ("css selector", "link text", "partial link text", "tag name", "xpath").
     * @param {string} selector Selector string.
     * @returns {Promise<array<Element>>}
     * @see {@link https://www.w3.org/TR/webdriver/#find-elements|WebDriver spec}
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
     *     const elements = await session.findElements('css selector', 'h2');
     *     // elements = [<webdriver element>]
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    findElements: (strategy, selector) => POST(`${url}/session/${sessionId}/elements`, {
      using: strategy,
      value: selector
    }).then(({ value: elements }) => {
      //                                         JSON Wire       || Web Driver
      const elementIds = elements.map(element => element.ELEMENT || Object.values(element)[0]);

      return elementIds.map(elementId => elementFactory(
        url,
        sessionId,
        elementId,
        { JsonWire }
      ));
    }),

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
    getTimeout: () => GET(`${url}/session/${sessionId}/timeouts`).then(({ value }) => value),

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
    getPageSource: () => GET(`${url}/session/${sessionId}/source`).then(({ value }) => value),

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
     *     const script = `
     *       const [from] = arguments;
     *       return `Hello from ${from}!`;
     *     `;
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
    }).then(({ value }) => value),

    /**
     * causes JavaScript to execute as an anonymous function. Unlike the Execute Script command, the
     * result of the function is ignored. Instead an additional argument is provided as the final
     * argument to the function. This is a function that, when called, returns its first argument
     * as the response.
     * @name Session.executeAsyncScript
     * @param {string} script -  The script to execute.
     * @param {array} [args] - The script arguments.
     * @return {Promise<*>} - The script result.
     * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#execute-async-script|WebDriver spec}
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
     *     const script = `
     *       const [a, b, callback] = arguments;
     *       setTimeout(() => callback(a * b), 1000);
     *     `;
     *     const message = await session.executeAsyncScript(script, [5, 3]);
     *     // message = 15
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    executeAsyncScript: (script, args = []) => POST(`${url}/session/${sessionId}/execute${!JsonWire ? '/async' : '_async'}`, {
      script,
      args
    }).then(({ value }) => value),

    /**
     * Returns all cookies associated with the address of the current browsing context’s active
     * document.
     *
     * @name Session.getAllCookies
     * @return {Promise<array<object>>} - A list of cookies.
     * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#get-all-cookies|WebDriver spec}
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
     *     const cookies = await session.getAllCookies();
     *     // cookies = [
     *     //   {
     *     //     name: 'cookie name',
     *     //     value: 'cookie value',
     *     //     path: '/',
     *     //     domain: 'localhost',
     *     //     secure: false,
     *     //     httpOnly: true
     *     //   }
     *     // ]
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    getAllCookies: () => GET(`${url}/session/${sessionId}/cookie`).then(({ value }) => value),

    /**
     * Adds a single cookie to the cookie store associated with the active document’s address.
     *
     * @name Session.addCookie
     * @param {object} cookie -  An object defining the cookie to add.
     * @param {string} cookie.name - The name of the cookie.
     * @param {string} cookie.value - The cookie value.
     * @param {string} [cookie.path] - The cookie path. Defaults to "/" if omitted when adding a
     * cookie.
     * @param {string} [cookie.domain] - The domain the cookie is visible to. Defaults to the
     * current browsing context’s document’s URL domain if omitted when adding a cookie.
     * @param {string} [cookie.secure] - Whether the cookie is a secure cookie. Defaults to false
     * if omitted when adding a cookie.
     * @param {string} [cookie.httpOnly] - Whether the cookie is an HTTP only cookie. Defaults to
     * false if omitted when adding a cookie.
     * @param {string} [cookie.expiry] - When the cookie expires, specified in seconds since Unix
     * Epoch. Defaults to 20 years into the future if omitted when adding a cookie.
     * @return {Promise}
     * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#add-cookie|WebDriver spec}
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
     *     await session.addCookie({ name: 'test cookie', value: 'test value' });
     *   } catch (err) {
     *     console.log(err.stack);
     *   } finally {
     *     session.delete();
     *   }
     * })();
     */
    addCookie: cookie => POST(`${url}/session/${sessionId}/cookie`, { cookie }),

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
    takeScreenshot: () => GET(`${url}/session/${sessionId}/screenshot`).then(({ value }) => Buffer.from(value, 'base64'))
  })
);
