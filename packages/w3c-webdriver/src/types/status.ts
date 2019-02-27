interface IWebDriverStatusOS {
  /**
   * Name of operating system
   */
  name: string;

  /**
   * Version of operating system
   */
  version: string;

  /**
   * Operating system architecture
   */
  arch: string;
}

interface IWebDriverStatusWebDriver {
  /**
   * Version of driver
   */
  version: string;
}

/**
 * WebDriver status object
 */
export default interface IWebDriverStatus {
  message: string;
  ready: boolean;
  os: IWebDriverStatusOS;
  build: IWebDriverStatusWebDriver;
}
