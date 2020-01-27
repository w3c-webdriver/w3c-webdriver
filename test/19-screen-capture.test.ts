import expect from 'expect';
import { getTestEnv } from '../test-env';

describe('Screen Capture', function() {
  describe('takeScreenshot method', function() {
    it('takes a screenshot of the current page', async function() {
      const { session } = await getTestEnv(this);
      const screenshot = await session.takeScreenshot();
      expect(screenshot.toString('base64')).toMatch(/^iVBOR/);
    });
  });

  describe('element takeScreenshot method', function() {
    it('takes a screenshot of element', async function() {
      const { session } = await getTestEnv(this);
      const iframe = await session.findElement('css selector', 'iframe');
      const screenshot = await iframe.takeScreenshot();
      expect(screenshot.toString('base64')).toMatch(/^iVBOR/);
    });
  });
});
