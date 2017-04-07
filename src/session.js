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

function newSession(url, desiredCapabilities) {
    return utils.sendRequest('POST', `${url}/session`, {
        desiredCapabilities
    }).then((body) => {
        const sendSessionCommand = sendCommand.bind(null, url, body.sessionId);

        return {
            delete: deleteSession.bind(null, sendSessionCommand),
            go: go.bind(null, sendSessionCommand),
            getTitle: getTitle.bind(null, sendSessionCommand),
            findElement: Element.findElement.bind(null, sendSessionCommand)
        };
    });
}

module.exports = {
    newSession
};
