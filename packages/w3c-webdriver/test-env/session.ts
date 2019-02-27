import WebDriver from "../src";

export default new Proxy<WebDriver.Session>(
  {} as WebDriver.Session,
  {
    get: (obj: object, prop: string) => {
      if (!global.sessionInstance) {
        throw new Error('WebDriver session was not created yet.');
      }

      return global.sessionInstance[prop]
    }
  }
);
