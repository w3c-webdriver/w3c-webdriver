const request = require("request");

function sendRequest(options) {
  return new Promise((resolve, reject) => {
    request({
      url: options.url,
      method: options.method,
      json: true,
      body: options.body
    }, (err, response, body) => {
      if (err) {
        reject(err);
        return;
      }

      if (body.status) {
        reject(new Error(body.value.message));
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
  }).then(body => body.value.ELEMENT)
}

module.exports = newSession;
