/* eslint-env jest */

const { status } = require('../src');

describe('WebDriver', () => {
    it('returns server status', async () => {
        const result = await status('http://localhost:4444');
        expect(result.message).toBeDefined();
        expect(result.ready).toBeDefined();
    });
});
