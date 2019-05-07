// tslint:disable-next-line:import-name
import { Session } from '../src';

interface IProxyable {
  [name: string]: Function;
}

let currentSession: IProxyable;

export const setSession = (newSession: Session) => {
  currentSession = <IProxyable><unknown>newSession;
};

export const session = <Session>new Proxy({}, {
  get: (obj: object, prop: string) => {
    if (!currentSession) {
      throw new Error('WebDriver session was not created yet.');
    }

    return currentSession[prop];
  }
});
