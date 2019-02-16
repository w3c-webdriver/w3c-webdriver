/* eslint-env jest,jasmine */

import { start as createSession, stop as removeSession, session } from './session-provider';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

beforeAll(async () => {
  await createSession(process.env.WEB_DRIVER_PORT);
});

beforeEach(async () => {
  await session.go(`http://localhost:${process.env.TEST_APP_PORT}`);
});

afterAll(async () => {
  await removeSession();
});
