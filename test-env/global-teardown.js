import { stop as stopTestApp } from '../test-app';
import { waitForFreePort } from './ports';

async function stopDriver(port) {
  if (port) {
    global.webDriverInstance.kill();
    await waitForFreePort(port);
  }
}

async function teardown() {
  await stopDriver(process.env.WEB_DRIVER_PORT);
  await stopTestApp();
}

export default teardown;
