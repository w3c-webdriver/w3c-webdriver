import { session } from '../test-env/session';

describe('Command Contexts', () => {

  describe('getWindowRect/maximizeWindow method', () => {
    it('validates window rect before and after maximizing the window', async () => {
      let rectBefore = await session.getWindowRect();

      await session.maximizeWindow();

      let rectAfter = await session.getWindowRect();
      expect(rectBefore).not.toEqual(rectAfter);
    });
  });

  describe('minimizeWindow method', () => {
    it('minimizes the current window', async () => {
      let rectBefore = await session.getWindowRect();

      await session.minimizeWindow();

      let rectAfter = await session.getWindowRect();
      expect(rectBefore).not.toEqual(rectAfter);
    });
  });

  describe('fullScreenWindow method', () => {
    it('increases the current window to full screen', async () => {
      let rectBefore = await session.getWindowRect();

      await session.fullScreenWindow();

      let rectAfter = await session.getWindowRect();
      expect(rectBefore).not.toEqual(rectAfter);
    });
  });

});