type StatusOfOS = {
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

type StatusOfWebDriver = {
  /**
   * Version of driver
   */
  version: string;
}

/**
 * WebDriver status object
 */
export type Status = {
  message: string;
  ready: boolean;
  os: StatusOfOS;
  build: StatusOfWebDriver;
}
