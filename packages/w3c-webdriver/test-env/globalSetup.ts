import { execFile } from 'child_process';
import { log, setLogger } from '../src/logger';
import { browser } from './browser';
import { startBrowserStackLocal } from './browserstack';
import { setInstance } from './driver';
import { getFreePorts, waitForBusyPort } from './ports';
import { start as startTestApp } from './test-app';

setLogger((message: string) => {
  // tslint:disable-next-line:no-console
  console.log(message);
});

async function startDriver(port: number) {
  const {
    driver
  } = browser;

  if (!driver) return;

  const { args, path, name } = driver;

  const childArgs = args({ port });
  const onClose = (code: number, signal: string) => {
    if (code !== 0) {
      return;
    }

    throw new Error(`Webdriver ${name} exited unexpectedly with code ${code} and signal ${signal}.`);
  };
  const onOut = (chunk: string) => {
    log(chunk);
  }

  log(`Starting ${name} ${path} ${childArgs.join(' ')}`);
  const instance = execFile(path, childArgs);

  if (!instance.stdout || !instance.stderr) {
    throw new Error(`Unable to get output from ${name} ${path} ${childArgs.join(' ')}`)
  }

  instance.stdout.on('data', onOut);
  instance.stderr.on('data', onOut);
  instance.on('close', onClose);
  await waitForBusyPort(port);
  log(`${name} started on port ${port}`);

  return instance;
}

async function globalSetup() {
  const [webDriverPort, testAppPort] = await getFreePorts(3000, 3050, 2);
  process.env.WEB_DRIVER_PORT = webDriverPort.toString();
  process.env.WEB_DRIVER_URL = browser.hub || `http://localhost:${webDriverPort}`;
  process.env.TEST_APP_PORT = testAppPort.toString();

  if (browser.id === 'browserstack') {
    await startBrowserStackLocal();
  }

  const instance = await startDriver(webDriverPort);

  if (instance) {
    setInstance(instance);
  }

  await startTestApp(testAppPort);
}

// tslint:disable-next-line:no-default-export
export default globalSetup;
