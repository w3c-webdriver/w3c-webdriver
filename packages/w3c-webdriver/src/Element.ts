import { LocatorStrategy } from './core';
import { GET, POST } from './rest';

const WEB_ELEMENT_IDENTIFIER = 'element-6066-11e4-a52e-4f735466cecf';

export type WebElement = {
  'element-6066-11e4-a52e-4f735466cecf': string
}

/**
 * This object represents a WebDriver element.
 */
export class Element {
  private readonly host: string;
  private readonly sessionId: string;
  private readonly elementId: string;

  constructor(host: string, sessionId: string, webElement: WebElement) {
    this.host = host;
    this.sessionId = sessionId;
    this.elementId = webElement[WEB_ELEMENT_IDENTIFIER];
  }

  /**
   * Get WebElement object of current instance
   */
  public getWebElement(): WebElement {
    return { [WEB_ELEMENT_IDENTIFIER]: this.elementId };
  }

  /****************************************************************************************************************
   *                                            ELEMENT RETRIEVAL                                                 *
   *                             https://www.w3.org/TR/webdriver/#retrieval                                       *
   ****************************************************************************************************************/

  /**
   * Search for an element on the page, starting from the referenced web element.
   * @see {@link https://www.w3.org/TR/webdriver/#find-element-from-element|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#retrieval|Element retrieval}
   * @example
   * const parent = await session.findElement('css selector', '#parent');
   * const child = await child.findElement('css selector', '#child');
   * // child = <webdriver element>
   */
  public async findElement(
    // Locator strategy
    strategy: LocatorStrategy,
    // Selector string
    selector: string
  ): Promise<Element> {
    const webElement = await POST<WebElement>(`${this.host}/session/${this.sessionId}/element/${this.elementId}/element`, {
      using: strategy,
      value: selector
    });

    return new Element(this.host, this.sessionId, webElement);
  }

  /**
   * Search for multiple elements on the page, starting from the referenced web element. The located
   * elements will be returned as a WebElement JSON objects. The table below lists the locator
   * strategies that each server should support. Elements should be returned in the order located
   * in the DOM.
   * @see {@link https://www.w3.org/TR/webdriver/#find-elements|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#element-retrieval|Element retrieval}
   * @example
   * const parent = await session.findElement('css selector', '#parent');
   * const children = await child.findElements('css selector', '#child');
   * // elements = [<webdriver element>]
   */
  public async findElements(
    // Locator strategy
    strategy: LocatorStrategy,
    // Selector string
    selector: string
  ) {
    const webElements = await POST<WebElement[]>(`${this.host}/session/${this.sessionId}/element/${this.elementId}/elements`, {
      using: strategy,
      value: selector
    });

    return webElements.map(webElement => new Element(this.host, this.sessionId, webElement));
  }

  /****************************************************************************************************************
   *                                               ELEMENT STATE                                                  *
   *                               https://www.w3.org/TR/webdriver/#state                                         *
   ****************************************************************************************************************/

  /**
   * Determines if the referenced element is selected or not.
   * This operation only makes sense on input elements of the Checkbox- and Radio Button states, or on option elements.
   * @see {@link https://www.w3.org/TR/webdriver/#is-element-selected|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#state|Element state}
   * @example
   * const checkbox = await session.findElement('css selector', '#checkbox');
   * const selected = await checkbox.isSelected();
   * // selected = true
   */
  public async isSelected(): Promise<boolean> {
    return GET<boolean>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/selected`
    );
  }

  /**
   * Returns the attribute of the referenced web element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-attribute|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#state|Element state}
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getAttribute('css');
   */
  public async getAttribute(propertyName: string): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/attribute/${propertyName}`
    );
  }

  /**
   * Returns the property of the referenced web element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-attribute|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#state|Element state}
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getProperty('class');
   */
  public async getProperty(propertyName: string): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/property/${propertyName}`
    );
  }

  /**
   * Returns the computed value of the given CSS property for the element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-css-value|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#state|Element state}
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getCssValue('background-color');
   * // backgroundColor = 'rgba(255, 0, 0, 1)'
   */
  public async getCssValue(propertyName: string): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/css/${propertyName}`
    );
  }

  /**
   * Returns the visible text for the element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-text|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#state|Element state}
   * @example
   * const result = await session.findElement('css selector', '#result');
   * const text = await result.getText();
   */
  public async getText(): Promise<string> {
    return GET<string>(`${this.host}/session/${this.sessionId}/element/${this.elementId}/text`);
  }

  /**
   * Returns the tagName of a Element
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-tag-name|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#state|Element state}
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getTagName();
   */
  public async getTagName(): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/name`
    );
  }

  /****************************************************************************************************************
   *                                            ELEMENT INTERACTION                                               *
   *                            https://www.w3.org/TR/webdriver/#element-interaction                              *
   ****************************************************************************************************************/

  /**
   * Click on an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-click|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#element-interaction|Element interaction}
   * @example
   * const submitButton = await session.findElement('css selector', 'button[type="submit"]');
   * await submitButton.click();
   */
  public async click(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/element/${this.elementId}/click`, {});
  }

  /**
   * Clear content of an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-clear|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#element-interaction|Element interaction}
   * @example
   * const fieldA = await session.findElement('css selector', '#a');
   * await submitButton.clear();
   */
  public async clear(): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/element/${this.elementId}/clear`, {});
  }

  /**
   * Send a sequence of key strokes to an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-send-keys|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#element-interaction|Element interaction}
   * @example
   * const input = await session.findElement('css selector', '[name="first-name"]');
   * await input.sendKeys('Hello World');
   */
  public async sendKeys(text: string): Promise<void> {
    await POST(`${this.host}/session/${this.sessionId}/element/${this.elementId}/value`, { text });
  }

  /****************************************************************************************************************
   *                                              SCREEN CAPTURE                                                  *
   *                              https://www.w3.org/TR/webdriver/#screen-capture                                 *
   ****************************************************************************************************************/

  /**
   * Takes a screenshot of the visible region encompassed by the bounding rectangle of an element
   * @return The screenshot as a PNG.
   * @see {@link https://www.w3.org/TR/webdriver/#take-screenshot|WebDriver spec}
   * @section {@link https://www.w3.org/TR/webdriver/#screen-capture|Screen capture}
   * @example
   * const screenshot = await session.takeScreenshot();
   * // screenshot = Buffer containing PNG
   */
  public async takeScreenshot(): Promise<Buffer> {
    const screenshot = await GET<string>(`${this.host}/session/${this.sessionId}/element/${this.elementId}/screenshot`);

    return Buffer.from(screenshot, 'base64');
  }
}
