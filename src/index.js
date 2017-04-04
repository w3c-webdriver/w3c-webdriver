const request = require("request");

function findError(err, body) {
  if (err) {
    return err;
  }

  if (body.status) {
    return new Error(body.value.message);
  }

  if (typeof body.status === 'undefined') {
    return new Error('unknown command during sending request: ' + body);
  }
}

function sendRequest(options) {
  return new Promise((resolve, reject) => {
    request({
      url: options.url,
      method: options.method,
      json: true,
      body: options.body
    }, (err, response, body) => {
      const error = findError(err, body);

      if (error) {
        reject(error);
        return;
      }

      resolve(body);
    });
  });
}

class Session {
  constructor(url, body) {
    this.deleteSession = deleteSession.bind(null, url, body.sessionId);
    this.go = go.bind(null, url, body.sessionId);
    this.getTitle = getTitle.bind(null, url, body.sessionId);
    this.findElement = findElement.bind(null, url, body.sessionId);
  }
}

function newSession(url, desiredCapabilities) {
  return sendRequest({
    url: `${url}/session`,
    method: 'post',
    body: {
      desiredCapabilities
    }
  }).then(body => new Session(url, body));
}

function deleteSession(url, sessionId) {
  return sendRequest({
    url: `${url}/session/${sessionId}`,
    method: 'delete'
  });
}

function go(url, sessionId, targetUrl) {
  return sendRequest({
    url: `${url}/session/${sessionId}/url`,
    method: 'post',
    body: {
      url: targetUrl
    }
  });
}

function getTitle(url, sessionId) {
  return sendRequest({
    url: `${url}/session/${sessionId}/title`,
    method: 'get'
  }).then(body => body.value);
}

class Element {
  constructor(url, sessionId, body) {
    this.sendKeys = sendKeys.bind(null, url, sessionId, body.value.ELEMENT);
    this.click = click.bind(null, url, sessionId, body.value.ELEMENT);
    this.getText = getText.bind(null, url, sessionId, body.value.ELEMENT);
  }
}

function findElement(url, sessionId, cssSelector) {
  return sendRequest({
    url: `${url}/session/${sessionId}/element`,
    method: 'post',
    body: {
      using: 'css selector',
      value: cssSelector
    }
  }).then(body => new Element(url, sessionId, body));
}

function sendKeys(url, sessionId, elementId, text) {
  return sendRequest({
    url: `${url}/session/${sessionId}/element/${elementId}/value`,
    method: 'post',
    body: {
      value: [text]
    }
  });
}

function click(url, sessionId, elementId) {
  return sendRequest({
    url: `${url}/session/${sessionId}/element/${elementId}/click`,
    method: 'post'
  });
}

function getText(url, sessionId, elementId) {
  return sendRequest({
    url: `${url}/session/${sessionId}/element/${elementId}/text`,
    method: 'get'
  }).then(body => body.value);
}

module.exports = newSession;
