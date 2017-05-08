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

function findDOMElement(sendSessionCommand, strategy, selector) {
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
    }).catch(() => undefined);
}

async function findElement(sendSessionCommand, strategy, selector, maxWaitTime = 0) {
    const QUERY_INTERVAL = 20;
    let totalTime = 0;
    let result = await findDOMElement(sendSessionCommand, strategy, selector);

    while (!result && totalTime <= maxWaitTime) {
        await utils.wait(QUERY_INTERVAL).then(async () => {
            result = await findDOMElement(sendSessionCommand, strategy, selector);
        });
        totalTime += QUERY_INTERVAL;
    }
    return result;
}

module.exports = {
    findElement
};
