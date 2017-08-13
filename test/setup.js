/* eslint-env jest */

const sessionProvider = require('./session-provider');
const phantomjs = require('phantomjs-prebuilt');
const testApp = require('../test-app');

let phantomjsProcess;

beforeAll(async () => {
    phantomjsProcess = await phantomjs.run('--webdriver=4444');
    await testApp.start();
    await sessionProvider.start();
});

beforeEach(async () => {
    await sessionProvider.session.go('http://localhost:8087');
});

afterAll(async () => {
    await sessionProvider.stop();
    phantomjsProcess.kill();
    await testApp.stop();
});
