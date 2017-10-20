'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rest = require('./rest');

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (url, sessionId, { JsonWire }) => (
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
  delete: () => (0, _rest.DELETE)(`${url}/session/${sessionId}`),

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
  go: targetUrl => (0, _rest.POST)(`${url}/session/${sessionId}/url`, { url: targetUrl }),

  /**
       * Get the current page title.
       * @name Session.getTitle
       * @function
       * @returns {Promise<string>} The current page title.
       * @see {@link https://www.w3.org/TR/webdriver/#get-title|WebDriver spec}
       * @example
       * const title = await session.getTitle();
       */
  getTitle: () => (0, _rest.GET)(`${url}/session/${sessionId}/title`).then(body => body.value),

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
  findElement: (strategy, selector) => (0, _rest.POST)(`${url}/session/${sessionId}/element`, {
    using: strategy,
    value: selector
  }).then(body => (0, _element2.default)(url, sessionId,
  // JSON Wire       || Web Driver
  body.value.ELEMENT || Object.values(body.value)[0], { JsonWire })),

  /**
   * Gets timeout durations associated with the current session.
   * @name Session.getTimeout
   * @function
   * @return {Promise<object>} - Timeout durations associated with the current session
   * in milliseconds.
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#get-timeouts|WebDriver spec}
   * @example
   * const timeout = await session.getTimeout();
   * // {
   * //  script: 30000,
   * //  pageLoad: 60000,
   * //  implicit: 40000
   * // }
   */
  getTimeout: () => (0, _rest.GET)(`${url}/session/${sessionId}/timeouts`).then(body => body.value),

  /**
   * Configure the amount of time that a particular type of operation can execute for before
   * they are aborted and a |Timeout| error is returned to the client.
   * @name Session.setTimeout
   * @function
   * @param {object} timeouts - Timout configuration object with values in milliseconds.
   * @param {number} timeouts.script - Session script timeout - Determines when to interrupt
   *  a script that is being evaluated.
   * @param {number} timeouts.pageLoad - Session page load timeout - Provides the timeout
   *  limit used to interrupt navigation of the browsing context.
   * @param {number} timeouts.implicit - Session implicit wait timeout -Gives the timeout
   *   of when to abort locating an element.
   * @return {Promise}
   * @see {@link https://w3c.github.io/webdriver/webdriver-spec.html#set-timeouts|WebDriver spec}
   * @example
   * await session.setTimeout({
   *   script: 30000,
   *   pageLoad: 60000,
   *   implicit: 40000
   * });
   */
  setTimeout: ({ script, pageLoad, implicit }) => (0, _rest.POST)(`${url}/session/${sessionId}/timeouts`, {
    script,
    pageLoad,
    implicit
  })
});