import { newSession } from '../src';
import { log } from '../src/logger';
import { browser } from './browser';
import { session, setSession } from './session';

log.enabled = true;

const webDriverUrl = browser.hub || `http://localhost:${process.env.WEB_DRIVER_PORT}`;
const testAppPort = process.env.TEST_APP_PORT;

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
});
