import expect from 'expect';
import testEnv from '../test-env';

describe('User Prompts', () => {
  describe('dismissAlert method', () => {
    it('dismiss an alert in the current page', async () => {
      const { session } = testEnv;
      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      await session.dismissAlert();

      const result = await session.findElement('css selector', '#confirmResult');
      const resultText = await result.getText();
      expect(resultText).toEqual('No');
    });
  });

  describe('acceptAlert method', () => {
    it('accept an alert in the current page', async () => {
      const { session } = testEnv;
      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      await session.acceptAlert();

      const result = await session.findElement('css selector', '#confirmResult');
      const resultText = await result.getText();
      expect(resultText).toEqual('Yes');
    });
  });

  describe('getAlertText method', () => {
    it('get text from an alert in the current page', async () => {
      const { session } = testEnv;
      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      const alertText = await session.getAlertText();
      expect(alertText).toEqual('This is an alert for test');

      await session.acceptAlert();
    });
  });

  describe('sendAlertText method', () => {
    it('Sets the text field of a prompt', async () => {
      const { session } = testEnv;
      const alertButton = await session.findElement('css selector', '#prompt');
      await alertButton.click();

      await session.sendAlertText('Test')
      await session.acceptAlert();
      const result = await session.findElement('css selector', '#promptName');
      const resultText = await result.getText();
      expect(resultText).toEqual('Hello Test!');
    });
  });
});
