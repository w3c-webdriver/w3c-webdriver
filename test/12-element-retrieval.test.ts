import expect from 'expect';
import { getTestEnv } from '../test-env';

describe('Element Retrieval', function() {
  describe('findElement method', function() {
    it('finds element by CSS selector', async function() {
      const { session } = await getTestEnv(this);
      const element = await session.findElement('css selector', 'h2');

      expect(element).toBeDefined();
    });
  });

  describe('findElements method', function() {
    it('finds all elements by CSS selector', async function() {
      const { session } = await getTestEnv(this);
      const elements = await session.findElements('css selector', 'button');

      expect(elements).toHaveLength(6);
    });
  });

  describe('element findElement method', function() {
    it('finds element by CSS selector', async function() {
      const { session } = await getTestEnv(this);
      const parent = await session.findElement('css selector', 'h3');
      const element = await parent.findElement('css selector', 'input');

      expect(element).toBeDefined();
    });
  });

  describe('element findElements method', function() {
    it('finds all elements by CSS selector', async function() {
      const { session } = await getTestEnv(this);
      const parent = await session.findElement('css selector', '.operations');
      const elements = await parent.findElements('css selector', 'button');

      expect(elements).toHaveLength(4);
    });
  });

  describe('getActiveElement method', function() {
    it('returns the currently focused element', async function() {
      const { session } = await getTestEnv(this);
      const a = await session.findElement('css selector', '#a');
      await a.click();
      const element = await session.getActiveElement();
      expect(element.getWebElement()).toEqual(a.getWebElement());
    });
  });
});
