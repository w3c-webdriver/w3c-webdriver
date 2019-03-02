// tslint:disable-next-line:import-name
import WebDriver from '../src';

interface IProxyable {
  [name: string]: Function;
}

let currentSession: IProxyable;

export const setSession = (newSession: WebDriver.Session) => {
  currentSession = <IProxyable><unknown>newSession;
};

export const session = <WebDriver.Session>new Proxy({}, {
  get: (obj: object, prop: string) => {
    if (!currentSession) {
      throw new Error('WebDriver session was not created yet.');
    }

    return currentSession[prop];
  }
});
