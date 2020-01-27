import expect from 'expect';
import { getTestEnv } from '../test-env';

describe('Element Interaction', function() {
  describe('click method', function() {
    it('simulates mouse click on element', async function() {
      const { session } = await getTestEnv(this);
      const addButton = await session.findElement('css selector', '#add');

      await addButton.click();

      const result = await session.findElement('css selector', '#result');
      const text = await result.getText();

      expect(text).toEqual('NaN');
    });
  });

  describe('clear method', function() {
    it('clears the content of an element', async function() {
      const { session } = await getTestEnv(this);
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

  describe('sendKeys method', function() {
    it('simulates typing in element', async function() {
      const { session } = await getTestEnv(this);
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
});
