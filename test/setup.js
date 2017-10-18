/* eslint-env jest */

const webdriver = require('./webdriver');
const sessionProvider = require('./session-provider');
const testApp = require('../test-app');
const portscanner = require('portscanner');
const logger = require('./logger');

const getFreePorts = async (startPort, endPort, n) => {
  logger.info('[getFreePorts] start');
  let port = startPort - 1;
  const ports = [];
  while (ports.length < n) {
    /* eslint-disable no-await-in-loop */
    port = await portscanner.findAPortNotInUse(port + 1, 3050, '127.0.0.1');
    logger.info(`[getFreePorts] port found ${port}`);
    ports.push(port);
  }
  logger.info(`[getFreePorts] ports: ${ports}`);
  return ports;
};

beforeAll(async () => {
  const [webDriverPort, testAppPort] = await getFreePorts(3000, 3050, 2);
  process.env.WEB_DRIVER_PORT = webDriverPort;
  process.env.TEST_APP_PORT = testAppPort;
  await webdriver.start(webDriverPort);
  await testApp.start(testAppPort);
  await sessionProvider.start(webDriverPort);
}, 60000);

beforeEach(async () => {
  await sessionProvider.session.go(`http://localhost:${process.env.TEST_APP_PORT}`);
}, 60000);

afterAll(async () => {
  await sessionProvider.stop();
  await webdriver.stop();
  await testApp.stop();
}, 60000);
