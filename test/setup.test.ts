/* eslint-disable mocha/no-sibling-hooks */
/* eslint-disable mocha/no-hooks-for-single-case */
/* eslint-disable mocha/no-top-level-hooks */
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { newSession } from '../src';
import { log } from '../src/logger';
import testEnv from '../test-env';
import { startDriver, stopDriver } from '../test-env/browserDriver';
import { startTestApp, stopTestApp } from '../test-env/testApp';

type Test = Mocha.Test & {
  consoleOutputs: string[];
  consoleErrors: string[];
};

log.enabled = true;
let currentTest: Test | undefined;
const originalLogFunction = process.stdout.write.bind(process.stdout);
const originalErrorFunction = process.stderr.write.bind(process.stderr);

process.stdout.write = (message: string): boolean => {
  if (currentTest) {
    currentTest.consoleOutputs = [
      ...(currentTest?.consoleOutputs ?? []),
      message,
    ];
  }

  return originalLogFunction(message);
};
process.stderr.write = (message: string): boolean => {
  if (currentTest) {
    currentTest.consoleErrors = [
      ...(currentTest?.consoleErrors ?? []),
      message,
    ];
  }

  return originalErrorFunction(message);
};

before(async function () {
  await startDriver();
  await startTestApp();
});

before(async function () {
  const {
    driver,
    capabilities,
    desiredCapabilities,
    setInitialWindowRectangle,
  } = testEnv;
  const url = process.env.WEB_DRIVER_URL || '';
  log(`Creating session on ${url}.`);
  try {
    testEnv.session = await newSession({
      url,
      ...(capabilities && { capabilities }),
      ...(desiredCapabilities && { desiredCapabilities }),
      headers: driver.headers,
    });
    log(`Session created.`);
  } catch (error) {
    log(error);
    throw error;
  }
  if (setInitialWindowRectangle) {
    setInitialWindowRectangle(await testEnv.session.getWindowRect());
  }
});

beforeEach(function () {
  currentTest = this.currentTest as Test;
});

afterEach(async function () {
  if (this.currentTest?.state === 'failed') {
    const { session, testName } = testEnv;

    if (!testName) {
      return;
    }

    const screenshot = await session.takeScreenshot();
    const fileName = resolve(__dirname, `../screenshots/${testName}.png`);
    try {
      mkdirSync(dirname(fileName));
      // eslint-disable-next-line no-empty
    } catch {}
    writeFileSync(fileName, screenshot, 'base64');
  }
});

after(async function () {
  const { session } = testEnv;
  const url = process.env.WEB_DRIVER_URL;

  if (!url) {
    return;
  }

  log(`Deleting session on ${url}.`);
  try {
    await session.close();
    // eslint-disable-next-line no-empty
  } catch {}
  log(`Session deleted.`);
});

after(async function () {
  await stopDriver();
  await stopTestApp();
});
