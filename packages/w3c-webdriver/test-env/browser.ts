import { path as chromedriverPath } from 'chromedriver';
import { config } from 'dotenv-safe';
import { path as geckodriverPath } from 'geckodriver';
import { path as iedriverPath } from 'iedriver';

config();

type ChromeOptions = {
  w3c?: boolean;
  binary?: string;
  args?: string[];
};

type FirefoxOptions = {
  log?: {
    level?: string;
  };
  args?: string[];
};

type InternetExplorerOptions = {
  ignoreProtectedModeSettings: boolean;
  ignoreZoomSetting: boolean;
  'ie.ensureCleanSession': boolean;
};

type BrowserCapability = {
  browserName: string;
  'goog:chromeOptions'?: ChromeOptions;
  'moz:firefoxOptions'?: FirefoxOptions;
  'se:ieOptions'?: InternetExplorerOptions;
};

type BrowserDriver = {
  name: string;
  path: string;
  args({ port }: { port: number }): string[];
};

type Browser = {
  id: string;
  capability: BrowserCapability;
  desiredCapabilities?: object;
  driver?: BrowserDriver;
  hub?: string;
};

const browsers: Browser[] = [
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
      args: ({ port }: { port: number }) => [`--port=${port}`]
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
      args: ({ port }: { port: number }) => [`--port=${port}`]
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
      args: ({ port }: { port: number }) => [`--port=${port}`]
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
      args: ({ port }: { port: number }) => [`--port=${port}`]
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
      args: ({ port }: { port: number }) => [`--port=${port}`]
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
      args: ({ port }: { port: number }) => [`--port=${port}`, '--log-level=INFO']
    }
  },
  {
    id: 'browserstack',
    capability: {
      browserName: 'firefox'
    },
    desiredCapabilities: {
      'browserstack.use_w3c': true,
      'browserstack.user': process.env.BROWSERSTACK_USERNAME,
      'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
      'browserstack.local': true,
      // 'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_ID,
      browserName: 'firefox'
    },
    hub: 'https://hub-cloud.browserstack.com/wd/hub'
  }
];

const maybeBrowser: Browser | undefined = browsers.find(
  browser => browser.id === process.env.BROWSER
);

if (maybeBrowser === undefined) {
  throw new Error(
    'Environment variable BROWSER is not set or is not matching the supported browsers.'
  );
}

export const selectedBrowser: Browser = maybeBrowser;
export const name = selectedBrowser.capability.browserName;
