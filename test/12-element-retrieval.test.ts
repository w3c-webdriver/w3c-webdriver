import expect from 'expect';
import testEnv from '../test-env';

describe('Element Retrieval', () => {
  describe('findElement method', () => {
    it('finds element by CSS selector', async () => {
      const { session } = testEnv;
      const element = await session.findElement('css selector', 'h2');

      expect(element).toBeDefined();
    });
  });

  describe('findElements method', () => {
    it('finds all elements by CSS selector', async () => {
      const { session } = testEnv;
      const elements = await session.findElements('css selector', 'button');

      expect(elements).toHaveLength(6);
    });
  });

  describe('element findElement method', () => {
    it('finds element by CSS selector', async () => {
      const { session } = testEnv;
      const parent = await session.findElement('css selector', 'h3');
      const element = await parent.findElement('css selector', 'input');

      expect(element).toBeDefined();
    });
  });

  describe('element findElements method', () => {
    it('finds all elements by CSS selector', async () => {
      const { session } = testEnv;
      const parent = await session.findElement('css selector', '.operations');
      const elements = await parent.findElements('css selector', 'button');

      expect(elements).toHaveLength(4);
    });
  });

  describe('getActiveElement method', () => {
    it('returns the currently focused element', async () => {
      const { session } = testEnv;
      const element = await session.getActiveElement();

      expect(await element.getAttribute('autofocus')).toEqual('true');
    });
  });
});
