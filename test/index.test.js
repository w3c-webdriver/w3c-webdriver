const webDriver = require('../src');

const baseUrl = 'http://localhost:9515';

webDriver(baseUrl, {
  browserName: 'Chrome'
})
.then(session => session.deleteSession())
.catch(err => console.error(err));
