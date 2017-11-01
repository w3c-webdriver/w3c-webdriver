/* eslint-env jest */

import { session } from './session-provider';

describe('Cookies', () => {
  describe('addCookie/getAllCookies methods', () => {
    it('adds and retrieves all cookies visible to the current page', async () => {
      const testCookie = {
        name: 'test_cookie',
        value: 'test_value',
        domain: 'localhost'
      };

      if (process.env.BROWSER === 'phantomjs') {
        return; // See: https://github.com/detro/ghostdriver/issues/365 and https://github.com/ariya/phantomjs/issues/14047
      }

      await session.addCookie({
        ...testCookie,
        expiry: (Date.now() / 1000) + 5
      });
      const cookies = await session.getAllCookies();
      expect(cookies).toEqual([expect.objectContaining(testCookie)]);
    });
  });
});
