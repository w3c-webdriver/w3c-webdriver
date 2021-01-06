import { ChildProcess } from 'child_process';
import { path as chromedriverPath } from 'chromedriver';
import { config } from 'dotenv-safe';
import { path as geckodriverPath } from 'geckodriver';
import { path32 as iedriverPath } from 'iedriver';
import { Context } from 'mocha';
import { Headers } from 'request';
import { Capabilities, Session, WindowRect } from '../src';

let initialWindowRect: WindowRect;

config();

export enum Browser {
  Chrome = 'chrome',
  Firefox = 'firefox',
  Safari = 'safari',
  InternetExplorer = 'internet-explorer',
}

export enum WebDriverHost {
  Localhost,
  BrowserStack = 'https://hub-cloud.browserstack.com/wd/hub',
}

type BrowserDriver = {
  name: string;
  path?: string;
  instance?: ChildProcess;
  host: WebDriverHost;
  headers?: Headers;
  args?({ port }: { port: number }): string[];
};

type TestEnvironment = {
  testName?: string;
  browser: Browser;
  headless: boolean;
  capabilities: Capabilities;
  desiredCapabilities?: {
    'browserstack.use_w3c': boolean;
  };
  driver: BrowserDriver;
  session: Session;
  setInitialWindowRectangle?: (windowRect: WindowRect) => void;
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
            args: ['--headless'],
          }),
        },
      },
    },
    driver: {
      name: 'Chromedriver',
      path: chromedriverPath,
      args: ({ port }: { port: number }): string[] => [`--port=${port}`],
      host: WebDriverHost.Localhost,
    },
  },
  {
    browser: Browser.Firefox,
    capabilities: {
      alwaysMatch: {
        browserName: 'firefox',
        'moz:firefoxOptions': {
          log: {
            level: 'warn',
          },
          ...(process.env.HEADLESS && {
            args: ['-headless'],
          }),
        },
      },
    },
    driver: {
      name: 'Geckodriver',
      path: geckodriverPath,
      args: ({ port }: { port: number }): string[] => [`--port=${port}`],
      host: WebDriverHost.Localhost,
    },
  },
  {
    browser: Browser.Safari,
    capabilities: {
      alwaysMatch: {
        browserName: 'safari',
      },
    },
    driver: {
      name: 'SafariDriver',
      path: 'safaridriver',
      args: ({ port }: { port: number }): string[] => [`--port=${port}`],
      host: WebDriverHost.Localhost,
    },
  },
  {
    browser: Browser.InternetExplorer,
    capabilities: {
      alwaysMatch: {
        browserName: 'internet explorer',
        'se:ieOptions': {
          ignoreProtectedModeSettings: true,
          ignoreZoomSetting: true,
          'ie.ensureCleanSession': true,
        },
      },
    },
    driver: {
      name: 'InternetExplorerDriver',
      path: iedriverPath,
      args: ({ port }: { port: number }): string[] => [
        `--port=${port}`,
        '--log-level=INFO',
      ],
      host: WebDriverHost.Localhost,
    },
  },
  {
    browser: Browser.Safari,
    capabilities: {
      alwaysMatch: {
        browserName: 'safari',
        browserVersion: '12.1',
        'bstack:options': {
          local: true,
          os: 'OS X',
          osVersion: 'Mojave',
          safari: {
            enablePopups: true,
            allowAllCookies: true,
          },
          networkLogs: true,
          debug: true,
          projectName: 'w3c-webdriver',
          buildName: process.env.GITHUB_SHA || 'local build',
          sessionName: 'Safari',
        },
      },
    },
    desiredCapabilities: {
      'browserstack.use_w3c': true,
    },
    driver: {
      name: 'BrowserStack',
      host: WebDriverHost.BrowserStack,
      headers: {
        Authorization: `Basic ${Buffer.from(
          [
            process.env.BROWSERSTACK_USERNAME,
            process.env.BROWSERSTACK_ACCESS_KEY,
          ].join(':')
        ).toString('base64')}`,
      },
    },
  },
  {
    browser: Browser.Firefox,
    capabilities: {
      alwaysMatch: {
        browserName: 'firefox',
        'bstack:options': {
          local: true,
          os: 'Windows',
          osVersion: '10',
          networkLogs: true,
          debug: true,
          projectName: 'w3c-webdriver',
          buildName: process.env.GITHUB_SHA || 'local build',
          sessionName: 'Firefox',
        },
      },
    },
    desiredCapabilities: {
      'browserstack.use_w3c': true,
    },
    driver: {
      name: 'BrowserStack',
      host: WebDriverHost.BrowserStack,
      headers: {
        Authorization: `Basic ${Buffer.from(
          [
            process.env.BROWSERSTACK_USERNAME,
            process.env.BROWSERSTACK_ACCESS_KEY,
          ].join(':')
        ).toString('base64')}`,
      },
    },
  },
];

function throwNoBrowserEnvironmentVariableError(): TestEnvironment {
  throw new Error(
    'Environment variable BROWSER is not set or is not matching the supported browsers.'
  );
}

const webDriverHost = process.env.BROWSERSTACK
  ? WebDriverHost.BrowserStack
  : WebDriverHost.Localhost;
const testEnv: TestEnvironment = {
  session: new Session('default', 'default'),
  headless: !!process.env.HEADLESS,
  setInitialWindowRectangle(rect: WindowRect) {
    initialWindowRect = rect;
  },
  ...(testEnvironments.find(
    ({ browser, driver }) =>
      browser === process.env.BROWSER && driver.host === webDriverHost
  ) || throwNoBrowserEnvironmentVariableError()),
};

export async function getTestEnv(context?: Context): Promise<TestEnvironment> {
  const { session } = testEnv;
  const testAppPort = process.env.TEST_APP_PORT ?? 0;

  testEnv.testName =
    context?.test?.titlePath().join('.').replace(/ /g, '_') ?? '';

  await session.refresh();
  await session.navigateTo(
    `http://localhost:${testAppPort}/#${testEnv.testName}`
  );
  await session.setWindowRect(initialWindowRect);

  return testEnv;
}

export default testEnv;
