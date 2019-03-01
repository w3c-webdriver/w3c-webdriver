import { newSession } from '../src';
import Logger from '../src/Logger';
import browser from './browser';
import session from './session';

const webDriverPort = process.env.WEB_DRIVER_PORT;
const testAppPort = process.env.TEST_APP_PORT;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

beforeAll(async () => {
  Logger.log(`Creating session on port ${webDriverPort}.`);
  try {
    const body = { capabilities: { alwaysMatch: browser.capability } };
    global.sessionInstance = await newSession(`http://localhost:${webDriverPort}`, body);
    Logger.log(`Session created.`);
  } catch (error) {
    Logger.log(error);
    throw error;
  }
});

beforeEach(async () => {
  await session.go(`http://localhost:${testAppPort}`);
});

afterAll(async () => {
  Logger.log(`Deleting session on port ${webDriverPort}.`);
  await session.close();
  Logger.log(`Session deleted.`);
});
