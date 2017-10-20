const { execFile } = require('child_process');
const assert = require('assert');
const { path: chromedriverPath } = require('chromedriver');
const { path: geckodriverPath } = require('geckodriver');
const { path: phantomjsPath } = require('phantomjs-prebuilt');
const { path: iedriverPath } = require('iedriver');
const logger = require('./logger');
const waitForPort = require('wait-for-port');

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

async function start(port) {
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

async function stop() {
  if (usedPort) {
    instance.kill();
    await waitForFreePort(usedPort);
  }
}

module.exports = {
  start,
  stop
};
