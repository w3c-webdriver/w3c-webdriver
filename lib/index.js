'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.status = exports.newSession = undefined;

var _rest = require('./rest');

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This function creates a new WebDriver session.
 * @param {string} url WebDriver server URL
 * @param {object} options configuration object for creating the session
 * @returns {Promise<Session>} session
 * @see {@link https://www.w3.org/TR/webdriver/#new-session|WebDriver spec}
 * @example
 * const session = await webdriver.newSession('http://localhost:4444', {
 *     desiredCapabilities: {
 *         browserName: 'Chrome'
 *     }
 * });
 */
const newSession = exports.newSession = (url, options) => (0, _rest.POST)(`${url}/session`, options).then(body => (0, _session2.default)(url,
// JSON Wire   || W3C Web Driver
body.sessionId || body.value.sessionId, { JsonWire: !!body.sessionId }));
/**
 * This function queries the WebDriver server's current status.
 * @param {string} url WebDriver server URL
 * @returns {Promise<Object>} status
 * @see {@link https://www.w3.org/TR/webdriver/#status|WebDriver spec}
 * @example
 * await webdriver.status('http://localhost:4444');
 * // {
 * //   build: { version: '1.2.0' },
 * //   os: { name: 'mac', version: 'unknown', arch: '64bit' }
 * // }
 */
const status = exports.status = url => (0, _rest.GET)(`${url}/status`).then(body => body.value);