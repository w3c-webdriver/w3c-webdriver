const util = require('util');
const http = require('http');
const urlParser = require('url');

function findError(err, response, body) {
  if (err) {
    return err;
  }

  if (response.statusCode !== 200 || (body.value && body.value.error)) {
    return new Error(`WebDriverError: status: ${response.statusCode} ${util.inspect(body, false, 10, true)}`);
  }

  return null;
}

function sendRequest(method, url, body) {
  const jsonBody = JSON.stringify(body);
  const urlParts = urlParser.parse(url);
  const options = {
    hostname: urlParts.hostname,
    port: urlParts.port,
    path: urlParts.path,
    method,
    headers: {}
  };

  if (body) {
    options.headers['Content-Length'] = Buffer.byteLength(jsonBody);
    options.headers['Content-Type'] = 'application/json';
  }


  return new Promise((resolve, reject) => {
    const request = http.request(options, (response) => {
      const chunks = [];
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        let responseBody;
        if (response.statusCode !== 200) {
          reject(new Error([
            'HTTPError',
            '\nrequest:',
            util.inspect(Object.assign({}, options, { body }), false, null),
            '\nresponse:',
            util.inspect({
              statusCode: response.statusCode,
              body: chunks.join('')
            }, false, null)
          ].join(' ')));
        }
        try {
          responseBody = JSON.parse(chunks.join(''));
        } catch (err) {
          reject(err);
        }
        const error = findError(null, response, responseBody);

        if (error) {
          reject(error);
          return;
        }

        resolve(responseBody);
      });
    });

    request.on('error', error => reject(error));

    if (body) {
      request.write(jsonBody);
    }
    request.end();
  });
}

module.exports = {
  GET: url => sendRequest('GET', url),
  POST: (url, body) => sendRequest('POST', url, body),
  DELETE: (url, body) => sendRequest('DELETE', url, body)
};
