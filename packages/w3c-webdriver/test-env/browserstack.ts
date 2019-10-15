import browserstack from 'browserstack-local';
import { log } from '../src/logger';

const instance = new browserstack.Local();

export async function startBrowserStackLocal() {
  log('Starting BrowserStack Local...');
  await new Promise(resolve => {
    instance.start(
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
    instance.stop(() => {
      resolve();
    });
  });
  log('BrowserStack Local stopped.');
}
