/* eslint-env jest */
const phantomjs = require('phantomjs-prebuilt');
const { newSession } = require('../src');
const testApp = require('../test-app');

let session;
let phantomjsProcess;

describe('Session', () => {
    describe('getTitle method', () => {
        it('should return page title', async () => {
            const title = await session.getTitle();
            expect(title).toEqual('title');
        });
    });

    describe('findElement method', () => {
        it('should find element by CSS selector', async () => {
            const element = await session.findElement('css', 'h2');
            expect(element).toBeDefined();
        });
    });
});

describe('Element', () => {
    describe('getText method', () => {
        it('should return text from element', async () => {
            const element = await session.findElement('css', 'h2');
            const text = await element.getText();
            expect(text).toEqual('Simple calculator');
        });
    });

    describe('click method', () => {
        it('should simulate mouse click on element', async () => {
            const element = await session.findElement('css', '#before-features');
            await element.click();
            const hookResult = await session.findElement('css', '#hook-result');
            const text = await hookResult.getText();
            expect(text).toEqual('<F');
        });
    });

    describe('sendKeys method', () => {
        it('should simulate typing in element', async () => {
            const a = await session.findElement('css', '#a');
            await a.sendKeys('13');
            const b = await session.findElement('css', '#b');
            await b.sendKeys('7');
            const add = await session.findElement('css', '#add');
            await add.click();
            const result = await session.findElement('css', '#result');
            const resultText = await result.getText();
            expect(resultText).toEqual('20');
        });
    });
});

beforeAll(async () => {
    phantomjsProcess = await phantomjs.run('--webdriver=4444');
    await testApp.start();
    session = await newSession('http://localhost:4444', {
        browserName: 'Chrome'
    });
    await session.go('http://localhost:8087');
});

afterAll(async () => {
    await session.delete();
    phantomjsProcess.kill();
    await testApp.stop();
});
