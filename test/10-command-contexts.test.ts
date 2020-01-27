import expect from 'expect';
import { Browser, getTestEnv, WebDriverHost } from '../test-env';

async function createWindow(): Promise<string> {
  const { session } = await getTestEnv(this);
  const handlesBefore = await session.getWindowHandles();
  await session.executeScript(`window.open()`);
  const handlesAfter = await session.getWindowHandles();
  const newHandle = handlesAfter.find(
    (handle: string) => !handlesBefore.includes(handle)
  );

  if (!newHandle) {
    throw new Error('Creating new Window was not successful');
  }

  await session.switchToWindow(newHandle);

  return newHandle;
}

describe('Command Contexts', function() {
  describe('getWindowHandle', function() {
    it('return the current window handle', async function() {
      const { session } = await getTestEnv(this);
      const handle = await session.getWindowHandle();
      expect(handle).toMatch(/[a-zA-z0-9-]{2,}/);
    });
  });

  describe('closeWindow', function() {
    it('closes current browsing context', async function() {
      const { session } = await getTestEnv(this);
      const initialHandle = await session.getWindowHandle();
      const handlesBefore = await session.getWindowHandles();
      const newHandle = await createWindow();
      await session.closeWindow();
      const handlesAfter = await session.getWindowHandles();
      expect(handlesAfter).toEqual(handlesBefore);
      expect(handlesAfter).not.toContain(newHandle);
      await session.switchToWindow(initialHandle);
    });
  });

  describe('switchToWindow', function() {
    it('Switches to different browsing context', async function() {
      const { session } = await getTestEnv(this);
      const initialHandle = await session.getWindowHandle();
      expect(await session.getTitle()).not.toEqual('');
      const handle = await createWindow();
      await session.switchToWindow(handle);
      expect(await session.getTitle()).toEqual('');
      await session.closeWindow();
      await session.switchToWindow(initialHandle);
    });

    it('throws error if called with not existing handle', async function() {
      const { session } = await getTestEnv(this);
      let errorMessage;
      try {
        await session.switchToWindow('not existing handle');
      } catch (e) {
        if (e instanceof Error) {
          errorMessage = e.message;
        }
      }
      expect(errorMessage).toMatch(
        /no such window|Unable to locate window: not existing handle|No window found/
      );
    });
  });

  describe('switchToFrame', function() {
    it('switches browsing context to iframe specified by Element', async function() {
      const { session } = await getTestEnv(this);
      const iframe = await session.findElement('css selector', 'iframe');
      await session.switchToFrame(iframe);
      const paragraph = await session.findElement('css selector', 'p');
      expect(await paragraph.getText()).toEqual('The content of the iframe');
    });

    it('switches to top-level browsing context if null is provided', async function() {
      const { session } = await getTestEnv(this);
      await session.switchToFrame(
        await session.findElement('css selector', 'iframe')
      );
      expect(await session.getPageSource()).not.toContain('<iframe');
      await session.switchToFrame(null);
      expect(await session.getPageSource()).toContain('<iframe');
    });
  });

  describe('switchToParentFrame', function() {
    it('switches to parent browsing context ', async function() {
      const { session } = await getTestEnv(this);
      await session.switchToFrame(
        await session.findElement('css selector', 'iframe')
      );
      expect(await session.getPageSource()).not.toContain('<iframe');
      await session.switchToParentFrame();
      expect(await session.getPageSource()).toContain('<iframe');
    });
  });

  describe('getWindowHandles', function() {
    it('return all window handles', async function() {
      const { session } = await getTestEnv(this);
      const handles = await session.getWindowHandles();
      expect(handles).toHaveLength(1);
      expect(handles[0]).toMatch(/[a-zA-z0-9-]{2,}/);
    });
  });

  describe('getWindowRect/maximizeWindow method', function() {
    it('validates window rect before and after maximizing the window', async function() {
      const { session, driver, headless } = await getTestEnv(
        this.test.fullTitle()
      );

      if (driver.host === WebDriverHost.BrowserStack || headless) {
        return;
      }

      const rectBeforeMax = await session.getWindowRect();

      await session.maximizeWindow();

      const rectAfterMax = await session.getWindowRect();
      expect(rectBeforeMax).not.toEqual(rectAfterMax);
    });
  });

  describe('setWindowRect method', function() {
    it('set current window to specified rect', async function() {
      const { session } = await getTestEnv(this);
      const testRect = { x: 25, y: 25, width: 520, height: 520 };

      await session.setWindowRect(testRect);

      const rectAfterMax = await session.getWindowRect();
      expect(rectAfterMax).toEqual(testRect);
    });
  });

  describe('minimizeWindow method', function() {
    it('minimizes the current window', async function() {
      const { session, browser, headless } = await getTestEnv(
        this.test.fullTitle()
      );
      if (browser === Browser.Safari || headless) {
        return;
      }
      await session.maximizeWindow();
      const rectBeforeMin = await session.getWindowRect();

      await session.minimizeWindow();

      const rectAfterMin = await session.getWindowRect();
      expect(rectBeforeMin).not.toEqual(rectAfterMin);
    });
  });

  describe('fullScreenWindow method', function() {
    it('increases the current window to full screen', async function() {
      const { session, browser, headless } = await getTestEnv(
        this.test.fullTitle()
      );

      if (browser === Browser.Safari || headless) {
        return;
      }
      const rectBeforeFull = await session.getWindowRect();

      await session.fullScreenWindow();

      const rectAfterFull = await session.getWindowRect();
      expect(rectBeforeFull).not.toEqual(rectAfterFull);
    });
  });
});
