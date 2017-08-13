/* eslint-env jest */

const { status } = require('../src');

describe('WebDriver', () => {
    it('returns server status', async () => {
        const result = await status('http://localhost:4444');
        expect(result.build.version).toBeDefined();
        expect(result.os).toBeDefined();
    });
});
