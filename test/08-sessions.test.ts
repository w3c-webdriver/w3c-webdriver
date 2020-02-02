import expect from 'expect';
import { newSession, status, Timeouts } from '../src';
import { Browser, getTestEnv, WebDriverHost } from '../test-env';

describe('Sessions', function() {
  describe('newSession method', function() {
    it('throws error if session creation was not successful', async function() {
      let error;

      try {
        await newSession({
          url: 'http://localhost:65535',
          capabilities: {
            alwaysMatch: {
              browserName: 'non existing browser'
            }
          }
        });
      } catch (e) {
        error = e;
      }
      expect(error.message).toContain(`connect ECONNREFUSED 127.0.0.1:65535`);
    });
  });

  describe('status method', function() {
    it('returns server status', async function() {
      const { browser, driver } = await getTestEnv(this);
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

  describe('set/getTimeout methods', function() {
    it('sets and retrieves session timeouts', async function() {
      const { session, browser } = await getTestEnv(this);
      const timeouts: Timeouts = {
        script: 30000,
        pageLoad: 60000,
        implicit: 40000
      };
      switch (browser) {
        case Browser.Chrome: {
          await session.setTimeouts(timeouts);

          const retrievedTimeout = await session.getTimeouts();

          expect(retrievedTimeout).toEqual(timeouts);
        }
      }
    });
  });
});
