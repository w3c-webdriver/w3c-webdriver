const utils = require('./utils');
const Element = require('./element');

class Session {
    constructor(options) {
        this.options = Object.assign({
            host: 'localhost',
            port: 4444,
            capabilities: {}
        }, options);
        this.options.url = `http://${this.options.host}${this.options.port ? `:${this.options.port}` : ''}`;
    }

    sendCommand(method, uri, body) {
        return utils.sendRequest(method, `${this.options.url}${utils.formatUri(uri)}`, body);
    }

    sendSessionCommand(method, uri, body) {
        if (!this.sessionId) throw new Error('Session is not started yet. Use start() method for that.');
        return this.sendCommand(method, `session/${this.sessionId}${utils.formatUri(uri)}`, body)
      .then(responseBody => responseBody.value);
    }

    start() {
        return this.sendCommand('POST', 'session', {
            desiredCapabilities: this.options.capabilities
        }).then((body) => {
            this.sessionId = body.sessionId;
        });
    }

    end() {
        return this.sendSessionCommand('DELETE');
    }

    url(pageUrl) {
        return this.sendSessionCommand('POST', 'url', { url: pageUrl });
    }

    title() {
        return this.sendSessionCommand('GET', 'title');
    }

    findElement(strategy, selector) {
        return this.sendSessionCommand('POST', 'element', {
            using: strategy,
            value: selector
        }).then(value => new Element(this, value.ELEMENT));
    }
}

module.exports = Session;
