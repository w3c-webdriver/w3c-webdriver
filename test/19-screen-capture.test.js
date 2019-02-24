import session from '../test-env/session';

describe('Screen Capture', () => {
  describe('takeScreenshot method', () => {
    it('takes a screenshot of the current page', async () => {
      const screenshot = await session.takeScreenshot();
      expect(screenshot.toString('base64')).toMatch(/^iVBOR/);
    });
  });
});
