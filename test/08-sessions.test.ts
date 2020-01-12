import expect from 'expect';
import { status, Timeout } from '../src';
import testEnv, { Browser, WebDriverHost } from '../test-env';

describe('Sessions', () => {
  describe('status method', () => {
    it('returns server status', async () => {
      const { browser, driver } = testEnv;
      const result = await status(process.env.WEB_DRIVER_URL as string);

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
      const { session, browser } = testEnv;
      const timeouts: Timeout = {
        script: 30000,
        pageLoad: 60000,
        implicit: 40000
      };
      switch (browser) {
        case Browser.Chrome: {
          await session.setTimeout(timeouts);

          const retrievedTimeout = await session.getTimeout();

          expect(retrievedTimeout).toEqual(timeouts);
        }
      }
    });
  });
});
