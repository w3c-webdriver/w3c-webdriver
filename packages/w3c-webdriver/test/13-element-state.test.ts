import { session } from '../test-env/session';

describe('Element State', () => {
  describe('getText method', () => {
    it('returns text from element', async () => {
      const element = await session.findElement('css selector', 'h2');
      const text = await element.getText();

      expect(text).toEqual('Simple calculator');
    });
  });

  describe('getCss method', () => {
    it('returns the provided style property of an element', async () => {
      const result = await session.findElement('css selector', '#result');
      const displayMode = await result.getCss('display');

      expect(displayMode).toEqual('flex');
    });
  });
});
