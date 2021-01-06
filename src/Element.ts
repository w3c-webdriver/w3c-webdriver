import { ElementRect, LocatorStrategy } from './core';
import { GET, POST } from './rest';

const WEB_ELEMENT_IDENTIFIER = 'element-6066-11e4-a52e-4f735466cecf';

/**
 * @internal
 */
export type WebElement = {
  'element-6066-11e4-a52e-4f735466cecf': string;
};

/**
 * @internal
 * @param item element to check
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isWebElement(item: unknown): item is WebElement {
  if (!item || typeof item !== 'object' || item === null) {
    return false;
  }

  return WEB_ELEMENT_IDENTIFIER in item;
}

/**
 * This object represents a WebDriver element.
 * @section Elements
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
   * @internal
   */
  public getWebElement(): WebElement {
    return { [WEB_ELEMENT_IDENTIFIER]: this.elementId };
  }

  /****************************************************************************************************************
   *                                                ELEMENTS                                                      *
   *                             https://www.w3.org/TR/webdriver/#elements                                        *
   ****************************************************************************************************************/

  /**
   * Search for an element on the page, starting from the referenced web element.
   * @see {@link https://www.w3.org/TR/webdriver/#find-element-from-element|WebDriver spec}
   * @section Elements
   * @example
   * const parent = await session.findElement('css selector', '#parent');
   * const child = await child.findElement('css selector', '#child');
   * // child = <webdriver element>
   * @param strategy Strategy for element lookup
   * @param selector Selector string
   */
  public async findElement(
    strategy: LocatorStrategy,
    selector: string
  ): Promise<Element> {
    const webElement = await POST<WebElement>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/element`,
      {
        using: strategy,
        value: selector,
      }
    );

    return new Element(this.host, this.sessionId, webElement);
  }

  /**
   * Search for multiple elements on the page, starting from the referenced web element. The located
   * elements will be returned as a WebElement JSON objects. The table below lists the locator
   * strategies that each server should support. Elements should be returned in the order located
   * in the DOM.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#find-elements-from-element|WebDriver spec}
   * @section Elements
   * @example
   * const parent = await session.findElement('css selector', '#parent');
   * const children = await child.findElements('css selector', '#child');
   * // elements = [<webdriver element>]
   * @param strategy Strategy for emelent lookup
   * @param selector Selector string
   */
  public async findElements(
    strategy: LocatorStrategy,
    selector: string
  ): Promise<Element[]> {
    const webElements = await POST<WebElement[]>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/elements`,
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
   * Determines if the referenced element is selected or not.
   * This operation only makes sense on input elements of the Checkbox- and Radio Button states, or on option elements.
   * @see {@link https://www.w3.org/TR/webdriver/#is-element-selected|WebDriver spec}
   * @section Elements
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
   * Returns the attribute value of the referenced web element.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-attribute|WebDriver spec}
   * @section Elements
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getAttribute('css');
   * @param attributeName Element attribute name
   */
  public async getAttribute(attributeName: string): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/attribute/${attributeName}`
    );
  }

  /**
   * Returns the property of the referenced web element.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-property|WebDriver spec}
   * @section Elements
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getProperty('class');
   * @param propertyName Element property name
   */
  public async getProperty(propertyName: string): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/property/${propertyName}`
    );
  }

  /**
   * Returns the computed value of the given CSS property for the element.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-css-value|WebDriver spec}
   * @section Elements
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getCssValue('background-color');
   * // backgroundColor = 'rgba(255, 0, 0, 1)'
   * @param propertyName Name of CSS property
   */
  public async getCssValue(propertyName: string): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/css/${propertyName}`
    );
  }

  /**
   * Returns the visible text for the element.
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-text|WebDriver spec}
   * @section Elements
   * @example
   * const result = await session.findElement('css selector', '#result');
   * const text = await result.getText();
   */
  public async getText(): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/text`
    );
  }

  /**
   * Returns the tagName of a Element
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-tag-name|WebDriver spec}
   * @section Elements
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const backgroundColor = await button.getTagName();
   */
  public async getTagName(): Promise<string> {
    return GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/name`
    );
  }

  /**
   * Returns the dimensions and coordinates of the referenced element
   * @see {@link https://www.w3.org/TR/webdriver/#get-element-rect|WebDriver spec}
   * @section Elements
   * @example
   * const button = await session.findElement('css selector', '#red-button');
   * const rect = await button.getRect();
   * // rect = { x: 10, y: 100, width: 300, height: 50 }
   */
  public async getRect(): Promise<ElementRect> {
    return GET<ElementRect>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/rect`
    );
  }

  /**
   * Determines if the referenced element is enabled or not.
   * @see {@link https://www.w3.org/TR/webdriver/#is-element-enabled|WebDriver spec}
   * @section Elements
   * @example
   * const inputField = await session.findElement('css selector', '#disabled');
   * const isElementEnabled = await inputField.isEnabled();
   */
  public async isEnabled(): Promise<boolean> {
    return GET<boolean>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/enabled`
    );
  }

  /**
   * Click on an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-click|WebDriver spec}
   * @section Elements
   * @example
   * const submitButton = await session.findElement('css selector', 'button[type="submit"]');
   * await submitButton.click();
   */
  public async click(): Promise<void> {
    await POST(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/click`,
      {}
    );
  }

  /**
   * Clear content of an element.
   * @see {@link https://www.w3.org/TR/webdriver/#element-clear|WebDriver spec}
   * @section Elements
   * @example
   * const fieldA = await session.findElement('css selector', '#a');
   * await submitButton.clear();
   */
  public async clear(): Promise<void> {
    await POST(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/clear`,
      {}
    );
  }

  /**
   * Send a sequence of key strokes to an element.
   *
   * @see {@link https://www.w3.org/TR/webdriver/#element-send-keys|WebDriver spec}
   * @section Elements
   * @example
   * const input = await session.findElement('css selector', '[name="first-name"]');
   * await input.sendKeys('Hello World');
   * @param text Input text to be typed in element
   */
  public async sendKeys(text: string): Promise<void> {
    await POST(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/value`,
      { text }
    );
  }

  /****************************************************************************************************************
   *                                              SCREEN CAPTURE                                                  *
   *                              https://www.w3.org/TR/webdriver/#screen-capture                                 *
   ****************************************************************************************************************/

  /**
   * Takes a screenshot of the visible region encompassed by the bounding rectangle of an element
   * @return The screenshot as a PNG.
   * @see {@link https://www.w3.org/TR/webdriver/#take-element-screenshot|WebDriver spec}
   * @section Screen capture
   * @example
   * const screenshot = await session.takeScreenshot();
   * // screenshot = Buffer containing PNG
   */
  public async takeScreenshot(): Promise<Buffer> {
    const screenshot = await GET<string>(
      `${this.host}/session/${this.sessionId}/element/${this.elementId}/screenshot`
    );

    return Buffer.from(screenshot, 'base64');
  }
}
