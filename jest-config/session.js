export default new Proxy(
  {},
  {
    get: (obj, prop) => global.sessionInstance[prop],
  }
);
