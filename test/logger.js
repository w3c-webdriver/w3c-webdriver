import winston from 'winston';

winston.add(winston.transports.File, { filename: 'test.log' });

export default winston;
