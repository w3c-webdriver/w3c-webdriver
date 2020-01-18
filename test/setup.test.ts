/* eslint-disable mocha/no-sibling-hooks */
/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable mocha/no-top-level-hooks */
import { newSession, WindowRect } from '../src';
import { log } from '../src/logger';
import testEnv, { WebDriverHost } from '../test-env';
import { startDriver, stopDriver } from '../test-env/browserDriver';
import { startTestApp, stopTestApp } from '../test-env/testApp';

log.enabled = true;

let windowRect: WindowRect;

before(async () => {
  await startDriver();
  await startTestApp();
});

before(async () => {
  const { driver, capabilities, desiredCapabilities } = testEnv;
  const url = process.env.WEB_DRIVER_URL || '';
  log(`Creating session on ${url}.`);
  try {
    testEnv.session = await newSession({
      url,
      ...(capabilities && { capabilities }),
      ...(desiredCapabilities && { desiredCapabilities }),
      headers: driver.headers
    });
    log(`Session created.`);
  } catch (error) {
    log(error);
    throw error;
  }
  windowRect = await testEnv.session.getWindowRect();
});

beforeEach(async () => {
  const { session } = testEnv;
  const testAppPort = process.env.TEST_APP_PORT;
  await session.navigateTo(`http://localhost:${testAppPort}`);
  await session.setWindowRect(windowRect);
  await session.executeAsyncScript(`
    var callback = arguments[0];
    var interval = setInterval(function() {
      if(document.readyState === 'complete') {
        clearInterval(interval);
        callback();
      }
    }, 100);
  `);
});

after(async () => {
  const { session, driver } = testEnv;
  const url = process.env.WEB_DRIVER_URL;
  log(`Deleting session on ${url}.`);
  await session.close();
  log(`Session deleted.`);
  if (driver.host === WebDriverHost.BrowserStack) {
    log(`Wait for 4 seconds...`);
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 4000)
    );
  }
});

after(async () => {
  await stopDriver();
  await stopTestApp();
});
