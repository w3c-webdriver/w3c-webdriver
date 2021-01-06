import {
  ActionSequence,
  Cookie,
  LocatorStrategy,
  Timeouts,
  WindowRect,
} from './core';
import { deepMap } from './core/utils';
import { Element, isWebElement, WebElement } from './Element';
import { DELETE, GET, POST } from './rest';

/**
 * This object represents a WebDriver session.
 * @section Sessions
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
   * @section Sessions
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

  /****************************************************************************************************************
   *                                                 TIMEOUTS                                                     *
   *                                 https://www.w3.org/TR/webdriver/#timeouts                                    *
   ****************************************************************************************************************/

  /**
   * Gets timeout durations associated with the current session.
   * @return - Timeout durations associated with the current session
   * in milliseconds.
   * @see {@link https://www.w3.org/TR/webdriver/#get-timeouts|WebDriver spec}
   * @section Timeouts
   * @example
   * const timeout = await session.getTimeouts();
   * // timeout = {
   * //   script: 30000,
   * //   pageLoad: 60000,
   * //   implicit: 40000
   * // }
   */
  public async getTimeouts(): Promise<Timeouts> {
    return GET<Timeouts>(`${this.host}/session/${this.sessionId}/timeouts`);
  }

  /**
   * Configure the amount of time that a particular type of operation can execute for before
   * they are aborted and a Timeout error is returned to the client.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#set-timeouts|WebDriver spec}
   * @section Timeouts
   * @example
   * await session.setTimeouts({
   *   script: 30000,
   *   pageLoad: 60000,
   *   implicit: 40000
   * });
   * @param timeout Session timeout configuration object
   */
  public async setTimeouts(timeout: Timeouts): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/timeouts`, timeout);
  }

  /****************************************************************************************************************
   *                                                NAVIGATION                                                    *
   *                                https://www.w3.org/TR/webdriver/#navigation                                   *
   ****************************************************************************************************************/

  /**
   * Navigate to a new URL.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#navigate-to|WebDriver spec}
   * @section Navigation
   * @example
   * await session.navigateTo('http://localhost:8080');
   * @param targetUrl New URL to navigate
   */
  public async navigateTo(
    // The URL to navigate to
    targetUrl: string
  ): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/url`, {
      url: targetUrl,
    });
  }

  /**
   * Get current page URL
   * @see {@link https://www.w3.org/TR/webdriver/#get-current-url|WebDriver spec}
   * @section Navigation
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
   * @section Navigation
   * @example
   * await session.back();
   */
  public async back(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/back`);
  }

  /**
   * Navigate forward to next url from history
   * @see {@link https://www.w3.org/TR/webdriver/#forward|WebDriver spec}
   * @section Navigation
   * @example
   * await session.forward();
   */
  public async forward(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/forward`);
  }

  /**
   * Refresh the current page
   * @see {@link https://www.w3.org/TR/webdriver/#refresh|WebDriver spec}
   * @section Navigation
   * @example
   * await session.refresh();
   */
  public async refresh(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/refresh`);
  }

  /**
   * Get the current page title.
   * @see {@link https://www.w3.org/TR/webdriver/#get-title|WebDriver spec}
   * @section Navigation
   * @example
   * const title = await session.getTitle();
   * // title = 'web page title'
   */
  public async getTitle(): Promise<string> {
    return GET<string>(`${this.host}/session/${this.sessionId}/title`);
  }

  /****************************************************************************************************************
   *                                                 CONTEXTS                                                     *
   *                                 https://www.w3.org/TR/webdriver/#contexts                                    *
   ****************************************************************************************************************/

  /**
   * Get handle of current window
   * @see {@link https://www.w3.org/TR/webdriver/#get-window-handle|WebDriver spec}
   * @section Contexts
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
   * @section Contexts
   * @example
   * await session.closeWindow();
   */
  public async closeWindow(): Promise<void> {
    await DELETE(`${this.host}/session/${this.sessionId}/window`);
  }

  /**
   * Change focus to another window. The window to change focus to may be specified by it's server assigned window handle.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#switch-to-window|WebDriver spec}
   * @section Contexts
   * @example
   * await session.switchToWindow('CDwindow-7321145136535301DE771CCBD9555CEA');
   * @param handle Window handle to switch to
   */
  public async switchToWindow(handle: string): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/window`, { handle });
  }

  /**
   * Get all window handles
   * @see {@link https://www.w3.org/TR/webdriver/#get-window-handles|WebDriver spec}
   * @section Contexts
   * @example
   * const handles = await session.getWindowHandles();
   * // handles = ['CDwindow-7321145136535301DE771CCBD9555CEA']
   */
  public async getWindowHandles(): Promise<string[]> {
    return GET(`${this.host}/session/${this.sessionId}/window/handles`);
  }

  /**
   * Change focus to another frame on the page
   *
   * @see {@link https://www.w3.org/TR/webdriver/#switch-to-frame|WebDriver spec}
   * @section Contexts
   * @example
   * const iframe = await session.findElement('css selector', 'iframe');
   * await session.switchToFrame(iframe);
   * @example
   * await session.switchToFrame(null);
   * @param target Identifier for the frame to change focus to
   */
  public async switchToFrame(target: null | number | Element): Promise<void> {
    const id = target instanceof Element ? target.getWebElement() : target;

    await POST(`${this.host}/session/${this.sessionId}/frame`, { id });
  }

  /**
   * Change focus to parent frame on the page
   * @see {@link https://www.w3.org/TR/webdriver/#switch-to-parent-frame|WebDriver spec}
   * @section Contexts
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
   * @section Contexts
   * @example
   * await session.getWindowRect();
   */
  public async getWindowRect(): Promise<WindowRect> {
    return GET<WindowRect>(
      `${this.host}/session/${this.sessionId}/window/rect`
    );
  }

  /**
   * Set the size and position on the screen of the operating system window
   *
   * @see {@link https://www.w3.org/TR/webdriver/#set-window-rect|WebDriver spec}
   * @section Contexts
   * @example
   * await session.setWindowRect({
   *   x: 10,
   *   y: 10,
   *   width: 320,
   *   height: 600
   * });
   * @param windowRect Window position and size
   */
  public async setWindowRect(windowRect: WindowRect): Promise<void> {
    return POST(
      `${this.host}/session/${this.sessionId}/window/rect`,
      windowRect
    );
  }

  /**
   * Maximizes the current window
   * @see {@link https://www.w3.org/TR/webdriver/#maximize-window|WebDriver spec}
   * @section Contexts
   * @example
   * await session.maximizeWindow();
   */
  public async maximizeWindow(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/window/maximize`);
  }

  /**
   * Minimizes the current window
   * @see {@link https://www.w3.org/TR/webdriver/#minimize-window|WebDriver spec}
   * @section Contexts
   * @example
   * await session.minimizeWindow();
   */
  public async minimizeWindow(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/window/minimize`);
  }

  /**
   * This command increases Current window to Full-Screen
   * @see {@link https://www.w3.org/TR/webdriver/#fullscreen-window|WebDriver spec}
   * @section Contexts
   * @example
   * await session.fullScreenWindow();
   */
  public async fullScreenWindow(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/window/fullscreen`);
  }

  /****************************************************************************************************************
   *                                                 ELEMENTS                                                     *
   *                                 https://www.w3.org/TR/webdriver/#elements                                    *
   ****************************************************************************************************************/

  /**
   * Search for an element on the page, starting from the document root.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#find-element|WebDriver spec}
   * @section Elements
   * @example
   * const element = await session.findElement('css selector', 'h2');
   * // element = <webdriver element>
   * @param strategy Strategy for emelent lookup
   * @param selector Selector string
   */
  public async findElement(
    strategy: LocatorStrategy,
    selector: string
  ): Promise<Element> {
    const webElement = await POST<WebElement>(
      `${this.host}/session/${this.sessionId}/element`,
      {
        using: strategy,
        value: selector,
      }
    );

    return new Element(this.host, this.sessionId, webElement);
  }

  /**
   * Search for multiple elements on the page, starting from the document root. The located
   * elements will be returned as a WebElement JSON objects. The table below lists the locator
   * strategies that each server should support. Elements should be returned in the order located
   * in the DOM.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#find-elements|WebDriver spec}
   * @section Elements
   * @example
   * const elements = await session.findElements('css selector', 'h2');
   * // elements = [<webdriver element>]
   * @param strategy Strategy for emelent lookup
   * @param selector Selector string
   */
  public async findElements(
    strategy: LocatorStrategy,
    selector: string
  ): Promise<Element[]> {
    const webElements = await POST<WebElement[]>(
      `${this.host}/session/${this.sessionId}/elements`,
      {
        using: strategy,
        value: selector,
      }
    );

    return webElements.map(
      (webElement) => new Element(this.host, this.sessionId, webElement)
    );
  }

  /**
   * Get the element on the page that currently has focus.
   * @see {@link https://www.w3.org/TR/webdriver/#get-active-element|WebDriver spec}
   * @section Elements
   * @example
   * const element = await session.getActiveElement();
   * // element = <webdriver element>
   */
  public async getActiveElement(): Promise<Element> {
    const webElement = await GET<WebElement>(
      `${this.host}/session/${this.sessionId}/element/active`
    );

    return new Element(this.host, this.sessionId, webElement);
  }

  /****************************************************************************************************************
   *                                                 DOCUMENT                                                     *
   *                                 https://www.w3.org/TR/webdriver/#document                                    *
   ****************************************************************************************************************/

  /**
   * Returns a string serialization of the DOM of the current browsing context active document.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#get-page-source|WebDriver spec}
   * @section Document
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
   * @see {@link https://www.w3.org/TR/webdriver/#execute-script|WebDriver spec}
   * @section Document
   * @example
   * const script = `
   *   const [name] = arguments;
   *   return `Hello from ${name}!`;
   * `;
   * const message = await session.executeScript(script, ['WebDriver']);
   * // message = 'Hello from WebDriver!'
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const script = `
   *    const [element] = arguments;
   *    return element.id;
   * `;
   * const id = await session.executeScript(script, [button]);
   * // id = 'red-button'
   * @example
   * const script = `
   *    return document.querySelector('#red-button');
   * `;
   * const button = await session.executeScript(script);
   * const id = await button.getProperty('id');
   * // id = 'red-button'
   * @param script JavaScript to execute in browser context
   * @param args Arguments to sent to executed script
   */
  public async executeScript<T>(
    script: string,
    args: unknown[] = []
  ): Promise<T> {
    const mappedArgs = deepMap(args, (item) => {
      if (item instanceof Element) {
        return item.getWebElement();
      }
    });
    const result = await POST<T>(
      `${this.host}/session/${this.sessionId}/execute/sync`,
      {
        script,
        args: mappedArgs,
      }
    );
    return deepMap(result, (item) => {
      if (isWebElement(item)) {
        return new Element(this.host, this.sessionId, item);
      }
    }) as T;
  }

  /**
   * causes JavaScript to execute as an anonymous function. Unlike the Execute Script command, the
   * result of the function is ignored. Instead an additional argument is provided as the final
   * argument to the function. This is a function that, when called, returns its first argument
   * as the response.
   *
   * @return The script result.
   * @see {@link https://www.w3.org/TR/webdriver/#execute-async-script|WebDriver spec}
   * @section Document
   * @example
   * const script = `
   *   const [a, b, callback] = arguments;
   *   setTimeout(() => callback(a * b), 1000);
   * `;
   * const message = await session.executeAsyncScript(script, [5, 3]);
   * // message = 15
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const script = `
   *    const [element, callback] = arguments;
   *    callback(element.id);
   * `;
   * const id = await session.executeAsyncScript(script, [button]);
   * // id = 'red-button'
   * @example
   * const script = `
   *    const [callback] = arguments;
   *    callback(document.querySelector('#red-button'));
   * `;
   * const button = await session.executeAsyncScript(script);
   * const id = await button.getProperty('id');
   * // id = 'red-button'
   * @param script JavaScript to execute in browser context
   * @param args Arguments to sent to executed script
   */
  public async executeAsyncScript<T>(
    script: string,
    args: unknown[] = []
  ): Promise<T> {
    const mappedArgs = deepMap(args, (item) => {
      if (item instanceof Element) {
        return item.getWebElement();
      }
    });
    const result = await POST<T>(
      `${this.host}/session/${this.sessionId}/execute/async`,
      {
        script,
        args: mappedArgs,
      }
    );
    return deepMap(result, (item) => {
      if (isWebElement(item)) {
        return new Element(this.host, this.sessionId, item);
      }
    }) as T;
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
   * @see {@link https://www.w3.org/TR/webdriver/#get-all-cookies|WebDriver spec}
   * @section Cookies
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
   * @see {@link https://www.w3.org/TR/webdriver/#get-named-cookie|WebDriver spec}
   * @section Cookies
   * @example
   * const cookie = await session.getNamedCookie('cookieName');
   * @param name Name of the cookie object to be returned
   */
  public async getNamedCookie(name: string): Promise<Cookie> {
    return GET<Cookie>(`${this.host}/session/${this.sessionId}/cookie/${name}`);
  }

  /**
   * Adds a single cookie to the cookie store associated with the active document’s address.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#add-cookie|WebDriver spec}
   * @section Cookies
   * @example
   * await session.addCookie({ name: 'test cookie', value: 'test value' });
   * @param cookie Cookie object to add in browser for current domain
   */
  public async addCookie(cookie: Cookie): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/cookie`, { cookie });
  }

  /**
   * Delete a cookie based on its name
   *
   * @see {@link https://www.w3.org/TR/webdriver/#delete-cookie|WebDriver spec}
   * @section Cookies
   * @example
   * await session.deleteCookie('cookieName');
   * @param propertyName Cookie name to delete
   */
  public async deleteCookie(propertyName: string): Promise<void> {
    await DELETE(
      `${this.host}/session/${this.sessionId}/cookie/${propertyName}`
    );
  }

  /**
   * Delete all cookies associated with the address of the current browsing context’s active
   * document.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#delete-all-cookies|WebDriver spec}
   * @section Cookies
   * @example
   * await session.deleteAllCookies();
   *
   */
  public async deleteAllCookies(): Promise<void> {
    await DELETE(`${this.host}/session/${this.sessionId}/cookie`);
  }

  /****************************************************************************************************************
   *                                                  ACTIONS                                                     *
   *                                  https://www.w3.org/TR/webdriver/#actions                                    *
   ****************************************************************************************************************/

  /**
   * Sends virtualised device input to the web browser like keyboard or pointer events in a series of actions.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#perform-actions|WebDriver spec}
   * @section Actions
   * @example
   * await session.performActions([
   *   {
   *     type: 'none',
   *     id: 'none_id',
   *     actions: [{ type: 'pause', duration: 0 }]
   *   },
   *   {
   *     type: 'pointer',
   *     id: 'click on b field',
   *     actions: [
   *       { type: 'pause', duration: 0 },
   *       { type: 'pointerMove', x: 118, y: 121 },
   *       { type: 'pointerDown', button: 0 },
   *       { type: 'pointerUp', button: 0 }
   *     ]
   *   }
   * ]);
   * @example
   * await session.performActions([
   *   {
   *     type: 'key',
   *     id: 'type in 15',
   *     actions: [
   *       { type: 'pause', duration: 100 },
   *       { type: 'keyDown', value: '1' },
   *       { type: 'keyUp', value: '1' },
   *       { type: 'keyDown', value: '5' },
   *       { type: 'keyUp', value: '5' }
   *     ]
   *   }
   * ]);
   * @example
   * await session.performActions([
   *   {
   *     type: 'pointer',
   *     id: 'click on add button',
   *     actions: [
   *       { type: 'pointerMove', x: 1, y: 1, origin: await session.findElement('css selector', '#add') },
   *       { type: 'pointerDown', button: 0 },
   *       { type: 'pointerUp', button: 0 }
   *     ],
   *     parameters: {
   *       pointerType: 'mouse'
   *     }
   *   }
   * ]);
   * @example
   * await session.performActions([
   *   {
   *     type: 'key',
   *     id: 'key id',
   *     actions: [
   *       { type: 'keyDown', value: 'a' },
   *       { type: 'keyUp', value: 'a' },
   *       { type: 'keyDown', value: 'b' },
   *       { type: 'keyUp', value: 'b' },
   *       { type: 'keyDown', value: Key.LEFT },
   *       { type: 'keyUp', value: Key.LEFT },
   *       { type: 'keyDown', value: Key.DELETE },
   *       { type: 'keyUp', value: Key.DELETE }
   *     ]
   *   }
   * ]);
   * @param actionSequences Array with actions to be performed on the current page
   */
  public async performActions(
    actionSequences: ActionSequence[]
  ): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/actions`, {
      actions: actionSequences.map((actionSequence) => {
        if (actionSequence.type !== 'pointer') {
          return actionSequence;
        }

        return {
          ...actionSequence,
          actions: actionSequence.actions.map((action) => {
            if (
              action.type !== 'pointerMove' ||
              !action.origin ||
              action.origin === 'viewport' ||
              action.origin === 'pointer'
            ) {
              return action;
            }

            return {
              ...action,
              origin: action.origin.getWebElement(),
            };
          }),
        };
      }),
    });
  }

  /**
   * Release all the keys and pointer buttons that are currently depressed
   * @see {@link https://www.w3.org/TR/webdriver/#release-actions|WebDriver spec}
   * @section Actions
   * @example
   * await session.performActions([
   *   {
   *     type: 'key',
   *     id: 'key id',
   *     actions: [{ type: 'keyDown', value: 'a' }]
   *   }
   * ]);
   * await session.releaseActions();
   * // Now 'a' key was pressed
   */
  public async releaseActions(): Promise<void> {
    await DELETE(`${this.host}/session/${this.sessionId}/actions`);
  }

  /****************************************************************************************************************
   *                                               USER PROMPTS                                                   *
   *                               https://www.w3.org/TR/webdriver/#user-prompts                                  *
   ****************************************************************************************************************/

  /**
   * Dismiss the alert in current page
   * @see {@link https://www.w3.org/TR/webdriver/#dismiss-alert|WebDriver spec}
   * @section User prompts
   * @example
   * await session.dismissAlert();
   */
  public async dismissAlert(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/alert/dismiss`);
  }

  /**
   * Accept the alert in current page
   * @see {@link https://www.w3.org/TR/webdriver/#accept-alert|WebDriver spec}
   * @section User prompts
   * @example
   * await session.acceptAlert();
   */
  public async acceptAlert(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/alert/accept`);
  }

  /**
   * Returns the text from an alert
   * @see {@link https://www.w3.org/TR/webdriver/#get-alert-text|WebDriver spec}
   * @section User prompts
   * @example
   * const alertText = await session.getAlertText();
   */
  public async getAlertText(): Promise<string> {
    return GET<string>(`${this.host}/session/${this.sessionId}/alert/text`);
  }

  /**
   * Sets the text field of a prompt to the given value.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#send-alert-text|WebDriver spec}
   * @section User prompts
   * @example
   * await session.sendAlertText('Test');
   * @param text Text to be set in the input area of alert
   */
  public async sendAlertText(text: string): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/alert/text`, {
      text,
    });
  }

  /****************************************************************************************************************
   *                                              SCREEN CAPTURE                                                  *
   *                              https://www.w3.org/TR/webdriver/#screen-capture                                 *
   ****************************************************************************************************************/

  /**
   * Takes a screenshot of the top-level browsing context’s viewport.
   * @return The screenshot as a PNG.
   * @see {@link https://www.w3.org/TR/webdriver/#take-screenshot|WebDriver spec}
   * @section Screen capture
   * @example
   * const screenshot = await session.takeScreenshot();
   * // screenshot = Buffer containing PNG
   */
  public async takeScreenshot(): Promise<Buffer> {
    const screenshot = await GET<string>(
      `${this.host}/session/${this.sessionId}/screenshot`
    );

    return Buffer.from(screenshot, 'base64');
  }
}
