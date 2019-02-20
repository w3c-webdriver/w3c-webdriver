import session from '../test-env/session';
import { status } from '../src';

describe('Sessions', () => {
  describe('status method', () => {
    it('returns server status', async () => {
      const result = await status(`http://localhost:${process.env.WEB_DRIVER_PORT}`);
      const check = {
        chrome: () => {
          expect(result.build).toBeDefined();
          expect(result.os).toBeDefined();
        },
        'chrome-headless': () => {
          expect(result.build).toBeDefined();
          expect(result.os).toBeDefined();
        },
        firefox: () => {
          expect(result.message).toBeDefined();
          expect(result.ready).toBeDefined();
        },
        'internet-explorer': () => {
          expect(result.build).toBeDefined();
          expect(result.os).toBeDefined();
        }
      }[process.env.BROWSER];
      check();
    });
  });

  describe('set/getTimeout methods', () => {
    it('sets and retrieves session timeouts', async () => {
      const timeouts = {
        script: 30000,
        pageLoad: 60000,
        implicit: 40000
      };
      const check = {
        chrome: async () => {},
        'chrome-headless': async () => {},
        firefox: async () => {
          await session.setTimeout(timeouts);
          const retrievedTimeout = await session.getTimeout();
          expect(retrievedTimeout).toEqual(timeouts);
        },
        'internet-explorer': async () => {
          await session.setTimeout(timeouts);
          const retrievedTimeout = await session.getTimeout();
          expect(retrievedTimeout).toEqual(timeouts);
        }
      }[process.env.BROWSER];
      await check();
    });
  });
});
