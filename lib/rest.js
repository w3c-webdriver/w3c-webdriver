'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELETE = exports.POST = exports.GET = undefined;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findError(err, response, body) {
  if (err) {
    return err;
  }

  if (response.statusCode !== 200 || body.value && body.value.error) {
    return new Error(`WebDriverError: status: ${response.statusCode} ${_util2.default.inspect(body, false, 10, true)}`);
  }

  return null;
}

function sendRequest(method, url, body) {
  const jsonBody = JSON.stringify(body);
  const urlParts = _url2.default.parse(url);
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
    const request = _http2.default.request(options, response => {
      const chunks = [];
      response.setEncoding('utf8');
      response.on('data', chunk => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        let responseBody;
        if (response.statusCode !== 200) {
          reject(new Error(['HTTPError', '\nrequest:', _util2.default.inspect(Object.assign({}, options, { body }), false, null), '\nresponse:', _util2.default.inspect({
            statusCode: response.statusCode,
            body: chunks.join('')
          }, false, null)].join(' ')));
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

const GET = exports.GET = url => sendRequest('GET', url);
const POST = exports.POST = (url, body) => sendRequest('POST', url, body);
const DELETE = exports.DELETE = (url, body) => sendRequest('DELETE', url, body);