import { ChildProcess } from 'child_process';
import { path as chromedriverPath } from 'chromedriver';
import { config } from 'dotenv-safe';
import { path as geckodriverPath } from 'geckodriver';
import { path as iedriverPath } from 'iedriver';
import { HeaderInit, Headers } from 'node-fetch';
import { Capabilities, Session } from '../src';

config();

export enum Browser {
  Chrome = 'chrome',
  Firefox = 'firefox',
  Safari = 'safari',
  InternetExplorer = 'internet-explorer'
};

export enum WebDriverHost {
  Localhost,
  BrowserStack = 'https://hub-cloud.browserstack.com/wd/hub'
}

type BrowserDriver = {
  name: string;
  path?: string;
  instance?: ChildProcess;
  host: WebDriverHost;
  headers?: HeaderInit;
  args?({ port }: { port: number }): string[];
};

type TestEnvironment = {
  browser: Browser;
  headless: boolean;
  capabilities: Capabilities;
  desiredCapabilities?: {
    'browserstack.use_w3c': boolean;
  };
  driver: BrowserDriver;
  session: Session;
};

const testEnvironments: Omit<TestEnvironment, 'session' | 'headless'>[] = [
  {
    browser: Browser.Chrome,
    capabilities: {
      alwaysMatch: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true,
          ...(process.env.HEADLESS && {
            args: ['--headless']
          })
        }
      }
    },
    driver: {
      name: 'Chromedriver',
      path: chromedriverPath,
      args: ({ port }: { port: number }) => [`--port=${port}`],
      host: WebDriverHost.Localhost
    }
  },
  {
    browser: Browser.Firefox,
    capabilities: {
      alwaysMatch: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          log: {
            level: 'debug'
          },
          ...(process.env.HEADLESS && {
            args: ['-headless']
          })
        }
      }
    },
    driver: {
      name: 'Geckodriver',
      path: geckodriverPath,
      args: ({ port }: { port: number }) => [`--port=${port}`],
      host: WebDriverHost.Localhost
    }
  },
  {
    browser: Browser.Safari,
    capabilities: {
      alwaysMatch: {
        browserName: 'safari'
      }
    },
    driver: {
      name: 'SafariDriver',
      path: 'safaridriver',
      args: ({ port }: { port: number }) => [`--port=${port}`],
      host: WebDriverHost.Localhost
    }
  },
  {
    browser: Browser.InternetExplorer,
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
      args: ({ port }: { port: number }) => [`--port=${port}`, '--log-level=INFO'],
      host: WebDriverHost.Localhost
    }
  },
  {
    browser: Browser.Safari,
    capabilities: {
      alwaysMatch: {
        browserName: 'safari',
        'bstack:options': {
          local: true,
          os : 'OS X',
          osVersion : 'Mojave',
          safari: {
            enablePopups : true,
            allowAllCookies : true,
          }
        }
      }
    },
    desiredCapabilities: {
      'browserstack.use_w3c': true
    },
    driver: {
      name: 'BrowserStack',
      host: WebDriverHost.BrowserStack,
      headers: new Headers({
        Authorization: `Basic ${Buffer.from(
          [process.env.BROWSERSTACK_USERNAME, process.env.BROWSERSTACK_ACCESS_KEY].join(':')
        ).toString('base64')}`
      }),
    }
  },
  {
    browser: Browser.Firefox,
    capabilities: {
      alwaysMatch: {
        browserName: 'firefox',
        'bstack:options': {
          local: true,
          os : 'Windows',
          osVersion : '10'
        }
      }
    },
    desiredCapabilities: {
      'browserstack.use_w3c': true
    },
    driver: {
      name: 'BrowserStack',
      host: WebDriverHost.BrowserStack,
      headers: new Headers({
        Authorization: `Basic ${Buffer.from(
          [process.env.BROWSERSTACK_USERNAME, process.env.BROWSERSTACK_ACCESS_KEY].join(':')
        ).toString('base64')}`
      }),
    }
  }
];

function throwNoBrowserEnvironmentVariableError(): TestEnvironment {
  throw new Error(
    'Environment variable BROWSER is not set or is not matching the supported browsers.'
  );
}

export const testEnvironment: TestEnvironment = {
  session: new Session('default', 'default'),
  headless: !!process.env.HEADLESS,
  ...(testEnvironments.find(
    ({ browser, driver }) => browser === process.env.BROWSER && (!driver.host === !process.env.BROWSERSTACK)
  ) || throwNoBrowserEnvironmentVariableError())
};
