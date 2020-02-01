import expect from 'expect';
import { Key } from '../src';
import { Browser, getTestEnv } from '../test-env';

describe('Actions', function() {
  describe('performActions method', function() {
    it('performs actions', async function() {
      const { session } = await getTestEnv(this);
      const b = await session.findElement('css selector', '#b');
      const bCenter = await session.executeScript<{
        x: number;
        y: number;
      }>(
        `
        var rect = arguments[0].getBoundingClientRect();
        return {
          x: Math.round(rect.left + rect.width / 2),
          y: Math.round(rect.top + rect.height / 2)
        };
      `,
        [b]
      );
      await session.performActions([
        {
          type: 'none',
          id: 'none_id',
          actions: [{ type: 'pause', duration: 0 }]
        },
        {
          type: 'pointer',
          id: 'click on b field',
          actions: [
            { type: 'pause', duration: 0 },
            {
              type: 'pointerMove',
              ...bCenter
            },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerUp', button: 0 }
          ]
        }
      ]);
      await session.performActions([
        {
          type: 'key',
          id: 'type in 15',
          actions: [
            { type: 'pause', duration: 100 },
            { type: 'keyDown', value: '1' },
            { type: 'keyUp', value: '1' },
            { type: 'keyDown', value: '5' },
            { type: 'keyUp', value: '5' }
          ]
        }
      ]);
      await session.performActions([
        {
          type: 'pointer',
          id: 'click on a field',
          actions: [
            { type: 'pause', duration: 0 },
            {
              type: 'pointerMove',
              x: 0,
              y: 0,
              origin: await session.findElement('css selector', '#a')
            },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerUp', button: 0 }
          ]
        }
      ]);
      await session.performActions([
        {
          type: 'key',
          id: 'type in 7',
          actions: [
            { type: 'keyDown', value: '7' },
            { type: 'keyUp', value: '7' }
          ]
        }
      ]);
      await session.performActions([
        {
          type: 'pointer',
          id: 'click on add button',
          actions: [
            {
              type: 'pointerMove',
              x: 1,
              y: 1,
              origin: await session.findElement('css selector', '#add')
            },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerUp', button: 0 }
          ],
          parameters: {
            pointerType: 'mouse'
          }
        }
      ]);
      const result = await session.findElement('css selector', '#result');
      const resultText = await result.getText();
      expect(resultText).toEqual('22');
    });

    it('handles special keys', async function() {
      const { session } = await getTestEnv(this);
      const aField = await session.findElement('css selector', '#a');
      await aField.click();
      await session.performActions([
        {
          type: 'key',
          id: 'key id',
          actions: [
            { type: 'keyDown', value: 'a' },
            { type: 'keyUp', value: 'a' },
            { type: 'keyDown', value: 'b' },
            { type: 'keyUp', value: 'b' },
            { type: 'keyDown', value: 'c' },
            { type: 'keyUp', value: 'c' },
            { type: 'keyDown', value: Key.LEFT },
            { type: 'keyUp', value: Key.LEFT },
            { type: 'keyDown', value: Key.LEFT },
            { type: 'keyUp', value: Key.LEFT },
            { type: 'keyDown', value: Key.DELETE },
            { type: 'keyUp', value: Key.DELETE }
          ]
        }
      ]);
      const text = await aField.getProperty('value');
      expect(text).toEqual('ac');
    });
  });

  describe('releaseActions method', function() {
    it('releases all the keys', async function() {
      const { session } = await getTestEnv(this);
      const aField = await session.findElement('css selector', '#a');
      await aField.click();
      await session.performActions([
        {
          type: 'key',
          id: 'key id',
          actions: [{ type: 'keyDown', value: 'a' }]
        }
      ]);
      await session.releaseActions();
      const text = await aField.getProperty('value');
      expect(text).toEqual('a');
    });

    it('releases all the pointer buttons', async function() {
      const { session, browser } = await getTestEnv(this);

      if (browser === Browser.InternetExplorer || browser === Browser.Safari) {
        return;
      }

      const agreeCheckbox = await session.findElement('css selector', '#agree');
      await session.performActions([
        {
          type: 'pointer',
          id: 'pointer id',
          actions: [
            { type: 'pointerMove', x: 0, y: 0, origin: agreeCheckbox },
            { type: 'pointerDown', button: 0 }
          ]
        }
      ]);
      await session.releaseActions();
      const selected = await agreeCheckbox.isSelected();
      expect(selected).toBe(true);
    });
  });
});
