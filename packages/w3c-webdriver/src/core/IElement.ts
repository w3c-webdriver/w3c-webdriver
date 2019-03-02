/**
 * This object represents a WebDriver element.
 */
export interface IElement {
  /**
   * Send a sequence of key strokes to an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-send-keys|WebDriver spec}
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
   *     const input = await session.findElement('css selector', '[name="first-name"]');
   *     await a.sendKeys('Hello World');
   *   } catch (err) {
   *     console.log(err.stack);
   *   } finally {
   *     session.deleteSession();
   *   }
   * })();
   */
  sendKeys(text: string): Promise<void>;

  /**
   * Click on an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-click|WebDriver spec}
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
   *     const submitButton = await session.findElement('css selector', 'button[type="submit"]');
   *     await submitButton.click();
   *   } catch (err) {
   *     console.log(err.stack);
   *   } finally {
   *     session.deleteSession();
   *   }
   * })();
   */
  click(): Promise<void>;

  /**
   * Returns the visible text for the element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-text|WebDriver spec}
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
   *     const result = await session.findElement('css selector', '#result');
   *     const text = await result.getText();
   *     // test = <result>
   *   } catch (err) {
   *     console.log(err.stack);
   *   } finally {
   *     session.deleteSession();
   *   }
   * })();
   */
  getText(): Promise<string>;

  /**
   * Returns the computed value of the given CSS property for the element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-css-value|WebDriver spec}
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
   *     const button = await session.findElement('css selector', '#red-button');
   *     const backgroundColor = await button.getCss('background-color');
   *     // backgroundColor = 'rgba(255, 0, 0, 1)'
   *   } catch (err) {
   *     console.log(err.stack);
   *   } finally {
   *     session.deleteSession();
   *   }
   * })();
   */
  getCss(propertyName: string): Promise<string>;
}
