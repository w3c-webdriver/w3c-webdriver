/**
 * An object defining the cookie.
 */
export default interface IWebDriverCookie {
  /**
   * The name of the cookie.
   */
  name: string;

  /**
   * The cookie value.
   */
  value: string;

  /**
   * The cookie path. Defaults to "/" if omitted when adding a cookie.
   */
  path?: string;

  /**
   * The domain the cookie is visible to.
   * Defaults to the current browsing context’s document’s URL domain if omitted when adding a cookie.
   */
  domain?: string;

  /**
   * Whether the cookie is a secure cookie. Defaults to false if omitted when adding a cookie.
   */
  secure?: boolean;

  /**
   * Whether the cookie is an HTTP only cookie. Defaults to false if omitted when adding a cookie.
   */
  httpOnly?: boolean;

  /**
   * When the cookie expires, specified in seconds since Unix Epoch.
   * Defaults to 20 years into the future if omitted when adding a cookie.
   */
  expiry?: number;
}
