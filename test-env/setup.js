import log from './logger';
import { newSession } from '../src';
import browser from './browser';
import session from './session';

const webDriverPort = process.env.WEB_DRIVER_PORT;
const testAppPort = process.env.TEST_APP_PORT;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

beforeAll(async () => {
  log(`Creating session on port ${webDriverPort}.`);
  global.sessionInstance = await newSession(`http://localhost:${webDriverPort}`, {
    desiredCapabilities: browser.desiredCapabilities
  });
  log(`Session created.`);
});

beforeEach(async () => {
  await session.go(`http://localhost:${testAppPort}`);
});

afterAll(async () => {
  log(`Deleting session on port ${webDriverPort}.`);
  if (session.delete) {
    await session.delete();
  }
  log(`Session deleted.`);
});
