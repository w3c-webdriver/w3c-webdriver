import { browserName } from '../test-env/browser';
import { session } from '../test-env/session';

describe('Command Contexts', () => {

  describe('getWindowRect/maximizeWindow method', () => {
    it('validates window rect before and after maximizing the window', async () => {
      const rectBeforeMax = await session.getWindowRect();

      await session.maximizeWindow();

      const rectAfterMax = await session.getWindowRect();
      expect(rectBeforeMax).not.toEqual(rectAfterMax);
    });
  });

  describe('setWindowRect method', () => {
    it('set current window to specified rect', async () => {
      const testRect = { x: 9, y: 9, width: 1005, height: 705, }

      if (['chrome'].includes(browserName)) {
        return;
      }

      await session.setWindowRect(testRect);

      const rectAfterMax = await session.getWindowRect();
      expect(rectAfterMax).toEqual(testRect);
    });
  });

  describe('minimizeWindow method', () => {
    it('minimizes the current window', async () => {
      await session.maximizeWindow();
      const rectBeforeMin = await session.getWindowRect();

      await session.minimizeWindow();

      const rectAfterMin = await session.getWindowRect();
      expect(rectBeforeMin).not.toEqual(rectAfterMin);
    });
  });

  describe('FullScreenWindow method', () => {
    it('increases the current window to full screen', async () => {
      const rectBeforeFull = await session.getWindowRect();

      await session.fullScreenWindow();

      const rectAfterFull = await session.getWindowRect();
      expect(rectBeforeFull).not.toEqual(rectAfterFull);
    });
  });

});