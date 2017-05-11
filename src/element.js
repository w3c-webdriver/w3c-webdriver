'use strict';

const utils = require('./utils');

function sendCommand(sendSessionCommand, elementId, method, uri, body) {
    return sendSessionCommand(method, `element/${elementId}${utils.formatUri(uri)}`, body);
}

function sendKeys(sendElementCommand, text) {
    return sendElementCommand('POST', 'value', {
        value: [text]
    });
}

function click(sendElementCommand) {
    return sendElementCommand('POST', 'click');
}

function getText(sendElementCommand) {
    return sendElementCommand('GET', 'text');
}

function getCss(sendElementCommand, propertyName) {
    return sendElementCommand('GET', `css/${propertyName}`);
}

function findElement(sendSessionCommand, strategy, selector) {
    return sendSessionCommand('POST', 'element', {
        using: strategy,
        value: selector
    }).then((body) => {
        const sendElementCommand = sendCommand.bind(null, sendSessionCommand, body.ELEMENT);

        /**
         * This object represents a WebDriver element.
         * @typedef {Object} Element
         * @property {Element.sendKeys} sendKeys - Send a sequence of key strokes to an element.
         * @property {Element.click} click - Click on an element.
         * @property {Element.getText} getText - Returns the visible text for the element.
         * @property {Element.getCss} getCss - Returns the computed value of the given CSS
         * property for the element.
         */
        return {
            /**
             * Send a sequence of key strokes to an element.
             * @name Element.sendKeys
             * @function
             * @param {string} text The sequence of keys to type.
             * @returns {Promise}
             * @see {@link https://www.w3.org/TR/webdriver/#element-send-keys|WebDriver spec}
             * @example
             * const input = await session.findElement('css', '[name="first-name"]');
               await a.sendKeys('Hello World');
             */
            sendKeys: sendKeys.bind(null, sendElementCommand),
            /**
             * Click on an element.
             * @name Element.click
             * @function
             * @returns {Promise}
             * @see {@link https://www.w3.org/TR/webdriver/#element-click|WebDriver spec}
             * @example
             * const submitButton = await session.findElement('css', 'button[type="submit"]');
               await submitButton.click();
             */
            click: click.bind(null, sendElementCommand),
            /**
             * Returns the visible text for the element.
             * @name Element.getText
             * @function
             * @returns {Promise<string>} Visible text for the element.
             * @see {@link https://www.w3.org/TR/webdriver/#get-element-text|WebDriver spec}
             * @example
             * const result = await session.findElement('css', '#result');
               const text = await result.getText();
             */
            getText: getText.bind(null, sendElementCommand),
            /**
             * Returns the computed value of the given CSS property for the element.
             * @name Element.getCss
             * @function
             * @param {string} propertyName CSS property.
             * @returns {Promise<string>} Computed CSS property value for the element.
             * @see {@link https://www.w3.org/TR/webdriver/#get-element-css-value|WebDriver spec}
             * @example
             * const button = await session.findElement('css', '#red-button');
               const backgroundColor = await button.getCss('background-color');
             */
            getCss: getCss.bind(null, sendElementCommand)
        };
    });
}

module.exports = {
    findElement
};
