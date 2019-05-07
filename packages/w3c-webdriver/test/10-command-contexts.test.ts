import { session } from '../test-env/session';

describe('Command Contexts', () => {

  describe('getWindowRect/maximizeWindow method', () => {
    it('validates window rect before and after maximizing the window', async () => {
      let rectBeforeMax = await session.getWindowRect();

      await session.maximizeWindow();

      let rectAfterMax = await session.getWindowRect();
      expect(rectBeforeMax).not.toEqual(rectAfterMax);
    });
  });

  describe('minimizeWindow method', () => {
    it('minimizes the current window', async () => {
      let rectBeforeMin = await session.getWindowRect();

      await session.minimizeWindow();

      let rectAfterMin = await session.getWindowRect();
      expect(rectBeforeMin).not.toEqual(rectAfterMin);
    });
  });

  describe('fullScreenWindow method', () => {
    it('increases the current window to full screen', async () => {
      let rectBeforeFull = await session.getWindowRect();

      await session.fullScreenWindow();

      let rectAfterFull = await session.getWindowRect();
      expect(rectBeforeFull).not.toEqual(rectAfterFull);
    });
  });

});