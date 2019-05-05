import { session } from '../test-env/session';

describe('Navigation', () => {
  describe('getTitle method', () => {
    it('returns page title', async () => {
      const title = await session.getTitle();

      expect(title).toEqual('The simple calculator');
    });
  });

  describe('getCurrentUrl method', () => {
    it('returns current url', async () => {
      const currentUrl = await session.getCurrentUrl();

      expect(currentUrl).toEqual(`http://localhost:${process.env.TEST_APP_PORT}/`);
    });
  });

  describe('back method', () => {
    it('navigate to previous url from history', async () => {
      const currentUrlBefore = await session.getCurrentUrl();
      await session.go(`${currentUrlBefore}/#test`);

      await session.back();
      
      const currentUrlAfter = await session.getCurrentUrl();
      expect(currentUrlAfter).toEqual(`http://localhost:${process.env.TEST_APP_PORT}/`);
    });
  });
});
