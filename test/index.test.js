/* eslint-env jest */

const { status } = require('../src');

describe('WebDriver', () => {
  it('returns server status', async () => {
    const result = await status(`http://localhost:${process.env.WEB_DRIVER_PORT}`);
    const check = {
      chrome: () => {
        expect(result.build).toBeDefined();
        expect(result.os).toBeDefined();
      },
      'chrome-headless': () => {
        expect(result.build).toBeDefined();
        expect(result.os).toBeDefined();
      },
      firefox: () => {
        expect(result.message).toBeDefined();
        expect(result.ready).toBeDefined();
      },
      phantomjs: () => {
        expect(result.build).toBeDefined();
        expect(result.os).toBeDefined();
      },
      'internet-explorer': () => {
        expect(result.build).toBeDefined();
        expect(result.os).toBeDefined();
      }
    }[process.env.BROWSER];
    check();
  });
});
