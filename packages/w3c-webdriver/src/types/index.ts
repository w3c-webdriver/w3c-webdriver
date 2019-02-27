import ICookie from './cookie';
import IElement from './element';
import ISession from './session';
import IStatus from './status';
import ITimeout from './timeout';
import ILocatorStrategy from './locatorStrategy';

declare namespace WebDriver {
  type Cookie = ICookie;
  type Element = IElement;
  type LocatorStrategy = ILocatorStrategy;
  type Session = ISession;
  type Status = IStatus;
  type Timeout = ITimeout;
}

class WebDriver {}

export default WebDriver;
