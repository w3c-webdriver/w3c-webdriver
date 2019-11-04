// tslint:disable-next-line: match-default-export-name
import expect from 'expect';
import testEnv, { Browser } from '../test-env';

describe('Element State', () => {
  describe('getText method', () => {
    it('returns text from element', async () => {
      const { session } = testEnv;
      const element = await session.findElement('css selector', 'h2');
      const text = await element.getText();

      expect(text).toEqual('Simple calculator');
    });
  });

  describe('getCssValue method', () => {
    it('returns the provided style property of an element', async () => {
      const { session } = testEnv;
      const result = await session.findElement('css selector', '#result');
      const displayMode = await result.getCssValue('display');

      expect(displayMode).toEqual('flex');
    });
  });

  describe('getAttribute method', () => {
    it('returns attribute of an element', async () => {
      const { session } = testEnv;
      const element = await session.findElement('css selector', '#add');
      const elementAttribute = await element.getAttribute('class');

      expect(elementAttribute).toEqual('test');
    });
  });

  describe('getProperty method', () => {
    it('returns property of an element', async () => {
      const { session } = testEnv;
      const element = await session.findElement('css selector', '#add');
      const elementProperty = await element.getProperty('value');

      expect(elementProperty).toEqual('add');
    });
  });

  describe('getTagName method', () => {
    it('returns tagName of an element', async () => {
      const { session, browser } = testEnv;
      const element = await session.findElement('css selector', '#add');
      const elementTagName = await element.getTagName();

      if ([Browser.Safari].includes(browser)) {
        expect(elementTagName).toEqual('BUTTON');
      } else {
        expect(elementTagName).toEqual('button');;
      }
    });
  });

});
