// tslint:disable-next-line: match-default-export-name
import expect from 'expect';
import { status, Timeout } from '../src';
import { Browser, testEnvironment, WebDriverHost } from '../test-env/testEnv';

describe('Sessions', () => {
  describe('status method', () => {
    it('returns server status', async () => {
      const { browser, driver } = testEnvironment;
      const result = await status(<string>process.env.WEB_DRIVER_URL);

      if (driver.host === WebDriverHost.BrowserStack) {
        expect(result.build.version).toBeDefined();

        return;
      }

      switch (browser) {
        case Browser.Firefox: {
          expect(result.message).toBeDefined();
          expect(result.ready).toBeDefined();
          break;
        }
        case Browser.Safari: {
          process.stdout.write(JSON.stringify(result));
          break;
        }
        default: {
          expect(result.build).toBeDefined();
          expect(result.os).toBeDefined();
        }
      }
    });
  });

  describe('set/getTimeout methods', () => {
    it('sets and retrieves session timeouts', async () => {
      const { session, browser } = testEnvironment;
      const timeouts: Timeout = {
        script: 30000,
        pageLoad: 60000,
        implicit: 40000
      };
      switch (browser) {
        case 'chrome': {
          await session.setTimeout(timeouts);

          const retrievedTimeout = await session.getTimeout();

          expect(retrievedTimeout).toEqual(timeouts);
        }
        default:
      }
    });
  });
});
