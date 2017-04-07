const utils = require('./utils');

class Element {
    constructor(session, elementId) {
        this.session = session;
        this.elementId = elementId;
    }

    sendElementCommand(method, uri, body) {
        return this.session.sendSessionCommand(method, `element/${this.elementId}${utils.formatUri(uri)}`, body);
    }

    text() {
        return this.sendElementCommand('GET', 'text');
    }

    click() {
        return this.sendElementCommand('POST', 'click');
    }

    sendKeys(text) {
        return this.sendElementCommand('POST', 'value', { value: [text] });
    }
}

module.exports = Element;
