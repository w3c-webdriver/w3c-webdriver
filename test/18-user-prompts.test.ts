import expect from 'expect';
import { getTestEnv } from '../test-env';

describe('User Prompts', function() {
  describe('dismissAlert method', function() {
    it('dismiss an alert in the current page', async function() {
      const { session } = await getTestEnv(this);
      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      await session.dismissAlert();

      const result = await session.findElement(
        'css selector',
        '#confirmResult'
      );
      const resultText = await result.getText();
      expect(resultText).toEqual('No');
    });
  });

  describe('acceptAlert method', function() {
    it('accept an alert in the current page', async function() {
      const { session } = await getTestEnv(this);
      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      await session.acceptAlert();

      const result = await session.findElement(
        'css selector',
        '#confirmResult'
      );
      const resultText = await result.getText();
      expect(resultText).toEqual('Yes');
    });
  });

  describe('getAlertText method', function() {
    it('get text from an alert in the current page', async function() {
      const { session } = await getTestEnv(this);
      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      const alertText = await session.getAlertText();
      expect(alertText).toEqual('This is an alert for test');

      await session.acceptAlert();
    });
  });

  describe('sendAlertText method', function() {
    it('Sets the text field of a prompt', async function() {
      const { session } = await getTestEnv(this);
      const alertButton = await session.findElement('css selector', '#prompt');
      await alertButton.click();

      await session.sendAlertText('Test');
      await session.acceptAlert();
      const result = await session.findElement('css selector', '#promptName');
      const resultText = await result.getText();
      expect(resultText).toEqual('Hello Test!');
    });
  });
});
