// tslint:disable-next-line:import-name
import browserstack from 'browserstack-local';
import { promisify } from 'util';
import { log } from '../src/logger';

const instance = new browserstack.Local();

export async function startBrowserStackLocal() {
  log('Starting BrowserStack Local...');
  await promisify(instance.start).call(instance, {
    key: <string>process.env.BROWSERSTACK_ACCESS_KEY
  });
  log('BrowserStack Local started.');
}

export async function stopBrowserStackLocal() {
  log('Shutting down BrowserStack Local...');
  await promisify(instance.stop).call(instance);
  log('BrowserStack Local stopped.');
}
