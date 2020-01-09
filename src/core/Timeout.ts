/**
 * WebDriver Timeout configuration object
 * @section Timeouts
 */
export type Timeout = {
  /**
   * Session script timeout in milliseconds.
   * Determines when to interrupt a script that is being evaluated.
   */
  script?: number;

  /**
   * Session page load timeout in milliseconds.
   * Provides the timeout limit used to interrupt navigation of the browsing context.
   */
  pageLoad?: number;

  /**
   * Session implicit wait timeout in milliseconds.
   * Gives the timeout of when to abort locating an element.
   */
  implicit?: number;
}
