import { ChildProcess } from 'child_process';
import { stop as stopTestApp } from '../test-app';
import { waitForFreePort } from './ports';

async function stopDriver(port: number) {
  const instance = <ChildProcess>global.webDriverInstance;
  instance.kill();
  await waitForFreePort(port);
}

async function globalTeardown() {
  await stopDriver(parseInt(<string>process.env.WEB_DRIVER_PORT));
  await stopTestApp();
}

export default globalTeardown;
