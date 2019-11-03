// tslint:disable-next-line: match-default-export-name
import expect from 'expect';
import { testEnvironment } from '../test-env/testEnv';

describe('Screen Capture', () => {
  describe('takeScreenshot method', () => {
    it('takes a screenshot of the current page', async () => {
      const { session } = testEnvironment;
      const screenshot = await session.takeScreenshot();
      expect(screenshot.toString('base64')).toMatch(/^iVBOR/);
    });
  });
});
