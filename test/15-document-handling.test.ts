import expect from 'expect';
import { Element } from '../src';
import { Browser, getTestEnv } from '../test-env';

describe('Document Handling', function() {
  describe('getPageSource method', function() {
    it('get the current page source', async function() {
      const { session } = await getTestEnv(this);
      const result = await session.getPageSource();

      expect(result).toContain('<title>The simple calculator</title>');
    });
  });

  describe('executeScript method', function() {
    it('executes script in browser context', async function() {
      const { session } = await getTestEnv(this);
      const result = await session.executeScript<number>(
        'return arguments[0] * arguments[1]',
        [3, 5]
      );

      expect(result).toEqual(15);
    });

    it('supports passing element as arguments', async function() {
      const { session } = await getTestEnv(this);
      const aField = await session.findElement('css selector', '#a');
      const id = await session.executeScript<number>('return arguments[0].id', [
        aField
      ]);

      expect(id).toEqual('a');
    });

    it('supports passing elements as arguments', async function() {
      const { session } = await getTestEnv(this);
      const buttons = await session.findElements('css selector', 'button');
      const result = await session.executeScript<number>(
        'return arguments[0][2].id',
        [buttons]
      );

      expect(result).toEqual('divide');
    });

    it('supports passing nested datastructures containing elements as arguments', async function() {
      const { session } = await getTestEnv(this);
      const aField = await session.findElement('css selector', '#a');
      const ids = await session.executeScript<number>(
        'return [arguments[0][0].id, arguments[1].a[1].b.id]',
        [[aField], { a: [0, { b: aField }] }]
      );

      expect(ids).toEqual(['a', 'a']);
    });

    it('supports receiving element', async function() {
      const { session } = await getTestEnv(this);
      const aField = await session.executeScript<Element>(
        `return document.querySelector('#a')`
      );

      expect(await aField.getProperty('id')).toEqual('a');
    });

    it('supports receiving elements', async function() {
      const { session } = await getTestEnv(this);
      const buttons = await session.executeScript<Element[]>(
        `return document.querySelectorAll('button')`
      );

      expect(await buttons[2].getProperty('id')).toEqual('divide');
    });

    it('supports receiving nested datastructures containing elements', async function() {
      const { session } = await getTestEnv(this);
      const result = await session.executeScript<
        [Element[], { a: { b: Element }[] }]
      >(
        `
        var aField = document.querySelector('#a');
        return [[aField], { a: [0, { b: aField }] }];
        `
      );

      expect(await result[0][0].getProperty('id')).toEqual('a');
      expect(await result[1].a[1].b.getProperty('id')).toEqual('a');
    });
  });

  describe('executeAsyncScript method', function() {
    it('executes asynchronous script in browser context', async function() {
      const { session, browser } = await getTestEnv(this);
      if (browser === Browser.InternetExplorer) {
        await session.setTimeouts({
          script: 30000
        });
      }
      const script = `
        var a = arguments[0];
        var b = arguments[1];
        var callback = arguments[arguments.length - 1];

        window.setTimeout(function () {
          callback(a * b);
        }, 1000);
      `;
      const result = await session.executeAsyncScript<number>(script, [3, 5]);
      expect(result).toBe(15);
    });
  });

  it('supports passing elements as arguments', async function() {
    const { session } = await getTestEnv(this);
    const aField = await session.findElement('css selector', '#a');
    const id = await session.executeAsyncScript<number>(
      'arguments[1](arguments[0][1].a.id)',
      [[0, { a: aField }]]
    );

    expect(id).toBe('a');
  });

  it('supports receiving nested datastructures containing elements', async function() {
    const { session } = await getTestEnv(this);
    const result = await session.executeAsyncScript<
      [Element, { a: { b: Element }[] }]
    >(
      `
      var aField = document.querySelector('#a');
      arguments[0]([aField, { a: [0, { b: aField }] }]);
      `
    );

    expect(await result[0].getProperty('id')).toEqual('a');
    expect(await result[1].a[1].b.getProperty('id')).toEqual('a');
  });
});
