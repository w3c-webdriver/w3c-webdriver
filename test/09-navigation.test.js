import session from '../test-env/session';

describe('Navigation', () => {
  describe('getTitle method', () => {
    it('returns page title', async () => {
      const title = await session.getTitle();

      expect(title).toEqual('The simple calculator');
    });
  });
});
