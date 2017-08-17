const { newSession } = require('../src');

let session;

async function start() {
    if (session) return;
    session = await newSession('http://localhost:4444', {
        desiredCapabilities: {
            browserName: 'firefox',
            marionette: true,
            javascriptEnabled: true
        }
    });
}

async function stop() {
    await session.delete();
}

module.exports = {
    start,
    stop,
    session: new Proxy({}, {
        get: (target, name) => session[name]
    })
};
