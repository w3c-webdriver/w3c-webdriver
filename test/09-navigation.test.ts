import expect from 'expect';
import { getTestEnv } from '../test-env';

function removeHash(url: string): string {
  return url.replace(/#.*$/, '');
}

describe('Navigation', function () {
  describe('getTitle method', function () {
    it('returns page title', async function () {
      const { session } = await getTestEnv(this);
      const title = await session.getTitle();

      expect(title).toEqual('The simple calculator');
    });
  });

  describe('getCurrentUrl method', function () {
    it('returns current url', async function () {
      const { session } = await getTestEnv(this);
      const currentUrl = removeHash(await session.getCurrentUrl());

      expect(currentUrl).toEqual(
        `http://localhost:${process.env.TEST_APP_PORT ?? ''}/`
      );
    });
  });

  describe('back method', function () {
    it('navigate to previous url from history', async function () {
      const { session } = await getTestEnv(this);
      const currentUrlBefore = removeHash(await session.getCurrentUrl());
      await session.navigateTo(`${currentUrlBefore}#test`);
      await session.back();
      const currentUrlAfter = removeHash(await session.getCurrentUrl());
      expect(currentUrlAfter).toEqual(currentUrlBefore);
    });
  });

  describe('forward method', function () {
    it('navigate forward to next url from history', async function () {
      const { session } = await getTestEnv(this);
      const actualUrl = removeHash(await session.getCurrentUrl());
      await session.navigateTo(`${actualUrl}#test`);
      await session.back();
      await session.forward();
      const currentUrlAfterForward = await session.getCurrentUrl();
      expect(currentUrlAfterForward).toEqual(`${actualUrl}#test`);
    });
  });

  describe('refresh method', function () {
    it('refresh the current page', async function () {
      const { session } = await getTestEnv(this);

      const a = await session.findElement('css selector', '#a');
      await a.sendKeys('13');
      const b = await session.findElement('css selector', '#b');
      await b.sendKeys('7');
      const add = await session.findElement('css selector', '#add');
      await add.click();
      await session.refresh();
      const currentUrl = removeHash(await session.getCurrentUrl());
      expect(currentUrl).toEqual(
        `http://localhost:${process.env.TEST_APP_PORT ?? ''}/`
      );
      const result = await session.findElement('css selector', '#result');
      const resultText = await result.getText();
      expect(resultText).toEqual('');
    });
  });
});
