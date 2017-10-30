/* eslint-env jest */

import { session } from './session-provider';

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
        chrome: async () => {},
        'chrome-headless': async () => {},
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

  describe('getPageSource method', () => {
    it('get the current page source', async () => {
      const result = await session.getPageSource();
      expect(result).toContain('<title>The simple calculator</title>');
    });
  });

  describe('executeScript method', () => {
    it('executes script in browser context', async () => {
      // eslint-disable-next-line no-template-curly-in-string
      const result = await session.executeScript('return arguments[0] * arguments[1]', [3, 5]);
      expect(result).toBe(15);
    });
  });

  describe('takeScreenshot method', () => {
    it('takes a screenshot of the current page', async () => {
      const screenshot = await session.takeScreenshot();
      expect(screenshot.toString('base64')).toMatch(/^iVBOR/);
    });
  });
});
