/* eslint-env jest */

const { session } = require('./session-provider');

describe('Session', () => {
  describe('getTitle method', () => {
    it('returns page title', async () => {
      const title = await session.getTitle();
      expect(title).toEqual('The simple calculator');
    });
  });

  describe('findElement method', () => {
    it('finds element by CSS selector', async () => {
      const element = await session.findElement('css selector', 'h2');
      expect(element).toBeDefined();
    });
  });

  // describe('getScriptTimeout methods', () => {
  //     it('retrieves script interrupt timeout', async () => {
  //         const timeout = await session.getScriptTimeout();
  //         expect(timeout).toEqual(3);
  //     });
  // });
});
