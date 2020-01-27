import expect from 'expect';
import { Browser, getTestEnv } from '../test-env';

describe('Element State', function() {
  describe('isSelected method', function() {
    it('returns true for selected checkbox', async function() {
      const { session } = await getTestEnv(this);
      const checkBox = await session.findElement('css selector', '#agree');
      await checkBox.click();
      const selected = await checkBox.isSelected();

      expect(selected).toBe(true);
    });

    it('returns false for not selected checkbox', async function() {
      const { session } = await getTestEnv(this);
      const checkBox = await session.findElement('css selector', '#agree');
      const selected = await checkBox.isSelected();

      expect(selected).toBe(false);
    });
  });

  describe('getAttribute method', function() {
    it('returns attribute of an element', async function() {
      const { session } = await getTestEnv(this);
      const element = await session.findElement('css selector', '#add');
      const elementAttribute = await element.getAttribute('class');

      expect(elementAttribute).toEqual('test');
    });
  });

  describe('getProperty method', function() {
    it('returns property of an element', async function() {
      const { session } = await getTestEnv(this);
      const element = await session.findElement('css selector', '#add');
      const elementProperty = await element.getProperty('value');

      expect(elementProperty).toEqual('add');
    });
  });

  describe('getCssValue method', function() {
    it('returns the provided style property of an element', async function() {
      const { session } = await getTestEnv(this);
      const result = await session.findElement('css selector', '#result');
      const displayMode = await result.getCssValue('display');

      expect(displayMode).toEqual('flex');
    });
  });

  describe('getText method', function() {
    it('returns text from element', async function() {
      const { session } = await getTestEnv(this);
      const element = await session.findElement('css selector', 'h2');
      const text = await element.getText();

      expect(text).toEqual('Simple calculator');
    });
  });

  describe('getTagName method', function() {
    it('returns tagName of an element', async function() {
      const { session, browser } = await getTestEnv(this);
      const element = await session.findElement('css selector', '#add');
      const elementTagName = await element.getTagName();

      if ([Browser.Safari].includes(browser)) {
        expect(elementTagName).toEqual('BUTTON');
      } else {
        expect(elementTagName).toEqual('button');
      }
    });
  });

  describe('getRect method', function() {
    it('returns the dimensions and coordinates of an element', async function() {
      const { session } = await getTestEnv(this);
      const box = await session.findElement('css selector', '#fixed-box');
      const rect = await box.getRect();

      expect(rect).toEqual({ x: 300, y: 10, width: 100, height: 50 });
    });
  });

  describe('isEnabled method', function() {
    it('returns true if input field is enabled', async function() {
      const { session } = await getTestEnv(this);
      const inputA = await session.findElement('css selector', '#a');
      const selected = await inputA.isEnabled();

      expect(selected).toBe(true);
    });

    it('returns false if input field is disabled', async function() {
      const { session } = await getTestEnv(this);
      const disabledInput = await session.findElement(
        'css selector',
        '#disabled'
      );
      const selected = await disabledInput.isEnabled();

      expect(selected).toBe(false);
    });
  });
});
