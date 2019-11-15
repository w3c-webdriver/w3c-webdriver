import { Cookie, LocatorStrategy, Timeout, WindowRect } from './core';
import { Element, WebElement } from './Element';
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

  /****************************************************************************************************************
   *                                                 SESSIONS                                                     *
   *                                 https://www.w3.org/TR/webdriver/#sessions                                    *
   ****************************************************************************************************************/

  /**
   * Close the session.
   * @see {@link https://www.w3.org/TR/webdriver/#delete-session|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#sessions|Sessions}
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
   * Gets timeout durations associated with the current session.
   * @return - Timeout durations associated with the current session
   * in milliseconds.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#get-timeouts|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#sessions|Sessions}
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
   * @section {@link https://www.w3.org/TR/webdriver/#sessions|Sessions}
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

  /****************************************************************************************************************
   *                                                NAVIGATION                                                    *
   *                                https://www.w3.org/TR/webdriver/#navigation                                   *
   ****************************************************************************************************************/

  /**
   * Navigate to a new URL.
   * @see {@link https://www.w3.org/TR/webdriver/#navigate-to|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#navigation|Navigation}
   * @example
   * await session.navigateTo('http://localhost:8080');
   */
  public async navigateTo(
    // The URL to navigate to
    targetUrl: string
  ): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/url`, { url: targetUrl });
  }

  /**
   * Get current page URL
   * @see {@link https://www.w3.org/TR/webdriver/#get-current-url|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#navigation|Navigation}
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
   * @section {@link https://www.w3.org/TR/webdriver/#navigation|Navigation}
   * @example
   * await session.back();
   */
  public async back(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/back`);
  }

  /**
   * Navigate forward to next url from history
   * @see {@link https://www.w3.org/TR/webdriver/#forward|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#navigation|Navigation}
   * @example
   * await session.forward();
   */
  public async forward(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/forward`);
  }

  /**
   * Refresh the current page
   * @see {@link https://www.w3.org/TR/webdriver/#refresh|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#navigation|Navigation}
   * @example
   * await session.refresh();
   */
  public async refresh(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/refresh`);
  }

  /**
   * Get the current page title.
   * @see {@link https://www.w3.org/TR/webdriver/#get-title|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#navigation|Navigation}
   * @example
   * const title = await session.getTitle();
   * // title = 'web page title'
   */
  public async getTitle(): Promise<string> {
    return GET<string>(`${this.host}/session/${this.sessionId}/title`);
  }

  /****************************************************************************************************************
   *                                             COMMAND CONTEXTS                                                 *
   *                             https://www.w3.org/TR/webdriver/#command-contexts                                *
   ****************************************************************************************************************/

  /**
   * Get handle of current window
   * @see {@link https://www.w3.org/TR/webdriver/#get-window-handle|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @example
   * const handle = await session.getWindowHandle();
   * // handle = 'CDwindow-7321145136535301DE771CCBD9555CEA'
   */
  public async getWindowHandle(): Promise<string> {
    return GET(`${this.host}/session/${this.sessionId}/window`);
  }

  /**
   * Close the current window.
   * @see {@link https://www.w3.org/TR/webdriver/#close-window|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @example
   * await session.closeWindow();
   */
  public async closeWindow(): Promise<void> {
    await DELETE(`${this.host}/session/${this.sessionId}/window`);
  }

  /**
   * Change focus to another window. The window to change focus to may be specified by it's server assigned window handle.
   * @see {@link https://www.w3.org/TR/webdriver/#switch-to-window|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @example
   * await session.switchToWindow('CDwindow-7321145136535301DE771CCBD9555CEA');
   */
  public async switchToWindow(handle: string): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/window`, { handle });
  }

  /**
   * Get all window handles
   * @see {@link https://www.w3.org/TR/webdriver/#get-window-handles|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @example
   * const handles = await session.getWindowHandles();
   * // handles = ['CDwindow-7321145136535301DE771CCBD9555CEA']
   */
  public async getWindowHandles(): Promise<string[]> {
    return GET(`${this.host}/session/${this.sessionId}/window/handles`);
  }

  /**
   * Change focus to another frame on the page
   * @see {@link https://www.w3.org/TR/webdriver/#switch-to-frame|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @param id Identifier for the frame to change focus to.
   * @example
   * const iframe = await session.findElement('css selector', 'iframe');
   * await session.switchToFrame(iframe);
   * @example
   * await session.switchToFrame(null);
   */
  public async switchToFrame(target: null | number | Element): Promise<void> {
    const id = target instanceof Element ? target.getWebElement() : target;

    await POST(`${this.host}/session/${this.sessionId}/frame`, { id });
  }

  /**
   * Change focus to parent frame on the page
   * @see {@link https://www.w3.org/TR/webdriver/#switch-to-frame|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @param id Identifier for the frame to change focus to.
   * @example
   * await session.switchToParentFrame();
   */
  public async switchToParentFrame(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/frame/parent`);
  }

  /**
   * Get the size and position on the screen of the operating system window
   * @return a windowRect
   * @see {@link https://www.w3.org/TR/webdriver/#get-window-rect|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @example
   * await session.getWindowRect();
   */
  public async getWindowRect(): Promise<WindowRect> {
    return GET<WindowRect>(`${this.host}/session/${this.sessionId}/window/rect`);
  }

  /**
   * Set the size and position on the screen of the operating system window
   * @see {@link https://www.w3.org/TR/webdriver/#set-window-rect|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @example
   * await session.setWindowRect();
   */
  public async setWindowRect(windowRect: WindowRect): Promise<void> {
    return POST(`${this.host}/session/${this.sessionId}/window/rect`, windowRect);
  }

  /**
   * Maximizes the current window
   * @see {@link https://www.w3.org/TR/webdriver/#maximize-window|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @example
   * await session.maximizeWindow();
   */
  public async maximizeWindow(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/window/maximize`);
  }

  /**
   * Minimizes the current window
   * @see {@link https://www.w3.org/TR/webdriver/#minimize-window|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @example
   * await session.minimizeWindow();
   */
  public async minimizeWindow(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/window/minimize`);
  }

  /**
   * This command increases Current window to Full-Screen
   * @see {@link https://www.w3.org/TR/webdriver/#fullscreen-window|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#command-contexts|Command contexts}
   * @example
   * await session.fullScreenWindow();
   */
  public async fullScreenWindow(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/window/fullscreen`);
  }

  /****************************************************************************************************************
   *                                            ELEMENT RETRIEVAL                                                 *
   *                            https://www.w3.org/TR/webdriver/#element-retrieval                                *
   ****************************************************************************************************************/

  /**
   * Search for an element on the page, starting from the document root.
   * @see {@link https://www.w3.org/TR/webdriver/#find-element|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#element-retrieval|Element retrieval}
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
    const webElement = await POST<WebElement>(`${this.host}/session/${this.sessionId}/element`, {
      using: strategy,
      value: selector
    });

    return new Element(this.host, this.sessionId, webElement);
  }

  /**
   * Search for multiple elements on the page, starting from the document root. The located
   * elements will be returned as a WebElement JSON objects. The table below lists the locator
   * strategies that each server should support. Elements should be returned in the order located
   * in the DOM.
   * @see {@link https://www.w3.org/TR/webdriver/#find-elements|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#element-retrieval|Element retrieval}
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
    const webElements = await POST<WebElement[]>(`${this.host}/session/${this.sessionId}/elements`, {
      using: strategy,
      value: selector
    });

    return webElements.map(webElement => new Element(this.host, this.sessionId, webElement));
  }

  /**
   * Get the element on the page that currently has focus.
   * @see {@link https://www.w3.org/TR/webdriver/#get-active-element|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#element-retrieval|Element retrieval}
   * @example
   * const element = await session.getActiveElement();
   * // element = <webdriver element>
   */
  public async getActiveElement(): Promise<Element> {
    const webElement = await GET<WebElement>(`${this.host}/session/${this.sessionId}/element/active`);

    return new Element(this.host, this.sessionId, webElement);
  }

  /****************************************************************************************************************
   *                                            DOCUMENT HANDLING                                                 *
   *                            https://www.w3.org/TR/webdriver/#document-handling                                *
   ****************************************************************************************************************/

  /**
   * Returns a string serialization of the DOM of the current browsing context active document.
   *
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#getting-page-source|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#document-handling|Document handling}
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
   * @section {@link https://www.w3.org/TR/webdriver/#document-handling|Document handling}
   * @example
   * const script = `
   *   const [from] = arguments;
   *   return `Hello from ${from}!`;
   * `;
   * const message = await session.executeScript(script, ['WebDriver']);
   * // message = 'Hello from WebDriver!'
   */
  // tslint:disable-next-line:no-any
  public async executeScript<T>(script: string, args: any[] = []): Promise<T> {
    return POST<T>(`${this.host}/session/${this.sessionId}/execute/sync`, {
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
   * @section {@link https://www.w3.org/TR/webdriver/#document-handling|Document handling}
   * @example
   * const script = `
   *   const [a, b, callback] = arguments;
   *   setTimeout(() => callback(a * b), 1000);
   * `;
   * const message = await session.executeAsyncScript(script, [5, 3]);
   * // message = 15
   */
  // tslint:disable-next-line:no-any
  public async executeAsyncScript<T>(script: string, args: any[] = []): Promise<T> {
    return POST<T>(`${this.host}/session/${this.sessionId}/execute/async`, {
      script,
      args
    });
  }

  /****************************************************************************************************************
   *                                                 COOKIES                                                      *
   *                                 https://www.w3.org/TR/webdriver/#cookies                                     *
   ****************************************************************************************************************/

  /**
   * Returns all cookies associated with the address of the current browsing context’s active
   * document.
   *
   * @return A list of cookies.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#get-all-cookies|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#cookies|Cookies}
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
   * Returns cookie based on the cookie name
   *
   * @return A cookie.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#get-named-cookie|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#cookies|Cookies}
   * @example
   * const cookie = await session.getNamedCookie('cookieName');
   *
   */
  public async getNamedCookie(propertyName: string): Promise<Cookie> {
    return GET<Cookie>(`${this.host}/session/${this.sessionId}/cookie/${propertyName}`);
  }

  /**
   * Adds a single cookie to the cookie store associated with the active document’s address.
   *
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#add-cookie|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#cookies|Cookies}
   * @example
   * await session.addCookie({ name: 'test cookie', value: 'test value' });
   */
  public async addCookie(cookie: Cookie) {
    await POST(`${this.host}/session/${this.sessionId}/cookie`, { cookie });
  }

  /**
   * Delete a cookie based on its name
   *
   * @see {@link https://www.w3.org/TR/webdriver/#delete-cookie|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#cookies|Cookies}
   * @example
   * await session.deleteCookie('cookieName');
   *
   */
  public async deleteCookie(propertyName: string): Promise<void> {
    await DELETE(`${this.host}/session/${this.sessionId}/cookie/${propertyName}`);
  }

  /**
   * Delete all cookies associated with the address of the current browsing context’s active
   * document.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#delete-all-cookies|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#cookies|Cookies}
   * @example
   * await session.deleteAllCookies();
   *
   */
  public async deleteAllCookies(): Promise<void> {
    await DELETE(`${this.host}/session/${this.sessionId}/cookie`);
  }

  /****************************************************************************************************************
   *                                               USER PROMPTS                                                   *
   *                               https://www.w3.org/TR/webdriver/#user-prompts                                  *
   ****************************************************************************************************************/

  /**
   * Dismiss the alert in current page
   * @see {@link https://www.w3.org/TR/webdriver/#dismiss-alert|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#user-prompts|User prompts}
   * @example
   * await session.dismissAlert();
   */
  public async dismissAlert(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/alert/dismiss`);
  }

  /**
   * Accept the alert in current page
   * @see {@link https://www.w3.org/TR/webdriver/#accept-alert|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#user-prompts|User prompts}
   * @example
   * await session.acceptAlert();
   */
  public async acceptAlert(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/alert/accept`);
  }

  /**
   * Returns the text from an alert
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#get-alert-text|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#user-prompts|User prompts}
   * @example
   * const alertText = await session.getAlertText();
   */
  public async getAlertText(): Promise<string> {
    return GET<string>(`${this.host}/session/${this.sessionId}/alert/text`);
  }

  /**
   * Sets the text field of a prompt to the given value.
   * @see {@link https://www.w3.org/TR/webdriver/#send-alert-text|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#user-prompts|User prompts}
   * @example
   * await session.sendAlertText('Test');
   */
  public async sendAlertText(propertyName: string): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/alert/text`, { text: propertyName });
  }

  /****************************************************************************************************************
   *                                              SCREEN CAPTURE                                                  *
   *                              https://www.w3.org/TR/webdriver/#screen-capture                                 *
   ****************************************************************************************************************/

  /**
   * The Take Screenshot command takes a screenshot of the top-level browsing context’s viewport.
   *
   * @return The screenshot as a PNG.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#take-screenshot|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#screen-capture|Screen capture}
   * @example
   * const screenshot = await session.takeScreenshot();
   * // screenshot = Buffer containing PNG
   */
  public async takeScreenshot(): Promise<Buffer> {
    const screenshot = await GET<string>(`${this.host}/session/${this.sessionId}/screenshot`);

    return Buffer.from(screenshot, 'base64');
  }
}
