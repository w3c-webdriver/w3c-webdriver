import { session } from '../test-env/session';

describe('Element Retrieval', () => {
  describe('findElement method', () => {
    it('finds element by CSS selector', async () => {
      const element = await session.findElement('css selector', 'h2');

      expect(element).toBeDefined();
    });
  });

  describe('findElements method', () => {
    it('finds all elements by CSS selector', async () => {
      const elements = await session.findElements('css selector', 'button');

      expect(elements).toHaveLength(6);
    });
  });
});
