/* eslint-env jest */

import { session } from './session-provider';

describe('Cookies', () => {
  describe('addCookie/getAllCookies methods', () => {
    it('adds and retrieves all cookies visible to the current page', async () => {
      const testCookie = {
        name: 'test_cookie',
        value: 'test_value',
        path: '/',
        domain: 'localhost',
        secure: false,
        httpOnly: true
      };

      // See: https://github.com/detro/ghostdriver/issues/365 and https://github.com/ariya/phantomjs/issues/14047
      if (process.env.BROWSER === 'phantomjs') {
        return;
      }

      await session.addCookie({
        ...testCookie,
        expiry: Date.now() + 60000
      });
      const cookies = await session.getAllCookies();
      expect(cookies).toEqual([expect.objectContaining(testCookie)]);
    });
  });
});
