# Contexts

## session.getWindowHandle()

Get handle of current window

**RETURNS**

Promise&lt;string&gt;

**EXAMPLES**

```typescript
const handle = await session.getWindowHandle();
// handle = 'CDwindow-7321145136535301DE771CCBD9555CEA'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-window-handle)

## session.closeWindow()

Close the current window.

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.closeWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#close-window)

## session.switchToWindow(handle)

Change focus to another window. The window to change focus to may be specified by it's server assigned window handle.

**PARAMETERS**

- `handle`: string - Window handle to switch to

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.switchToWindow('CDwindow-7321145136535301DE771CCBD9555CEA');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#switch-to-window)

## session.getWindowHandles()

Get all window handles

**RETURNS**

Promise&lt;string[]&gt;

**EXAMPLES**

```typescript
const handles = await session.getWindowHandles();
// handles = ['CDwindow-7321145136535301DE771CCBD9555CEA']
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-window-handles)

## session.switchToFrame(target)

Change focus to another frame on the page

**PARAMETERS**

- `target`: null | number | [Element](elements.md#element) - Identifier for the frame to change focus to

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
const iframe = await session.findElement('css selector', 'iframe');
await session.switchToFrame(iframe);
```

```typescript
await session.switchToFrame(null);
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#switch-to-frame)

## session.switchToParentFrame()

Change focus to parent frame on the page

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.switchToParentFrame();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#switch-to-parent-frame)

## session.getWindowRect()

Get the size and position on the screen of the operating system window

**RETURNS**

Promise&lt;[WindowRect](#windowrect)&gt;

**EXAMPLES**

```typescript
await session.getWindowRect();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-window-rect)

## session.setWindowRect(windowRect)

Set the size and position on the screen of the operating system window

**PARAMETERS**

- `windowRect`: [WindowRect](#windowrect) - Window position and size

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.setWindowRect({
  x: 10,
  y: 10,
  width: 320,
  height: 600
});
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#set-window-rect)

## session.maximizeWindow()

Maximizes the current window

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.maximizeWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#maximize-window)

## session.minimizeWindow()

Minimizes the current window

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.minimizeWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#minimize-window)

## session.fullScreenWindow()

This command increases Current window to Full-Screen

**RETURNS**

Promise&lt;void&gt;

**EXAMPLES**

```typescript
await session.fullScreenWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#fullscreen-window)

## WindowRect

An object defining the Window Rect.

**PROPERTIES**

- `x`: number - The screenX and screenLeft attributes must return the x-coordinate, relative to the origin of the
Web-exposed screen area, of the left of the client window as number of CSS pixels
- `y`: number - The screenY and screenTop attributes must return the y-coordinate, relative to the origin of the
screen of the Web-exposed screen area, of the top of the client window as number of CSS pixels
- `width`: number - The outerWidth attribute must return the width of the client window.
If there is no client window this attribute must return zero
- `height`: number - The outerWidth attribute must return the height of the client window.
If there is no client window this attribute must return zero