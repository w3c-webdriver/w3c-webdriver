/* eslint-env jest */

const { session } = require('./session-provider');

describe('Element', () => {
  describe('getText method', () => {
    it('returns text from element', async () => {
      const element = await session.findElement('css selector', 'h2');
      const text = await element.getText();
      expect(text).toEqual('Simple calculator');
    });
  });

  describe('click method', () => {
    it('simulates mouse click on element', async () => {
      const addButton = await session.findElement('css selector', '#add');
      await addButton.click();
      const result = await session.findElement('css selector', '#result');
      const text = await result.getText();
      expect(text).toEqual('NaN');
    });
  });

  describe('sendKeys method', () => {
    it('simulates typing in element', async () => {
      const a = await session.findElement('css selector', '#a');
      await a.sendKeys('13');
      const b = await session.findElement('css selector', '#b');
      await b.sendKeys('7');
      const add = await session.findElement('css selector', '#add');
      await add.click();
      const result = await session.findElement('css selector', '#result');
      const resultText = await result.getText();
      expect(resultText).toEqual('20');
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
        phantomjs: () => {
          expect(backgroundColor).toEqual('rgba(211, 211, 211, 1)');
        },
        'internet-explorer': () => {
          expect(backgroundColor).toEqual('rgba(211, 211, 211, 1)');
        }
      }[process.env.BROWSER];
      check();
    });
  });
});
