const request = require('request');

function findError(err, body) {
  if (err) {
    return err;
  }

  if (body.status) {
    return new Error(body.value.message);
  }

  if (typeof body.status === 'undefined') {
    return new Error(`Unknown command during sending request: ${body}`);
  }

  return null;
}

function sendRequest(method, url, body) {
  return new Promise((resolve, reject) => {
    request({
      url,
      method,
      json: true,
      body
    }, (err, response, responseBody) => {
      const error = findError(err, responseBody);

      if (error) {
        reject(error);
        return;
      }

      resolve(responseBody);
    });
  });
}

function formatUri(uri) {
  if (!uri) return '';
  if (uri.startsWith('/')) return uri;
  return `/${uri}`;
}

module.exports = {
  sendRequest,
  formatUri
};
