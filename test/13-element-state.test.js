import session from '../jest-config/session';

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
      const backgroundColor = await result.getCss('background-color');
      const check = {
        chrome: () => {
          expect(backgroundColor).toEqual('rgba(211, 211, 211, 1)');
        },
        'chrome-headless': () => {
          expect(backgroundColor).toEqual('rgba(211, 211, 211, 1)');
        },
        firefox: () => {
          expect(backgroundColor).toEqual('rgb(211, 211, 211)');
        },
        'internet-explorer': () => {
          expect(backgroundColor).toEqual('rgba(211, 211, 211, 1)');
        }
      }[process.env.BROWSER];
      check();
    });
  });
});
