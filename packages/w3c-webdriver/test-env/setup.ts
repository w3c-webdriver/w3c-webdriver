import { newSession } from '../src';
import { log } from '../src/logger';
import { selectedBrowser } from './browser';
import { session, setSession } from './session';

log.enabled = true;

const webDriverPort = process.env.WEB_DRIVER_PORT;
const testAppPort = process.env.TEST_APP_PORT;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

beforeAll(async () => {
  log(`Creating session on port ${webDriverPort}.`);
  try {
    setSession(
      await newSession(`http://localhost:${webDriverPort}`, {
        capabilities: { alwaysMatch: selectedBrowser.capability }
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
  log(`Deleting session on port ${webDriverPort}.`);
  await session.close();
  log(`Session deleted.`);
});
