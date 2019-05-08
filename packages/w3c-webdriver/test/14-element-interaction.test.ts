import { session } from '../test-env/session';

describe('Element Interaction', () => {
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

  describe('clear method', () => {
    it('clears the content of an element', async () => {
      const a = await session.findElement('css selector', '#a');
      await a.sendKeys('13');

      const b = await session.findElement('css selector', '#b');
      await b.sendKeys('7');
      await a.clear();
      const add = await session.findElement('css selector', '#add');
      await add.click();

      const result = await session.findElement('css selector', '#result');
      const resultText = await result.getText();
      expect(resultText).toEqual('NaN');
    });
  });

});
