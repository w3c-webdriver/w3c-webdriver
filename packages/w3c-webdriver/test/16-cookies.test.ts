import { browserName } from '../test-env/browser';
import { session } from '../test-env/session';

describe('Cookies', () => {
  describe('addCookie/getAllCookies methods', () => {
    it('adds and retrieves all cookies visible to the current page', async () => {
      const testCookie = {
        name: 'test_cookie',
        value: 'test_value',
        path: '/',
        domain: '.localhost',
        secure: false,
        httpOnly: true
      };

      // See:
      // https://github.com/seleniumhq/selenium/issues/962
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1488225
      if (['internet explorer', 'firefox'].includes(browserName)) {
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

  describe('getCookie method', () => {
    it('adds and retrieves a cookie by name', async () => {
      const testCookie = {
        name: 'cookie_name',
        value: 'cookie_value',
        path: '/',
        domain: '.localhost',
        secure: false,
        httpOnly: true
      };

      // See:
      // https://github.com/seleniumhq/selenium/issues/962
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1488225
      if (['internet explorer', 'firefox'].includes(browserName)) {
        return;
      }
      await session.addCookie({
        ...testCookie,
      });
      const cookie = await session.getCookie('cookie_name');
      expect(cookie).toEqual({...testCookie});
    });
  });

  describe('deleteCookie method', () => {
    it('delete a cookie by name', async () => {
      const testCookie = {
        name: 'cookie_name',
        value: 'cookie_value',
        path: '/',
        domain: '.localhost',
        secure: false,
        httpOnly: true
      };

      // See:
      // https://github.com/seleniumhq/selenium/issues/962
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1488225
      if (['internet explorer', 'firefox'].includes(browserName)) {
        return;
      }
      await session.addCookie({
        ...testCookie,
      });
      await session.deleteCookie('cookie_name');

      const cookies = await session.getAllCookies();
      expect(cookies).not.toEqual([expect.objectContaining(testCookie)]);
    });
  });
});
