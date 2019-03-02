interface IStatusOfOS {
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

interface IStatusOfWebDriver {
  /**
   * Version of driver
   */
  version: string;
}

/**
 * WebDriver status object
 */
export interface IStatus {
  message: string;
  ready: boolean;
  os: IStatusOfOS;
  build: IStatusOfWebDriver;
}
