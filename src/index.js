const { GET, POST } = require('./rest');
const sessionFactory = require('./session');

module.exports = {
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
    newSession: (url, options) => POST(`${url}/session`, options).then(body => sessionFactory(url, body.sessionId)),
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
    status: url => GET(`${url}/status`).then(body => body.value)
};
