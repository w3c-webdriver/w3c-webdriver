/**
 * An object defining the Element Rect.
 * @section Elements
 */
export type ElementRect = {
  /**
   * X axis position of the top-left corner of the element relative to the current browsing context’s document element in CSS pixels
   */
  x: number;

  /**
   * Y axis position of the top-left corner of the element relative to the current browsing context’s document element in CSS pixels
   */
  y: number;

  /**
   * Height of the element’s bounding rectangle in CSS pixels
   */
  width: number;

  /**
   * Width of the web element’s bounding rectangle in CSS pixels
   */
  height: number;
}
