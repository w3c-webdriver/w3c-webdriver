const request = require('request');

function findError(err, body) {
    if (err) {
        return err;
    }

    if (body.status || body.value.error) {
        return new Error(`WebDriverError: ${body.value.message}`);
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

module.exports = {
    GET: (url, body) => sendRequest('GET', url, body),
    POST: (url, body) => sendRequest('POST', url, body),
    DELETE: (url, body) => sendRequest('DELETE', url, body)
};
