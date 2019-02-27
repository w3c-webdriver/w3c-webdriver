interface StatusOfOS {
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

interface StatusOfWebDriver {
  /**
   * Version of driver
   */
  version: string;
}

/**
 * WebDriver status object
 */
export default interface Status {
  message: string;
  ready: boolean;
  os: StatusOfOS;
  build: StatusOfWebDriver;
}
