import { GET, POST } from './rest';

/**
 * This object represents a WebDriver element.
 */
export class Element {
  private readonly host: string;
  private readonly sessionId: string;
  private readonly elementId: string;

  constructor(host: string, sessionId: string, elementId: string) {
    this.host = host;
    this.sessionId = sessionId;
    this.elementId = elementId;
  }

  /**
   * Send a sequence of key strokes to an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-send-keys|WebDriver spec}
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
   *     await session.go('http://localhost:8080');
   *     const input = await session.findElement('css selector', '[name="first-name"]');
   *     await a.sendKeys('Hello World');
   *   } catch (err) {
   *     console.log(err.stack);
   *   } finally {
   *     session.close();
   *   }
   * })();
   */
  public async sendKeys(text: string): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/element/${this.elementId}/value`, { text });
  }

  /**
   * Click on an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-click|WebDriver spec}
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
   *     await session.go('http://localhost:8080');
   *     const submitButton = await session.findElement('css selector', 'button[type="submit"]');
   *     await submitButton.click();
   *   } catch (err) {
   *     console.log(err.stack);
   *   } finally {
   *     session.close();
   *   }
   * })();
   */
  public async click(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/element/${this.elementId}/click`, {});
  }

  /**
   * Returns the visible text for the element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-text|WebDriver spec}
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
   *     await session.go('http://localhost:8080');
   *     const result = await session.findElement('css selector', '#result');
   *     const text = await result.getText();
   *     // test = <result>
   *   } catch (err) {
   *     console.log(err.stack);
   *   } finally {
   *     session.close();
   *   }
   * })();
   */
  public async getText(): Promise<string> {
    return GET<string>(`${this.host}/session/${this.sessionId}/element/${this.elementId}/text`);
  }

  /**
   * Returns the computed value of the given CSS property for the element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-css-value|WebDriver spec}
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
   *     await session.go('http://localhost:8080');
   *     const button = await session.findElement('css selector', '#red-button');
   *     const backgroundColor = await button.getCss('background-color');
   *     // backgroundColor = 'rgba(255, 0, 0, 1)'
   *   } catch (err) {
   *     console.log(err.stack);
   *   } finally {
   *     session.close();
   *   }
   * })();
   */
  public async getCss(propertyName: string): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/css/${propertyName}`
    );
  }
}
