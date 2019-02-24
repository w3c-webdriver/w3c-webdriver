export default new Proxy(
  {},
  {
    get: (obj, prop) => {
      if (!global.sessionInstance) {
        throw new Error('WebDriver session was not created yet.');
      }

      return global.sessionInstance[prop]
    }
  }
);
