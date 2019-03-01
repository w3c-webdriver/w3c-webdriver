declare module NodeJS {
  // tslint:disable-next-line:interface-name
  interface Global {
    // tslint:disable-next-line:no-any
    webDriverInstance: any;
    // tslint:disable-next-line:no-any
    sessionInstance: any;
  }
}
