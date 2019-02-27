import IWebDriverCookie from "./cookie";
import IWebDriverElement from "./element";
import IWebDriverSession from "./session";
import IWebDriverStatus from "./status";
import IWebDriverTimeout from "./timeout";
import WebDriverLocatorStrategy from "./locatorStrategy";

declare namespace WebDriver {
  type Cookie = IWebDriverCookie;
  type Element = IWebDriverElement;
  type LocatorStrategy = WebDriverLocatorStrategy;
  type Session = IWebDriverSession;
  type Status = IWebDriverStatus;
  type Timeout = IWebDriverTimeout;
}

export default WebDriver;
