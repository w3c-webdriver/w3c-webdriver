import expect from 'expect';
import testEnv, { Browser } from '../test-env';

describe('Actions', () => {
  describe('performActions method', () => {
    it('performs actions', async () => {
      const { session } = testEnv;
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
            { type: 'pointerMove', x: 118, y: 121 },
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
            { type: 'pointerMove', x: 0, y: 0, origin: await session.findElement('css selector', '#a') },
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
            { type: 'pointerMove', x: 1, y: 1, origin: await session.findElement('css selector', '#add') },
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
  });
});
