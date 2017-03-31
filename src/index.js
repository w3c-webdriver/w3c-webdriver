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
    deleteSession: deleteSession.bind(null, url, body.sessionId)
  }));
}

function deleteSession(url, sessionId) {
  return sendRequest({
    url: `${url}/session/${sessionId}`,
    method: 'delete',
    body: {}
  })
}

module.exports = newSession;
