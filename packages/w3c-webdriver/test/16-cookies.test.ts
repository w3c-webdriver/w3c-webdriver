// tslint:disable-next-line: match-default-export-name
import expect from 'expect';
import testEnv, { Browser } from '../test-env/testEnv';

const testCookie = {
  name: 'test_cookie',
  value: 'test_value'
};

describe('Cookies', () => {
  describe('addCookie/getAllCookies methods', () => {
    it('adds and retrieves all cookies visible to the current page', async () => {
      const { session, browser } = testEnv;

      // See:
      // https://github.com/seleniumhq/selenium/issues/962
      if (browser === Browser.InternetExplorer) {
        return;
      }

      await session.addCookie({
        ...testCookie,
        expiry: Date.now() + 60000
      });
      const cookies = await session.getAllCookies();
      expect(cookies).toEqual([expect.objectContaining({
        ...testCookie,
        httpOnly: false,
        path: '/',
        secure: false
      })]);
    });
  });

  describe('getNamedCookie method', () => {
    it('adds and retrieves a cookie by name', async () => {
      const { session, browser } = testEnv;

      // See:
      // https://github.com/seleniumhq/selenium/issues/962
      if (browser === Browser.InternetExplorer) {
        return;
      }
      await session.addCookie(testCookie);
      const cookie = await session.getNamedCookie('test_cookie');
      expect(cookie).toEqual(expect.objectContaining(testCookie));
    });
  });

  describe('deleteCookie method', () => {
    it('delete a cookie by name', async () => {
      const { session, browser } = testEnv;

      // See:
      // https://github.com/seleniumhq/selenium/issues/962
      if (browser === Browser.InternetExplorer) {
        return;
      }
      await session.addCookie(testCookie);
      await session.deleteCookie('test_cookie');

      const cookies = await session.getAllCookies();
      expect(cookies).not.toEqual([expect.objectContaining(testCookie)]);
    });
  });

  describe('deleteAllCookies method', () => {
    it('delete all cookies', async () => {
      const { session, browser } = testEnv;

      // See:
      // https://github.com/seleniumhq/selenium/issues/962
      if (browser === Browser.InternetExplorer) {
        return;
      }
      await session.addCookie(testCookie);
      await session.deleteAllCookies();

      const cookies = await session.getAllCookies();
      expect(cookies.length).toEqual(0);
    });
  });
});
