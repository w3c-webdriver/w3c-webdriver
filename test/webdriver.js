const { execFile } = require('child_process');
const assert = require('assert');
const { path: chromedriverPath } = require('chromedriver');
const { path: geckodriverPath } = require('geckodriver');
const { path: phantomjsPath } = require('phantomjs-prebuilt');
const logger = require('./logger');

let instance;

const browser = process.env.BROWSER;
assert(browser, 'BROWSER environment variable is not set');

function start(port) {
  logger.info(`[webdriver:start] port: ${port}`);
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
    'internet-explorer': process.env.CI ? 'IEDriverServer' : null
  }[browser];
  const name = {
    chrome: 'Chromedriver',
    'chrome-headless': 'Chromedriver',
    firefox: 'Geckodriver',
    phantomjs: 'GhostDriver',
    'internet-explorer': 'InternetExplorerDriver'
  }[browser];
  const ready = {
    chrome: 'on port',
    'chrome-headless': 'on port',
    firefox: 'Listening on',
    phantomjs: 'running on port',
    'internet-explorer': 'on port'
  }[browser];

  logger.info(`[webdriver:start] path: ${path}, childArgs: ${childArgs}`);
  return new Promise((resolve, reject) => {
    const chunks = [];
    instance = execFile(path, childArgs);
    const onClose = () => {
      logger.info(`[webdriver:start] ${name} terminated`);
      reject();
    };
    const onOut = (chunk) => {
      logger.info(`[webdriver:start] ${chunk}`);
      chunks.push(chunk);
      if (chunks.join('').includes(ready)) {
        logger.info(`[webdriver:start] ${name} started on port ${port}`);
        /* eslint-disable no-use-before-define */
        done();
      }
    };
    const done = () => {
      instance.stdout.removeListener('data', onOut);
      instance.stderr.removeListener('data', onOut);
      instance.removeListener('close', onClose);
      resolve();
    }
    instance.stdout.on('data', onOut);
    instance.stderr.on('data', onOut);
    instance.on('close', onClose);
  });
}

function stop() {
  if (instance) instance.kill();
}

module.exports = {
  start,
  stop
};
