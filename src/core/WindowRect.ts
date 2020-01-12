/**
 * An object defining the Window Rect.
 * @section Contexts
 */
export type WindowRect = {
  /**
   * The screenX and screenLeft attributes must return the x-coordinate, relative to the origin of the
   * Web-exposed screen area, of the left of the client window as number of CSS pixels
   */
  x: number;

  /**
   * The screenY and screenTop attributes must return the y-coordinate, relative to the origin of the
   * screen of the Web-exposed screen area, of the top of the client window as number of CSS pixels
   */
  y: number;

  /**
   * The outerWidth attribute must return the width of the client window.
   * If there is no client window this attribute must return zero
   */
  width: number;

  /**
   * The outerWidth attribute must return the height of the client window.
   * If there is no client window this attribute must return zero
   */
  height: number;
};
