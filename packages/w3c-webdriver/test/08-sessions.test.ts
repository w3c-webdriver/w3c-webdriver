import WebDriver, { status } from '../src';
import { name as browserName } from '../test-env/browser';
import session from '../test-env/session';

describe('Sessions', () => {
  describe('status method', () => {
    it('returns server status', async () => {
      const result = await status(`http://localhost:${process.env.WEB_DRIVER_PORT}`);

      switch (browserName) {
        case 'firefox': {
          expect(result.message).toBeDefined();
          expect(result.ready).toBeDefined();
        }
        case 'safari': {
          process.stdout.write(JSON.stringify(result));
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
        default: {
        }
      }
    });
  });
});
