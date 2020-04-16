export class WebdriverError extends Error {
  constructor(public error = '', message = '') {
    super(message);
  }
}
