const { newSession } = require('../src');

let session;

async function start(port) {
  if (session) return;
  session = await newSession(`http://localhost:${port}`, {
    desiredCapabilities: {
      chrome: {
        browserName: 'chrome',
        javascriptEnabled: true
      },
      'chrome-headless': {
        browserName: 'chrome',
        javascriptEnabled: true,
        chromeOptions: {
          args: ['incognito', 'headless', 'no-sandbox', 'disable-gpu']
        }
      },
      firefox: {
        browserName: 'firefox',
        marionette: true,
        javascriptEnabled: true
      },
      phantomjs: {
        browserName: 'phantomjs',
        javascriptEnabled: true
      },
      'internet-explorer': {
        browserName: 'internet explorer',
        javascriptEnabled: true
      }
    }[process.env.BROWSER]
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
