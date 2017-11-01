/* eslint-env jest */

import { session } from './session-provider';

describe('Navigation', () => {
  describe('getTitle method', () => {
    it('returns page title', async () => {
      const title = await session.getTitle();
      expect(title).toEqual('The simple calculator');
    });
  });
});
