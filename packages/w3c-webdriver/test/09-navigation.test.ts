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

      expect(currentUrl).toEqual('The simple calculator');
    });
  });
});
