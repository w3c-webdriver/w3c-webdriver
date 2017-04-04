const chai = require('chai');
chai.should();
const webDriver = require('../src');

const baseUrl = 'http://localhost:9515';

async function tearDownSession(session) {
  if (session) {
    await session.deleteSession();
  }
}

async function testSummarizeInputs() {
  let session;
  try {
    //GIVEN
    session = await webDriver(baseUrl, {
      browserName: 'Chrome'
    });
    await session.go('http://localhost:8087');

    //WHEN
    await (await session.findElement('#a')).sendKeys('15');
    await (await session.findElement('#b')).sendKeys('6');
    await (await session.findElement('#add')).click();
    const text = await (await session.findElement('#result')).getText();

    //THEN
    text.should.equal('21');
  } catch (err) {
    throw err;
  } finally {
    await tearDownSession(session);
  }
}

async function testTitle() {
  let session;
  try {
    //GIVEN
    session = await webDriver(baseUrl, {
      browserName: 'Chrome'
    });
    await session.go('http://localhost:8087');

    //WHEN
    const title = await session.getTitle();

    //THEN
    title.should.equal('title');
  } catch (err) {
    throw err;
  } finally {
    await tearDownSession(session);
  }
}

function init() {
  testSummarizeInputs().catch(err => console.error(err));
  testTitle().catch(err => console.error(err));
}

init();