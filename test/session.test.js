/* eslint-env jest */

const { session } = require('./session-provider');

describe('Session', () => {
  describe('getTitle method', () => {
    it('returns page title', async () => {
      const title = await session.getTitle();
      expect(title).toEqual('The simple calculator');
    });
  });

  describe('findElement method', () => {
    it('finds element by CSS selector', async () => {
      const element = await session.findElement('css selector', 'h2');
      expect(element).toBeDefined();
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
        chrome: async () => {
          await session.setTimeout(timeouts);
          const retrievedTimeout = await session.getTimeout();
          expect(retrievedTimeout.script).toEqual(timeouts.script);
        },
        'chrome-headless': async () => {
          await session.setTimeout(timeouts);
          const retrievedTimeout = await session.getTimeout();
          expect(retrievedTimeout.script).toEqual(timeouts.script);
        },
        firefox: async () => {
          await session.setTimeout(timeouts);
          const retrievedTimeout = await session.getTimeout();
          expect(retrievedTimeout).toEqual(timeouts);
        },
        phantomjs: async () => {},
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
