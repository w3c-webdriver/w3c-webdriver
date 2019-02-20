import { newSession } from '../src';
import browser from './browser';
import session from './session';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

beforeAll(async () => {
  global.sessionInstance = await newSession(`http://localhost:${process.env.WEB_DRIVER_PORT}`, {
    desiredCapabilities: browser.desiredCapabilities
  });
});

beforeEach(async () => {
  await session.go(`http://localhost:${process.env.TEST_APP_PORT}`);
});

afterAll(async () => {
  if (session.delete) {
    await session.delete();
  }
});
