import { Cookie, LocatorStrategy, Timeout } from './core';
import { Element } from './Element';
import { DELETE, GET, POST } from './rest';

/**
 * This object represents a WebDriver session.
 */
export class Session {
  private readonly host: string;
  private readonly sessionId: string;

  constructor(host: string, sessionId: string) {
    this.host = host;
    this.sessionId = sessionId;
  }

  /**
   * Close the session.
   * @see {@link https://www.w3.org/TR/webdriver/#delete-session|WebDriver spec}
   * @example
   * import { newSession } from 'w3c-webdriver';
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
  public async close(): Promise<void> {
    await DELETE(`${this.host}/session/${this.sessionId}`);
  }

  /**
   * Navigate to a new URL.
   * @see {@link https://www.w3.org/TR/webdriver/#navigate-to|WebDriver spec}
   * @example
   * await session.go('http://localhost:8080');
   */
  public async go(
    // The URL to navigate to
    targetUrl: string
  ): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/url`, { url: targetUrl });
  }

  /**
   * Get current page URL
   * @see {@link https://www.w3.org/TR/webdriver/#get-current-url|WebDriver spec}
   * @example
   * const currentUrl = await session.getCurrentUrl();
   * // currentUrl = 'http://localhost:8080'
   */
  public async getCurrentUrl(): Promise<string> {
    return GET<string>(`${this.host}/session/${this.sessionId}/url`);
  }

  /**
   * Navigate to previous url from history
   * @see {@link https://www.w3.org/TR/webdriver/#back|WebDriver spec}
   * @example
   * await session.back();
   */
  public async back(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/back`, {});
  }

  /**
   * Navigate forward to next url from history
   * @see {@link https://www.w3.org/TR/webdriver/#forward|WebDriver spec}
   * @example
   * await session.forward();
   */
  public async forward(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/forward`, {});
  }

  /**
   * Refresh the current page
   * @see {@link https://www.w3.org/TR/webdriver/#refresh|WebDriver spec}
   * @example
   * await session.refresh();
   */
  public async refresh(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/refresh`, {});
  }

  /**
   * Get the current page title.
   * @see {@link https://www.w3.org/TR/webdriver/#get-title|WebDriver spec}
   * @example
   * const title = await session.getTitle();
   * // title = 'web page title'
   */
  public async getTitle(): Promise<string> {
    return GET<string>(`${this.host}/session/${this.sessionId}/title`);
  }

  /**
   * Search for an element on the page, starting from the document root.
   * @see {@link https://www.w3.org/TR/webdriver/#find-element|WebDriver spec}
   * @example
   * const element = await session.findElement('css selector', 'h2');
   * // element = <webdriver element>
   */
  public async findElement(
    // Locator strategy
    strategy: LocatorStrategy,
    // Selector string
    selector: string
  ): Promise<Element> {
    const element = await POST<{ [name: string]: string }>(
      `${this.host}/session/${this.sessionId}/element`,
      {
        using: strategy,
        value: selector
      }
    );

    return new Element(this.host, this.sessionId, Object.values(element)[0]);
  }

  /**
   * Search for multiple elements on the page, starting from the identified element. The located
   * elements will be returned as a WebElement JSON objects. The table below lists the locator
   * strategies that each server should support. Elements should be returned in the order located
   * in the DOM.
   * @see {@link https://www.w3.org/TR/webdriver/#find-elements|WebDriver spec}
   * @example
   * const elements = await session.findElements('css selector', 'h2');
   * // elements = [<webdriver element>]
   */
  public async findElements(
    // Locator strategy
    strategy: LocatorStrategy,
    // Selector string
    selector: string
  ) {
    const elements = await POST<[{ [name: string]: string }]>(
      `${this.host}/session/${this.sessionId}/elements`,
      {
        using: strategy,
        value: selector
      }
    );

    return elements.map(
      element => new Element(this.host, this.sessionId, Object.values(element)[0])
    );
  }

  /**
   * Gets timeout durations associated with the current session.
   * @return - Timeout durations associated with the current session
   * in milliseconds.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#get-timeouts|WebDriver spec}
   * @example
   * const timeout = await session.getTimeout();
   * // timeout = {
   * //   script: 30000,
   * //   pageLoad: 60000,
   * //   implicit: 40000
   * // }
   */
  public async getTimeout(): Promise<Timeout> {
    return GET<Timeout>(`${this.host}/session/${this.sessionId}/timeouts`);
  }

  /**
   * Configure the amount of time that a particular type of operation can execute for before
   * they are aborted and a |Timeout| error is returned to the client.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#set-timeouts|WebDriver spec}
   * @example
   * await session.setTimeout({
   *   script: 30000,
   *   pageLoad: 60000,
   *   implicit: 40000
   * });
   */
  public async setTimeout(timeout: Timeout): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/timeouts`, timeout);
  }

  /**
   * Returns a string serialization of the DOM of the current browsing context active document.
   *
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#getting-page-source|WebDriver spec}
   * @example
   * const source = await session.getPageSource();
   * // source = '<!DOCTYPE html><head><title>...'
   */
  public async getPageSource(): Promise<string> {
    return GET<string>(`${this.host}/session/${this.sessionId}/source`);
  }

  /**
   * Inject a snippet of JavaScript into the page for execution in the context of the
   * currently selected frame. The executed script is assumed to be synchronous and
   * the result of evaluating the script is returned to the client.
   *
   * @return The script result.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#execute-script|WebDriver spec}
   * @example
   * const script = `
   *   const [from] = arguments;
   *   return `Hello from ${from}!`;
   * `;
   * const message = await session.executeScript(script, ['WebDriver']);
   * // message = 'Hello from WebDriver!'
   */
  // tslint:disable-next-line:no-any
  public async executeScript(script: string, args: any[] = []): Promise<any> {
    // tslint:disable-next-line:no-any
    return POST<any>(`${this.host}/session/${this.sessionId}/execute/sync`, {
      script,
      args
    });
  }

  /**
   * causes JavaScript to execute as an anonymous function. Unlike the Execute Script command, the
   * result of the function is ignored. Instead an additional argument is provided as the final
   * argument to the function. This is a function that, when called, returns its first argument
   * as the response.
   * @return The script result.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#execute-async-script|WebDriver spec}
   * @example
   * const script = `
   *   const [a, b, callback] = arguments;
   *   setTimeout(() => callback(a * b), 1000);
   * `;
   * const message = await session.executeAsyncScript(script, [5, 3]);
   * // message = 15
   */
  // tslint:disable-next-line:no-any
  public async executeAsyncScript(script: string, args: any[] = []): Promise<any> {
    // tslint:disable-next-line:no-any
    return POST<any>(`${this.host}/session/${this.sessionId}/execute/async`, {
      script,
      args
    });
  }

  /**
   * Returns all cookies associated with the address of the current browsing context’s active
   * document.
   *
   * @return A list of cookies.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#get-all-cookies|WebDriver spec}
   * @example
   * const cookies = await session.getAllCookies();
   * // cookies = [
   * //   {
   * //     name: 'cookie name',
   * //     value: 'cookie value',
   * //     path: '/',
   * //     domain: 'localhost',
   * //     secure: false,
   * //     httpOnly: true
   * //   }
   * // ]
   */
  public async getAllCookies(): Promise<Cookie[]> {
    return GET<Cookie[]>(`${this.host}/session/${this.sessionId}/cookie`);
  }

  /**
   * Adds a single cookie to the cookie store associated with the active document’s address.
   *
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#add-cookie|WebDriver spec}
   * @example
   * await session.addCookie({ name: 'test cookie', value: 'test value' });
   */
  public async addCookie(cookie: Cookie) {
    await POST(`${this.host}/session/${this.sessionId}/cookie`, { cookie });
  }

  /**
   * The Take Screenshot command takes a screenshot of the top-level browsing context’s viewport.
   *
   * @return The screenshot as a PNG.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#take-screenshot|WebDriver spec}
   * @example
   * const screenshot = await session.takeScreenshot();
   * // screenshot = Buffer containing PNG
   */
  public async takeScreenshot(): Promise<Buffer> {
    const screenshot = await GET<string>(`${this.host}/session/${this.sessionId}/screenshot`);

    return Buffer.from(screenshot, 'base64');
  }

  /**
   * Dismiss the alert in current page
   * @see {@link https://www.w3.org/TR/webdriver/#dismiss-alert|WebDriver spec}
   * @example
   * await session.dismissAlert();
   */
  public async dismissAlert(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/alert/dismiss`, {});
  }

  /**
   * Accept the alert in current page
   * @see {@link https://www.w3.org/TR/webdriver/#accept-alert|WebDriver spec}
   * @example
   * await session.acceptAlert();
   */
  public async acceptAlert(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/alert/accept`, {});
  }

}
