// tslint:disable-next-line:import-name
import WebDriver, { status } from '../src';
import { browser, browserName } from '../test-env/browser';
import { session } from '../test-env/session';

describe('Sessions', () => {
  describe('status method', () => {
    it('returns server status', async () => {
      const result = await status(<string>process.env.WEB_DRIVER_URL);

      if (browser.id === 'browserstack') {
        expect(result.build.version).toBeDefined();

        return;
      }

      switch (browserName) {
        case 'firefox': {
          expect(result.message).toBeDefined();
          expect(result.ready).toBeDefined();
          break;
        }
        case 'safari': {
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
      const timeouts: WebDriver.Timeout = {
        script: 30000,
        pageLoad: 60000,
        implicit: 40000
      };
      switch (browserName) {
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
