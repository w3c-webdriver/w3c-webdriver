import { stop as stopTestApp } from '../test-app';
import { waitForFreePort } from './ports';

async function stopDriver(port: number) {
  if (port) {
    global.webDriverInstance.kill();
    await waitForFreePort(port);
  }
}

async function teardown() {
  await stopDriver(parseInt(process.env.WEB_DRIVER_PORT as string));
  await stopTestApp();
}

export default teardown;
