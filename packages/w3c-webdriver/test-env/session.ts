import IWebDriverSession from "session";

export default new Proxy<IWebDriverSession>(
  {} as IWebDriverSession,
  {
    get: (obj: object, prop: string) => {
      if (!global.sessionInstance) {
        throw new Error('WebDriver session was not created yet.');
      }

      return global.sessionInstance[prop]
    }
  }
);
