import { session } from '../test-env/session';

describe('Navigation', () => {
  describe('getTitle method', () => {
    it('returns page title', async () => {
      const title = await session.getTitle();

      expect(title).toEqual('The simple calculator');
    });
  });

  describe('getCurrentUrl method', () => {
    it('returns current url', async () => {
      const currentUrl = await session.getCurrentUrl();

      expect(currentUrl).toEqual(`http://localhost:${process.env.TEST_APP_PORT}/`);
    });
  });

  describe('back method', () => {
    it('navigate to previous url from history', async () => {
      const currentUrlBefore = await session.getCurrentUrl();
      expect(currentUrlBefore).toEqual(`http://localhost:${process.env.TEST_APP_PORT}/`);
      await session.go(`${currentUrlBefore}#test`);

      await session.back();

      const currentUrlAfter = await session.getCurrentUrl();
      expect(currentUrlAfter).toEqual(currentUrlBefore);
    });
  });

  describe('forward method', () => {
    it('navigate forward to next url from history', async () => {
      const actualUrl = await session.getCurrentUrl();
      expect(actualUrl).toEqual(`http://localhost:${process.env.TEST_APP_PORT}/`);
      await session.go(`${actualUrl}#test`);

      await session.back();
      const currentUrlAfterBack = await session.getCurrentUrl();
      expect(currentUrlAfterBack).toEqual(actualUrl);

      await session.forward();
      const currentUrlAfterForward = await session.getCurrentUrl();
      expect(currentUrlAfterForward).toEqual(`${actualUrl}#test`);
    });
  });

  describe('refresh method', () => {
    it('refresh the current page', async () => {
      const currentUrlBefore = await session.getCurrentUrl();
      expect(currentUrlBefore).toEqual(`http://localhost:${process.env.TEST_APP_PORT}/`);

      const a = await session.findElement('css selector', '#a');
      await a.sendKeys('13');
      const b = await session.findElement('css selector', '#b');
      await b.sendKeys('7');
      const add = await session.findElement('css selector', '#add');
      await add.click();
      const resultElement = await session.findElement('css selector', '#result');
      const resultTextBefore = await resultElement.getText();
      expect(resultTextBefore).toEqual('20');

      await session.refresh();
      const currentUrlAfter = await session.getCurrentUrl();
      expect(currentUrlAfter).toEqual(currentUrlBefore);
      const result = await session.findElement('css selector', '#result');
      const resultText = await result.getText();
      expect(resultText).toEqual('');
    });
  });

  describe('dismiss alert method', () => {
    it('dismiss an alert in the current page', async () => {
      const actualUrl = await session.getCurrentUrl();
      expect(actualUrl).toEqual(`http://localhost:${process.env.TEST_APP_PORT}/`);
      
      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      await session.dismissAlert();

      const result = await session.findElement('css selector', '#confirmResult');
      const resultText = await result.getText();
      expect(resultText).toEqual('No');
    });
  });

  describe('accept alert method', () => {
    it('accept an alert in the current page', async () => {
      const actualUrl = await session.getCurrentUrl();
      expect(actualUrl).toEqual(`http://localhost:${process.env.TEST_APP_PORT}/`);
      
      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      await session.acceptAlert();

      const result = await session.findElement('css selector', '#confirmResult');
      const resultText = await result.getText();
      expect(resultText).toEqual('Yes');
    });
  });

  describe('get alert text', () => {
    it('get text from an alert in the current page', async () => {
      const actualUrl = await session.getCurrentUrl();
      expect(actualUrl).toEqual(`http://localhost:${process.env.TEST_APP_PORT}/`);
      
      const alertButton = await session.findElement('css selector', '#confirm');
      await alertButton.click();

      const alertText = await session.getAlertText();
      expect(alertText).toEqual('This is an alert for test');

      await session.acceptAlert();

      const result = await session.findElement('css selector', '#confirmResult');
      const resultText = await result.getText();
      expect(resultText).toEqual('Yes');
    });
  });
});
