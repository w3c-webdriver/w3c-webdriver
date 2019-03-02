import { execFile } from 'child_process';
import { log } from '../src/logger';
import { selectedBrowser } from './browser';
import { setInstance } from './driver';
import { getFreePorts, waitForBusyPort } from './ports';
import { start as startTestApp } from './test-app';

log.enabled = true;

async function startDriver(port: number) {
  const {
    driver: { args, path, name }
  } = selectedBrowser;
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
  process.env.TEST_APP_PORT = testAppPort.toString();

  setInstance(await startDriver(webDriverPort));
  await startTestApp(testAppPort);
}

// tslint:disable-next-line:no-default-export
export default globalSetup;
