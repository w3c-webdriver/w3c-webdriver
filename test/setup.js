/* eslint-env jest,jasmine */

import portscanner from 'portscanner';

import { start as startDriver, stop as stopDriver } from './webdriver';
import { start as createSession, stop as removeSession, session } from './session-provider';
import { start as startTestApp, stop as stopTestApp } from '../test-app';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

const getFreePorts = async (startPort, endPort, n) => {
  let port = startPort - 1;
  const ports = [];
  while (ports.length < n) {
    /* eslint-disable no-await-in-loop */
    port = await portscanner.findAPortNotInUse(port + 1, 3050, '127.0.0.1');
    ports.push(port);
  }
  return ports;
};

beforeAll(async () => {
  const [webDriverPort, testAppPort] = await getFreePorts(3000, 3050, 2);
  process.env.WEB_DRIVER_PORT = webDriverPort;
  process.env.TEST_APP_PORT = testAppPort;
  await startDriver(webDriverPort);
  await startTestApp(testAppPort);
  await createSession(webDriverPort);
});

beforeEach(async () => {
  await session.go(`http://localhost:${process.env.TEST_APP_PORT}`);
});

afterAll(async () => {
  await removeSession();
  await stopDriver();
  await stopTestApp();
});
