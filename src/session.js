const { GET, POST, DELETE } = require('./rest');
const elementFactory = require('./element');

module.exports = (url, sessionId) => (
    /**
     * This object represents a WebDriver session.
     * @typedef {Object} Session
     * @property {Session.delete} delete - Delete the session.
     * @property {Session.go} go - Navigate to a new URL.
     * @property {Session.getTitle} getTitle - Get the current page title.
     * @property {Session.findElement} findElement - Search for an element on the page,
     *  starting from the document root.
     */
    {
        /**
         * Delete the session.
         * @name Session.delete
         * @function
         * @returns {Promise}
         * @see {@link https://www.w3.org/TR/webdriver/#delete-session|WebDriver spec}
         * @example
         * await session.delete();
         */
        delete: () => DELETE(`${url}/session/${sessionId}`),
        /**
         * Navigate to a new URL.
         * @name Session.go
         * @function
         * @param {string} targetUrl The URL to navigate to.
         * @returns {Promise}
         * @see {@link https://www.w3.org/TR/webdriver/#go|WebDriver spec}
         * @example
         * await session.go('http://localhost:8087');
         */
        go: targetUrl => POST(`${url}/session/${sessionId}/url`, { url: targetUrl }),
        /**
         * Get the current page title.
         * @name Session.getTitle
         * @function
         * @returns {Promise<string>} The current page title.
         * @see {@link https://www.w3.org/TR/webdriver/#get-title|WebDriver spec}
         * @example
         * const title = await session.getTitle();
         */
        getTitle: () => GET(`${url}/session/${sessionId}/title`).then(body => body.value),
        /**
         * Search for an element on the page, starting from the document root.
         * @name Session.findElement
         * @function
         * @param {string} strategy Locator strategy
         * ("css selector", "link text", "partial link text", "tag name", "xpath").
         * @param {string} selector Selector string.
         * @returns {Promise<Element>}
         * @see {@link https://www.w3.org/TR/webdriver/#find-element|WebDriver spec}
         * @example
         * const element = await session.findElement('css', 'h2');
         */
        findElement: (strategy, selector) => POST(`${url}/session/${sessionId}/element`, {
            using: strategy,
            value: selector
        }).then(body => elementFactory(url, sessionId, body.value.ELEMENT))
    }
);
