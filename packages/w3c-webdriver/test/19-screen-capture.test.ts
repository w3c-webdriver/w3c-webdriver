// tslint:disable-next-line: match-default-export-name
import expect from 'expect';
import testEnv from '../test-env/testEnv';

describe('Screen Capture', () => {
  describe('takeScreenshot method', () => {
    it('takes a screenshot of the current page', async () => {
      const { session } = testEnv;
      const screenshot = await session.takeScreenshot();
      expect(screenshot.toString('base64')).toMatch(/^iVBOR/);
    });
  });
});
