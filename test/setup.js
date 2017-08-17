/* eslint-env jest */

const sessionProvider = require('./session-provider');
// const geckodriver = require('geckodriver');
// const testApp = require('../test-app');

beforeAll(async () => {
    // console.log('beforeAll');
    // await new Promise((resolve, reject) => {
    //     geckodriver.start((error) => {
    //         if (error) {
    //             reject(error);
    //             return;
    //         }

    //         resolve();
    //     });
    // });
    // await testApp.start();
    await sessionProvider.start();
});

beforeEach(async () => {
    await sessionProvider.session.go('http://localhost:8087');
});

afterAll(async () => {
    await sessionProvider.stop();
    // geckodriver.stop();
    // await testApp.stop();
});
