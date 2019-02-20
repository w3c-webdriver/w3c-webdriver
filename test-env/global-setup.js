import { execFile } from 'child_process';
import browser from './browser';
import log from './logger';
import { start as startTestApp } from '../test-app';
import { getFreePorts, waitForBusyPort } from './ports';

async function startDriver(port) {
  const {
    driver: { args, path, name }
  } = browser;
  const childArgs = args({ port });
  const onClose = () => log(`[webdriver:start] ${name} terminated`);
  const onOut = chunk => log(`[webdriver] ${chunk}`);

  log(`[webdriver:start] Starting ${name} ${path} ${childArgs.join(' ')}`);
  const instance = execFile(path, childArgs);
  instance.stdout.on('data', onOut);
  instance.stderr.on('data', onOut);
  instance.on('close', onClose);
  await waitForBusyPort(port);
  log(`[webdriver:start] ${name} started on port ${port}`);
  return instance;
}

async function setup() {
  const [webDriverPort, testAppPort] = await getFreePorts(3000, 3050, 2);
  process.env.WEB_DRIVER_PORT = webDriverPort;
  process.env.TEST_APP_PORT = testAppPort;

  global.webDriverInstance = await startDriver(webDriverPort);
  await startTestApp(testAppPort);
}

export default setup;
