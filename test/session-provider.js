import { newSession } from '../src';

let sessionInstance;

export async function start(port) {
  if (sessionInstance) return;
  sessionInstance = await newSession(`http://localhost:${port}`, {
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
        ignoreProtectedModeSettings: true,
        ignoreZoomSetting: true,
        'ie.ensureCleanSession': true,
        logLevel: 'INFO'
      }
    }[process.env.BROWSER]
  });
}

export async function stop() {
  await sessionInstance.delete();
}

export const session = new Proxy({}, {
  get: (target, name) => sessionInstance[name]
});
