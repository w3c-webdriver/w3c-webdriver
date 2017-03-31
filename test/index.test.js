const webDriver = require('../src');

let session;
const baseUrl = 'http://localhost:9515';

webDriver(baseUrl, {
  browserName: 'Chrome'
})
.then(s => session = s)
.then(() => session.go('http://localhost:8087'))
.then(() => session.getTitle())
.then(title => console.log(title))
.then(() => session.findElement('#a'))
.then(body => console.log(body))
.then(() => session.deleteSession())
.catch(err => console.error(err));
