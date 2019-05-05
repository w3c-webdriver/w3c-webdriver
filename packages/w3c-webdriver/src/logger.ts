import debug from 'debug';

const debugLogger = debug('w3c-webdriver');

type Logger = (message: string) => void;

// tslint:disable-next-line:export-name
export let log: Logger = debugLogger;

export const setLogger = (logger: Logger) => {
  log = logger;
}
