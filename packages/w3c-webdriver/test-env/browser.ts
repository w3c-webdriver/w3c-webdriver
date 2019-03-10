import { path as chromedriverPath } from 'chromedriver';
import { config } from 'dotenv-safe';
import { path as geckodriverPath } from 'geckodriver';
import { path as iedriverPath } from 'iedriver';
import { HeaderInit, Headers } from 'node-fetch';
// tslint:disable-next-line:import-name
import WebDriver from '../src';

config();

type BrowserDriver = {
  name: string;
  path: string;
  args({ port }: { port: number }): string[];
};

type Browser = {
  id: string;
  capabilities: WebDriver.Capabilities;
  desiredCapabilities?: {
    'browserstack.use_w3c': boolean;
  };
  headers?: HeaderInit;
  driver?: BrowserDriver;
  hub?: string;
};

const browsers: Browser[] = [
  {
    id: 'chrome',
    capabilities: {
      alwaysMatch: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true,
          binary: process.env.CHROME_BIN
        }
      }
    },
    driver: {
      name: 'Chromedriver',
      path: chromedriverPath,
      args: ({ port }: { port: number }) => [`--port=${port}`]
    }
  },
  {
    id: 'chrome-headless',
    capabilities: {
      alwaysMatch: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true,
          binary: process.env.CHROME_BIN,
          args: ['--headless']
        }
      }
    },
    driver: {
      name: 'Chromedriver',
      path: chromedriverPath,
      args: ({ port }: { port: number }) => [`--port=${port}`]
    }
  },
  {
    id: 'firefox',
    capabilities: {
      alwaysMatch: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          log: {
            level: 'debug'
          }
        }
      }
    },
    driver: {
      name: 'Geckodriver',
      path: geckodriverPath,
      args: ({ port }: { port: number }) => [`--port=${port}`]
    }
  },
  {
    id: 'firefox-headless',
    capabilities: {
      alwaysMatch: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: ['-headless'],
          log: {
            level: 'debug'
          }
        }
      }
    },
    driver: {
      name: 'Geckodriver',
      path: geckodriverPath,
      args: ({ port }: { port: number }) => [`--port=${port}`]
    }
  },
  {
    id: 'safari',
    capabilities: {
      alwaysMatch: {
        browserName: 'safari'
      }
    },
    driver: {
      name: 'SafariDriver',
      path: 'safaridriver',
      args: ({ port }: { port: number }) => [`--port=${port}`]
    }
  },
  {
    id: 'internet-explorer',
    capabilities: {
      alwaysMatch: {
        browserName: 'internet explorer',
        'se:ieOptions': {
          ignoreProtectedModeSettings: true,
          ignoreZoomSetting: true,
          'ie.ensureCleanSession': true
        }
      }
    },
    driver: {
      name: 'InternetExplorerDriver',
      path: iedriverPath,
      args: ({ port }: { port: number }) => [`--port=${port}`, '--log-level=INFO']
    }
  },
  {
    id: 'browserstack',
    capabilities: {
      alwaysMatch: {
        browserName: 'firefox',
        'bstack:options': {
          local: true
        }
      }
    },
    desiredCapabilities: {
      'browserstack.use_w3c': true
    },
    headers: new Headers({
      Authorization: `Basic ${Buffer.from(
        [process.env.BROWSERSTACK_USERNAME, process.env.BROWSERSTACK_ACCESS_KEY].join(':')
      ).toString('base64')}`
    }),
    hub: 'https://hub-cloud.browserstack.com/wd/hub'
  }
];

const maybeBrowser: Browser | undefined = browsers.find(
  browserConfiguration => browserConfiguration.id === process.env.BROWSER
);

if (maybeBrowser === undefined) {
  throw new Error(
    'Environment variable BROWSER is not set or is not matching the supported browsers.'
  );
}

export const browser: Browser = maybeBrowser;

if (browser.capabilities.alwaysMatch === undefined) {
  throw new Error('browser.capabilities.alwaysMatch is required');
}

export const browserName: string = browser.capabilities.alwaysMatch.browserName;
