import { Cookie } from "./Cookie";
import { IElement } from "./IElement";
import { LocatorStrategy } from "./LocatorStrategy";
import { Timeout } from "./Timeout";

export interface ISession {

  /**
   * Configure the amount of time that a particular type of operation can execute for before
   * they are aborted and a |Timeout| error is returned to the client.
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
   *     session.deleteSession();
   *   }
   * })();
   */
  setTimeout(timeout: Timeout): Promise<void>;

  /**
   * Returns a string serialization of the DOM of the current browsing context active document.
   *
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
   *     session.deleteSession();
   *   }
   * })();
   */
  getPageSource(): Promise<string>;

  /**
   * Inject a snippet of JavaScript into the page for execution in the context of the
   * currently selected frame. The executed script is assumed to be synchronous and
   * the result of evaluating the script is returned to the client.
   *
   * @return The script result.
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
   *     session.deleteSession();
   *   }
   * })();
   */
  // tslint:disable-next-line:no-any
  executeScript(script: string, args: any[]): Promise<any>;

  /**
   * causes JavaScript to execute as an anonymous function. Unlike the Execute Script command, the
   * result of the function is ignored. Instead an additional argument is provided as the final
   * argument to the function. This is a function that, when called, returns its first argument
   * as the response.
   * @return The script result.
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
   *     session.deleteSession();
   *   }
   * })();
   */
  // tslint:disable-next-line:no-any
  executeAsyncScript(script: string, args: any[]): Promise<any>;

  /**
   * Returns all cookies associated with the address of the current browsing context’s active
   * document.
   *
   * @return A list of cookies.
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
   *     session.deleteSession();
   *   }
   * })();
   */
  getAllCookies(): Promise<Cookie[]>;

  /**
   * Adds a single cookie to the cookie store associated with the active document’s address.
   *
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
   *     session.deleteSession();
   *   }
   * })();
   */
  addCookie(cookie: Cookie): Promise<void>;

  /**
   * The Take Screenshot command takes a screenshot of the top-level browsing context’s viewport.
   *
   * @return The screenshot as a PNG.
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
   *     session.deleteSession();
   *   }
   * })();
   */
  takeScreenshot(): Promise<Buffer>;
  /**
   * Delete the session.
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
   *     session.deleteSession();
   *   }
   * })();
   */
  deleteSession(): Promise<void>;

  /**
   * Navigate to a new URL.
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
   *     session.deleteSession();
   *   }
   * })();
   */
  go(
    // The URL to navigate to
    targetUrl: string
  ): Promise<void>;

  /**
   * Get the current page title.
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
   *     session.deleteSession();
   *   }
   * })();
   */
  getTitle(): Promise<string>;

  /**
   * Search for an element on the page, starting from the document root.
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
   *     session.deleteSession();
   *   }
   * })();
   */
  findElement(
    // Locator strategy
    strategy: LocatorStrategy,
    // Selector string
    selector: string
  ): Promise<IElement>;

  /**
   * Search for multiple elements on the page, starting from the identified element. The located
   * elements will be returned as a WebElement JSON objects. The table below lists the locator
   * strategies that each server should support. Elements should be returned in the order located
   * in the DOM.
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
   *     session.deleteSession();
   *   }
   * })();
   */
  findElements(
    // Locator strategy
    strategy: LocatorStrategy,
    // Selector string
    selector: string
  ): Promise<IElement[]>;

  /**
   * Gets timeout durations associated with the current session.
   * @return - Timeout durations associated with the current session
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
   *     session.deleteSession();
   *   }
   * })();
   */
  getTimeout(): Promise<Timeout>;
}
