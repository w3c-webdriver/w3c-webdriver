import { JUnitXmlReporter } from 'jasmine-reporters';
import { newSession } from '../src';
import { log } from '../src/logger';
import { browser } from './browser';
import { session, setSession } from './session';

log.enabled = true;

const webDriverUrl = browser.hub || `http://localhost:${process.env.WEB_DRIVER_PORT}`;
const testAppPort = process.env.TEST_APP_PORT;

if (process.env.JUNIT_REPORT) {
  jasmine.getEnv().addReporter(
    new JUnitXmlReporter({
      consolidateAll: true,
      captureStdout: true,
      filePrefix: 'junit'
    })
  );
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

beforeAll(async () => {
  log(`Creating session on ${webDriverUrl}.`);
  try {
    setSession(
      await newSession({
        url: webDriverUrl,
        capabilities: browser.capabilities,
        desiredCapabilities: browser.desiredCapabilities,
        headers: browser.headers
      })
    );
    log(`Session created.`);
  } catch (error) {
    log(error);
    throw error;
  }
});

beforeEach(async () => {
  await session.go(`http://localhost:${testAppPort}`);
});

afterAll(async () => {
  log(`Deleting session on ${webDriverUrl}.`);
  await session.close();
  log(`Session deleted.`);
  if (['safari', 'browserstack'].includes(browser.id)) {
    log(`Wait for 2 seconds...`);
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 2000)
    );
  }
});
