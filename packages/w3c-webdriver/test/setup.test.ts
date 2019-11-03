import { newSession, WindowRect } from '../src';
import { log } from '../src/logger';
import { startDriver, stopDriver } from '../test-env/browserDriver';
import { startTestApp, stopTestApp } from '../test-env/testApp';
import { Browser, testEnvironment } from '../test-env/testEnv';

log.enabled = true;

let windowRect: WindowRect;

before(async () => {
  await startDriver();
  await startTestApp();
})

before(async () => {
  const { driver, capabilities, desiredCapabilities } = testEnvironment;
  const url = process.env.WEB_DRIVER_URL || '';
  log(`Creating session on ${url}.`);
  try {
    testEnvironment.session = await newSession({
      url,
      ...(capabilities && { capabilities }),
      ...(desiredCapabilities && { desiredCapabilities }),
      headers: driver.headers
    })
    log(`Session created.`);
  } catch (error) {
    log(error);
    throw error;
  }
  windowRect = await testEnvironment.session.getWindowRect();
});

beforeEach(async () => {
  const { session } = testEnvironment;
  const testAppPort = process.env.TEST_APP_PORT;
  await session.navigateTo(`http://localhost:${testAppPort}`);
  await session.setWindowRect(windowRect);
});

after(async () => {
  const { session, browser, driver } = testEnvironment;
  const url = process.env.WEB_DRIVER_URL;
  log(`Deleting session on ${url}.`);
  await session.close();
  log(`Session deleted.`);
  if (browser === Browser.Safari || driver.host) {
    log(`Wait for 2 seconds...`);
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
  }
});

after(async () => {
  await stopDriver();
  await stopTestApp();
});

