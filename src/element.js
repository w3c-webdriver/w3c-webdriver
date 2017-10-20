import { GET, POST } from './rest';

export default (url, sessionId, elementId, { JsonWire }) => (
  /**
     * This object represents a WebDriver element.
     * @typedef {Object} Element
     * @property {Element.sendKeys} sendKeys - Send a sequence of key strokes to an element.
     * @property {Element.click} click - Click on an element.
     * @property {Element.getText} getText - Returns the visible text for the element.
     * @property {Element.getCss} getCss - Returns the computed value of the given CSS
     * property for the element.
     */
  ({
    /**
         * Send a sequence of key strokes to an element.
         * @name Element.sendKeys
         * @function
         * @param {string} text The sequence of keys to type.
         * @returns {Promise}
         * @see {@link https://www.w3.org/TR/webdriver/#element-send-keys|WebDriver spec}
         * @example
         * const input = await session.findElement('css', '[name="first-name"]');
         * await a.sendKeys('Hello World');
         */
    sendKeys: text => POST(`${url}/session/${sessionId}/element/${elementId}/value`, !JsonWire ? { text } : { value: [text] }),

    /**
         * Click on an element.
         * @name Element.click
         * @function
         * @returns {Promise}
         * @see {@link https://www.w3.org/TR/webdriver/#element-click|WebDriver spec}
         * @example
         * const submitButton = await session.findElement('css', 'button[type="submit"]');
         * await submitButton.click();
         */
    click: () => POST(`${url}/session/${sessionId}/element/${elementId}/click`, {}),

    /**
         * Returns the visible text for the element.
         * @name Element.getText
         * @function
         * @returns {Promise<string>} Visible text for the element.
         * @see {@link https://www.w3.org/TR/webdriver/#get-element-text|WebDriver spec}
         * @example
         * const result = await session.findElement('css', '#result');
         * const text = await result.getText();
         */
    getText: () => GET(`${url}/session/${sessionId}/element/${elementId}/text`).then(body => body.value),

    /**
         * Returns the computed value of the given CSS property for the element.
         * @name Element.getCss
         * @function
         * @param {string} propertyName CSS property.
         * @returns {Promise<string>} Computed CSS property value for the element.
         * @see {@link https://www.w3.org/TR/webdriver/#get-element-css-value|WebDriver spec}
         * @example
         * const button = await session.findElement('css', '#red-button');
         * const backgroundColor = await button.getCss('background-color');
         */
    getCss: propertyName => GET(`${url}/session/${sessionId}/element/${elementId}/css/${propertyName}`).then(body => body.value)
  })
);
