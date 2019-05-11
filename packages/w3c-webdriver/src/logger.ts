import debug from 'debug';
import { format } from 'util';

// tslint:disable-next-line:export-name
export const log = debug('w3c-webdriver');

// tslint:disable-next-line: no-any
log.log = (formatt: any, ...param: any[]) => {
	return process.stdout.write(`${format(formatt, ...param)}\n`);
}
