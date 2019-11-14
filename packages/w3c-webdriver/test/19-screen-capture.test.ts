import expect from 'expect';
import testEnv from '../test-env';

describe('Screen Capture', () => {
  describe('takeScreenshot method', () => {
    it('takes a screenshot of the current page', async () => {
      const { session } = testEnv;
      const screenshot = await session.takeScreenshot();
      expect(screenshot.toString('base64')).toMatch(/^iVBOR/);
    });
  });

  describe('takeElementScreenshot method', () => {
    it('takes a screenshot of element', async () => {
      const { session } = testEnv;
      const iframe = await session.findElement('css selector', 'iframe');
      const screenshot = await iframe.takeElementScreenshot();
      expect(screenshot.toString('base64')).toMatch(/^iVBOR/);
    });
  });
});
