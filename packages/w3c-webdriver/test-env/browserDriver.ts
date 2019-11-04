import browserstack from 'browserstack-local';
import { execFile } from 'child_process';
import { findAPortNotInUse } from 'portscanner';
import waitOn from'wait-on';
import { log } from '../src/logger';
import testEnv, { WebDriverHost } from './testEnv';

const browserStackInstance = new browserstack.Local();

export async function startDriver() {
  const port = await findAPortNotInUse(3000, 3050, '127.0.0.1');
  const { driver } = testEnv;
  process.env.WEB_DRIVER_PORT = port.toString();
  process.env.WEB_DRIVER_URL = driver.host === WebDriverHost.Localhost ? `http://localhost:${port}` : driver.host;

  if (driver.host === WebDriverHost.BrowserStack) {
    await startBrowserStackLocal();

    return;
  }

  const { args = () => [], path = '', name } = driver;

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

  driver.instance = instance;
}

export async function stopDriver() {
  const { driver } = testEnv;
  const port = parseInt(process.env.WEB_DRIVER_PORT || '');

  if (driver.host === WebDriverHost.BrowserStack) {
    await stopBrowserStackLocal();

    return;
  }

  const { name, instance } = driver;

  log(`Shutting down ${name}`);

  if (instance) {
    instance.kill();
    await waitForFreePort(port);
    log(`${name} stopped on port ${port}`);
  }
}

export async function startBrowserStackLocal() {
  log('Starting BrowserStack Local...');
  await new Promise(resolve => {
    browserStackInstance.start(
      {
        key: <string>process.env.BROWSERSTACK_ACCESS_KEY,
        verbose: true
      },
      () => {
        resolve();
      }
    );
  });
  log('BrowserStack Local started.');
}

export async function stopBrowserStackLocal() {
  log('Shutting down BrowserStack Local...');
  await new Promise(resolve => {
    browserStackInstance.stop(() => {
      resolve();
    });
  });
  log('BrowserStack Local stopped.');
}

async function waitForBusyPort (port: number) {
  return new Promise((resolve, reject) => {
    waitOn({ resources: [`tcp:127.0.0.1:${port}`] }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function waitForFreePort (port: number){
  return new Promise((resolve, reject) => {
    waitOn({ resources: [`tcp:127.0.0.1:${port}`], reverse: true }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
