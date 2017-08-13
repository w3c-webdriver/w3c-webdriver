const { POST } = require('./rest');
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
    newSession: (url, options) => POST(`${url}/session`, options).then(body => sessionFactory(url, body.sessionId))
};
