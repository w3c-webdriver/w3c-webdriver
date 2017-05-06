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
        return {
            sendKeys: sendKeys.bind(null, sendElementCommand),
            click: click.bind(null, sendElementCommand),
            getText: getText.bind(null, sendElementCommand),
            getCss: getCss.bind(null, sendElementCommand)
        };
    });
}

module.exports = {
    findElement
};
