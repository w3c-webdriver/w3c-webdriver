import session from '../jest-config/session';

describe('Navigation', () => {
  describe('getTitle method', () => {
    it('returns page title', async () => {
      const title = await session.getTitle();
      expect(title).toEqual('The simple calculator');
    });
  });
});
