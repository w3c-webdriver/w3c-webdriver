/* eslint-env jest */

import { session } from './session-provider';

describe('Element Retrieval', () => {
  describe('findElement method', () => {
    it('finds element by CSS selector', async () => {
      const element = await session.findElement('css selector', 'h2');
      expect(element).toBeDefined();
    });
  });
});
