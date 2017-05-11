'use strict';

const utils = require('./utils');
const Element = require('./element');

function sendCommand(baseUrl, sessionId, method, uri, body) {
    return utils.sendRequest(method, `${baseUrl}/session/${sessionId}${utils.formatUri(uri)}`, body)
        .then(responseBody => responseBody.value);
}

function deleteSession(sendSessionCommand) {
    return sendSessionCommand('DELETE');
}

function go(sendSessionCommand, targetUrl) {
    return sendSessionCommand('POST', 'url', {
        url: targetUrl
    });
}

function getTitle(sendSessionCommand) {
    return sendSessionCommand('GET', 'title');
}

/**
 * This function creates a new WebDriver session.
 * @param {string} url WebDriver server URL
 * @param {object} options configuration object for creating the session
 * @returns {Promise<Session>} session
 * @see {@link https://www.w3.org/TR/webdriver/#new-session|WebDriver spec}
 */
function newSession(url, options) {
    return utils.sendRequest('POST', `${url}/session`, options).then((body) => {
        const sendSessionCommand = sendCommand.bind(null, url, body.sessionId);

        /**
         * This object represents a WebDriver session.
         * @typedef {Object} Session
         * @property {Session.delete} delete - Delete the session.
         * @property {Session.go} go - Navigate to a new URL.
         * @property {Session.getTitle} getTitle - Get the current page title.
         * @property {Session.findElement} findElement - Search for an element on the page,
         *  starting from the document root.
         */
        return {
            /**
             * Delete the session.
             * @name Session.delete
             * @function
             * @returns {Promise}
             * @see {@link https://www.w3.org/TR/webdriver/#delete-session|WebDriver spec}
             */
            delete: deleteSession.bind(null, sendSessionCommand),
            /**
             * Navigate to a new URL.
             * @name Session.go
             * @function
             * @param {string} targetUrl The URL to navigate to.
             * @returns {Promise}
             * @see {@link https://www.w3.org/TR/webdriver/#go|WebDriver spec}
             */
            go: go.bind(null, sendSessionCommand),
            /**
             * Get the current page title.
             * @name Session.getTitle
             * @function
             * @returns {Promise<string>} The current page title.
             * @see {@link https://www.w3.org/TR/webdriver/#get-title|WebDriver spec}
             */
            getTitle: getTitle.bind(null, sendSessionCommand),
            /**
             * Search for an element on the page, starting from the document root.
             * @name Session.findElement
             * @function
             * @param {string} strategy Locator strategy
             * ("css selector", "link text", "partial link text", "tag name", "xpath").
             * @param {string} selector Selector string.
             * @returns {Promise<Element>}
             * @see {@link https://www.w3.org/TR/webdriver/#find-element|WebDriver spec}
             */
            findElement: Element.findElement.bind(null, sendSessionCommand)
        };
    });
}

module.exports = {
    newSession
};
