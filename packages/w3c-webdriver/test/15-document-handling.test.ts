import expect from 'expect';
import testEnv, { Browser } from '../test-env';

describe('Document Handling', () => {
  describe('getPageSource method', () => {
    it('get the current page source', async () => {
      const { session } = testEnv;
      const result = await session.getPageSource();

      expect(result).toContain('<title>The simple calculator</title>');
    });
  });

  describe('executeScript method', () => {
    it('executes script in browser context', async () => {
      const { session } = testEnv;
      // eslint-disable-next-line no-template-curly-in-string
      const result = await session.executeScript('return arguments[0] * arguments[1]', [3, 5]);

      expect(result).toBe(15);
    });
  });

  describe('executeAsyncScript method', () => {
    it('executes asynchronous script in browser context', async () => {
      const { session, browser } = testEnv;
      // eslint-disable-next-line no-template-curly-in-string
      if (browser === Browser.InternetExplorer) {
        await session.setTimeout({
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
      const result = await session.executeAsyncScript(script, [3, 5]);
      expect(result).toBe(15);
    });
  });
});
