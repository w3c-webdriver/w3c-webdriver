/**
 * @section Sessions
 */
export type StatusOfOS = {
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

/**
 * @section Sessions
 */
export type StatusOfWebDriver = {
  /**
   * Version of driver
   */
  version: string;
}

/**
 * WebDriver status object
 * @section Sessions
 */
export type Status = {
  message: string;
  ready: boolean;
  os: StatusOfOS;
  build: StatusOfWebDriver;
}
