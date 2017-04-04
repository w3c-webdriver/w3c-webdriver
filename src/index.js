const request = require("request");

function findError(err, body) {
  if (err) {
    return err;
  }

  if (body.status) {
    return new Error(body.value.message);
  }

  if (typeof body.status == 'undefined') {
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

function newSession(url, desiredCapabilities) {
  return sendRequest({
    url: `${url}/session`,
    method: 'post',
    body: {
      desiredCapabilities
    }
  }).then(body => ({
    deleteSession: deleteSession.bind(null, url, body.sessionId),
    go: go.bind(null, url, body.sessionId),
    getTitle: getTitle.bind(null, url, body.sessionId),
    findElement: findElement.bind(null, url, body.sessionId)
  }));
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

function findElement(url, sessionId, cssSelector) {
  return sendRequest({
    url: `${url}/session/${sessionId}/element`,
    method: 'post',
    body: {
      using: 'css selector',
      value: cssSelector
    }
  }).then(body => ({
    sendKeys: sendKeys.bind(null, url, sessionId, body.value.ELEMENT),
    click: click.bind(null, url, sessionId, body.value.ELEMENT),
    getText: getText.bind(null, url, sessionId, body.value.ELEMENT)
  }));
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
