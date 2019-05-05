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
      const resultText = await resultElement.getText();
      expect(resultText).toEqual('');
    });
  });
});
