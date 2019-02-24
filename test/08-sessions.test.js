import session from '../test-env/session';
import { name } from '../test-env/browser';
import { status } from '../src';

describe('Sessions', () => {
  describe('status method', () => {
    it('returns server status', async () => {
      const result = await status(`http://localhost:${process.env.WEB_DRIVER_PORT}`);
      const check = {
        firefox: () => {
          expect(result.message).toBeDefined();
          expect(result.ready).toBeDefined();
        },
        safari: () => {
          console.log(result);
        }
      }[name] || (() => {
        expect(result.build).toBeDefined();
        expect(result.os).toBeDefined();
      });

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
      }[name] || (async () => {
        await session.setTimeout(timeouts);

        const retrievedTimeout = await session.getTimeout();

        expect(retrievedTimeout).toEqual(timeouts);
      });

      await check();
    });
  });
});
