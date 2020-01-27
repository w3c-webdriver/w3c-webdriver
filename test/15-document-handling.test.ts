import expect from 'expect';
import { Browser, getTestEnv } from '../test-env';

describe('Document Handling', function() {
  describe('getPageSource method', function() {
    it('get the current page source', async function() {
      const { session } = await getTestEnv(this);
      const result = await session.getPageSource();

      expect(result).toContain('<title>The simple calculator</title>');
    });
  });

  describe('executeScript method', function() {
    it('executes script in browser context', async function() {
      const { session } = await getTestEnv(this);
      const result = await session.executeScript<number>(
        'return arguments[0] * arguments[1]',
        [3, 5]
      );

      expect(result).toBe(15);
    });
  });

  describe('executeAsyncScript method', function() {
    it('executes asynchronous script in browser context', async function() {
      const { session, browser } = await getTestEnv(this);
      if (browser === Browser.InternetExplorer) {
        await session.setTimeouts({
          script: 30000
        });
      }
      const script = `
        var a = arguments[0];
        var b = arguments[1];
        var callback = arguments[arguments.length - 1];

        window.setTimeout(function () {
          callback(a * b);
        }, 1000);
      `;
      const result = await session.executeAsyncScript<number>(script, [3, 5]);
      expect(result).toBe(15);
    });
  });
});
