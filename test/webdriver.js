import { execFile } from 'child_process';
import assert from 'assert';
import { path as chromedriverPath } from 'chromedriver';
import { path as geckodriverPath } from 'geckodriver';
import { path as phantomjsPath } from 'phantomjs-prebuilt';
import { path as iedriverPath } from 'iedriver';
import waitForPort from 'wait-for-port';
import logger from './logger';

const waitForBusyPort = port => new Promise((resolve, reject) => {
  waitForPort('127.0.0.1', port, err => (err ? reject(err) : resolve()));
});

const waitForFreePort = port => new Promise((resolve, reject) => {
  waitForPort('127.0.0.1', port, { reverse: true }, err => (err ? reject(err) : resolve()));
});

let instance;
let usedPort;

const browser = process.env.BROWSER;
assert(browser, 'BROWSER environment variable is not set');

export async function start(port) {
  const childArgs = {
    chrome: [`--port=${port}`],
    'chrome-headless': [`--port=${port}`],
    firefox: [`--port=${port}`],
    phantomjs: [`--webdriver=${port}`],
    'internet-explorer': [`--port=${port}`]
  }[browser];
  const path = {
    chrome: process.env.CI ? 'chromedriver' : chromedriverPath,
    'chrome-headless': process.env.CI ? 'chromedriver' : chromedriverPath,
    firefox: process.env.CI ? 'geckodriver' : geckodriverPath,
    phantomjs: phantomjsPath,
    'internet-explorer': process.env.CI ? 'IEDriverServer' : iedriverPath
  }[browser];
  const name = {
    chrome: 'Chromedriver',
    'chrome-headless': 'Chromedriver',
    firefox: 'Geckodriver',
    phantomjs: 'GhostDriver',
    'internet-explorer': 'InternetExplorerDriver'
  }[browser];

  logger.info(`[webdriver:start] Starting ${name} ${path} ${childArgs.join(' ')}`);
  instance = execFile(path, childArgs);
  const onClose = () => logger.info(`[webdriver:start] ${name} terminated`);
  const onOut = chunk => logger.info(`[webdriver] ${chunk}`);
  instance.stdout.on('data', onOut);
  instance.stderr.on('data', onOut);
  instance.on('close', onClose);
  await waitForBusyPort(port);
  usedPort = port;
  logger.info(`[webdriver:start] ${name} started on port ${port}`);
}

export async function stop() {
  if (usedPort) {
    instance.kill();
    await waitForFreePort(usedPort);
  }
}
