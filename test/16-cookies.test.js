import { session } from '../jest-config/session-provider';

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

      // See:
      // https://github.com/seleniumhq/selenium/issues/962
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1488225
      if (['internet-explorer', 'firefox'].includes(process.env.BROWSER)) {
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
