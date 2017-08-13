const { newSession } = require('../src');

let session;

async function start() {
    session = await newSession('http://localhost:4444', {
        desiredCapabilities: {
            browserName: 'Chrome'
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
