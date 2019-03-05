import { log } from '../src/logger';
import { selectedBrowser } from './browser';
import { stopBrowserStackLocal } from './browserstack';
import { getInstance } from './driver';
import { waitForFreePort } from './ports';
import { stop as stopTestApp } from './test-app';

log.enabled = true;

async function stopDriver(port: number) {
  const instance = getInstance();
  const { driver } = selectedBrowser;

  if (!driver) {
    return
  }

  const { name } = driver;

  log(`Shutting down ${name}`);

  if (instance) {
    instance.kill();
    await waitForFreePort(port);
    log(`${name} stopped on port ${port}`);
  }
}

async function globalTeardown() {
  if (process.env.WEB_DRIVER_PORT) {
    await stopDriver(parseInt(process.env.WEB_DRIVER_PORT));
  }

  if (selectedBrowser.id === 'browserstack') {
    await stopBrowserStackLocal();
  }

  await stopTestApp();
}

// tslint:disable-next-line:no-default-export
export default globalTeardown;
