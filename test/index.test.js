const webDriver = require('../src');

let session;
const baseUrl = 'http://localhost:9515';

async function test() {
  const session = await webDriver(baseUrl, {
    browserName: 'Chrome'
  });
  await session.go('http://localhost:8087');
  const title = await session.getTitle();
  console.log(title);
  await (await session.findElement('#a')).sendKeys('15');
  await (await session.findElement('#b')).sendKeys('6');
  await (await session.findElement('#add')).click();
  const text = await (await session.findElement('#result')).getText();
  console.log(text);
  await session.deleteSession();
}


test().catch(err => console.error(err));
