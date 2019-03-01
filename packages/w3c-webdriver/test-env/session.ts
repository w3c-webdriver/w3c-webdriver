import WebDriver from "../src";

// tslint:disable-next-line:no-object-literal-type-assertion
const target = <WebDriver.Session>{};

export default new Proxy<WebDriver.Session>(
  target,
  {
    get: (obj: object, prop: string) => {
      if (!global.sessionInstance) {
        throw new Error('WebDriver session was not created yet.');
      }

      return global.sessionInstance[prop]
    }
  }
);
