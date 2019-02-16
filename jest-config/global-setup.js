import portscanner from 'portscanner';
import { start as startDriver } from './webdriver';
import { start as startTestApp } from '../test-app';

const getFreePorts = async (startPort, endPort, n) => {
  let port = startPort - 1;
  const ports = [];
  while (ports.length < n) {
    /* eslint-disable no-await-in-loop */
    port = await portscanner.findAPortNotInUse(port + 1, endPort, '127.0.0.1');
    ports.push(port);
  }
  return ports;
};

async function setup() {
  const [webDriverPort, testAppPort] = await getFreePorts(3000, 3050, 2);
  process.env.WEB_DRIVER_PORT = webDriverPort;
  process.env.TEST_APP_PORT = testAppPort;
  await startDriver(webDriverPort);
  await startTestApp(testAppPort);
}

export default setup;
