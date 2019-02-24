import assert from 'assert';
import { path as chromedriverPath } from 'chromedriver';
import { path as geckodriverPath } from 'geckodriver';
import { path as iedriverPath } from 'iedriver';

const browsers = [
  {
    id: 'chrome',
    capability: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        w3c: true,
        binary: process.env.CHROME_BIN
      }
    },
    driver: {
      name: 'Chromedriver',
      path: chromedriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'chrome-headless',
    capability: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        w3c: true,
        binary: process.env.CHROME_BIN,
        args: ['--headless']
      }
    },
    driver: {
      name: 'Chromedriver',
      path: chromedriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'firefox',
    capability: {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        log: {
          level: 'debug'
        }
      }
    },
    driver: {
      name: 'Geckodriver',
      path: geckodriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'firefox-headless',
    capability: {
      browserName: 'firefox',
      'moz:firefoxOptions': {
        args: ['-headless'],
        log: {
          level: 'debug'
        }
      }
    },
    driver: {
      name: 'Geckodriver',
      path: geckodriverPath,
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'safari',
    capability: {
      browserName: 'safari'
    },
    driver: {
      name: 'SafariDriver',
      path: 'safaridriver',
      args: ({ port }) => [`--port=${port}`]
    }
  },
  {
    id: 'internet-explorer',
    capability: {
      browserName: 'internet explorer',
      'se:ieOptions': {
        ignoreProtectedModeSettings: true,
        ignoreZoomSetting: true,
        'ie.ensureCleanSession': true
      }
    },
    driver: {
      name: 'InternetExplorerDriver',
      path: iedriverPath,
      args: ({ port }) => [`--port=${port}`, '--log-level=INFO']
    }
  }
];

const selectedBrowser = browsers.find(browser => browser.id === process.env.BROWSER);

assert(
  selectedBrowser,
  'Environment variable BROWSER is not set or is not matching the supported browsers.'
);

export default selectedBrowser;

export const name = selectedBrowser.capability.browserName;
