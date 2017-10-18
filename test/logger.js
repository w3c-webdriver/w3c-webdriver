const winston = require('winston');

winston.add(winston.transports.File, { filename: 'test.log' });

module.exports = winston;
