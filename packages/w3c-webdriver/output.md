[`Promise`](#pomise)`<`[`string`](#string)`,`[`string`](#string)`>`

## newSession(options)
Before we can send any command to the browser we drive we need to create a [WebDriver](https://www.w3.org/TR/webdriver) session.
This should be always the first step of interaction through the protocol.
After executing this command the browser will be started and ready to receive the commands.
As part of session creation we have to provide the url of WebDriver protocol compliant server.
This can be a locally running browser driver server ([Chromedriver](http://chromedriver.chromium.org), [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver), etc.),
[Selenium Server or Grid](https://www.seleniumhq.org) or cloud provider url ([BrowserStack](https://www.browserstack.com), [Sauce Labs](https://saucelabs.com), .etc.).
Also we can set the browser and operating system parameters we want to interact with.

**PARAMETERS**

- `options` : `__type`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
import { newSession } from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession({
      url: 'http://localhost:4444',
      capabilities: {
        alwaysMatch: {
          browserName: 'Chrome'
        }
      }
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.close();
  }
})();
```
```typescript
const credentials = Buffer.from(['myusername', 'Password123'].join(':')).toString('base64');
const session = await newSession({
  headers: {
    Authorization: `Basic ${credentials}`
  }
});
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#new-session)

## status(url)
To be able to verify if the WebDriver server is ready for new session creation sometimes it can be useful to query it's status.
This function queries the WebDriver server's current status.
The status contains meta information about the WebDriver server and operating system.

**PARAMETERS**

- `url` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
import { status } from 'w3c-webdriver';

const status = await status('http://localhost:4444');
// status = {
//   build: { version: '1.2.0' },
//   os: { name: 'mac', version: 'unknown', arch: '64bit' }
// }
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#status)

## Element
This object represents a WebDriver element.







## element.findElement(strategy, selector)
Search for an element on the page, starting from the referenced web element.

**PARAMETERS**

- `strategy` : [`LocatorStrategy`](#locatorstrategy)
- `selector` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const parent = await session.findElement('css selector', '#parent');
const child = await child.findElement('css selector', '#child');
// child = <webdriver element>
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#find-element-from-element)

## element.findElements(strategy, selector)
Search for multiple elements on the page, starting from the referenced web element. The located
elements will be returned as a WebElement JSON objects. The table below lists the locator
strategies that each server should support. Elements should be returned in the order located
in the DOM.

**PARAMETERS**

- `strategy` : [`LocatorStrategy`](#locatorstrategy)
- `selector` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const parent = await session.findElement('css selector', '#parent');
const children = await child.findElements('css selector', '#child');
// elements = [<webdriver element>]
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#find-elements)

## element.isSelected()
Determines if the referenced element is selected or not.
This operation only makes sense on input elements of the Checkbox- and Radio Button states, or on option elements.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const checkbox = await session.findElement('css selector', '#checkbox');
const selected = await checkbox.isSelected();
// selected = true
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#is-element-selected)

## element.getAttribute(propertyName)
Returns the attribute of the referenced web element.

**PARAMETERS**

- `propertyName` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const button = await session.findElement('css selector', '#red-button');
const backgroundColor = await button.getAttribute('css');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-attribute)

## element.getProperty(propertyName)
Returns the property of the referenced web element.

**PARAMETERS**

- `propertyName` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const button = await session.findElement('css selector', '#red-button');
const backgroundColor = await button.getProperty('class');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-attribute)

## element.getCssValue(propertyName)
Returns the computed value of the given CSS property for the element.

**PARAMETERS**

- `propertyName` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const button = await session.findElement('css selector', '#red-button');
const backgroundColor = await button.getCssValue('background-color');
// backgroundColor = 'rgba(255, 0, 0, 1)'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-css-value)

## element.getText()
Returns the visible text for the element.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const result = await session.findElement('css selector', '#result');
const text = await result.getText();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-text)

## element.getTagName()
Returns the tagName of a Element

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const button = await session.findElement('css selector', '#red-button');
const backgroundColor = await button.getTagName();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-tag-name)

## element.getRect()
Returns the dimensions and coordinates of the referenced element

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const button = await session.findElement('css selector', '#red-button');
const rect = await button.getRect();
// rect = { x: 10, y: 100, width: 300, height: 50 }
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-rect)

## element.isEnabled()
Determines if the referenced element is enabled or not.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const inputField = await session.findElement('css selector', '#disabled');
const isElementEnabled = await inputField.isEnabled();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#is-element-enabled)

## element.click()
Click on an element.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const submitButton = await session.findElement('css selector', 'button[type="submit"]');
await submitButton.click();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#element-click)

## element.clear()
Clear content of an element.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const fieldA = await session.findElement('css selector', '#a');
await submitButton.clear();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#element-clear)

## element.sendKeys(text)
Send a sequence of key strokes to an element.

**PARAMETERS**

- `text` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const input = await session.findElement('css selector', '[name="first-name"]');
await input.sendKeys('Hello World');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#element-send-keys)

## element.takeScreenshot()
Takes a screenshot of the visible region encompassed by the bounding rectangle of an element

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const screenshot = await session.takeScreenshot();
// screenshot = Buffer containing PNG
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#take-screenshot)

## Session
This object represents a WebDriver session.





## session.close()
Close the session.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
import { newSession } from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.close();
  }
})();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#delete-session)

## session.getTimeout()
Gets timeout durations associated with the current session.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const timeout = await session.getTimeout();
// timeout = {
//   script: 30000,
//   pageLoad: 60000,
//   implicit: 40000
// }
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-timeouts)

## session.setTimeout(timeout)
Configure the amount of time that a particular type of operation can execute for before
they are aborted and a |Timeout| error is returned to the client.

**PARAMETERS**

- `timeout` : [`Timeout`](#timeout)

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.setTimeout({
  script: 30000,
  pageLoad: 60000,
  implicit: 40000
});
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#set-timeouts)

## session.navigateTo(targetUrl)
Navigate to a new URL.

**PARAMETERS**

- `targetUrl` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.navigateTo('http://localhost:8080');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#navigate-to)

## session.getCurrentUrl()
Get current page URL

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const currentUrl = await session.getCurrentUrl();
// currentUrl = 'http://localhost:8080'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-current-url)

## session.back()
Navigate to previous url from history

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.back();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#back)

## session.forward()
Navigate forward to next url from history

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.forward();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#forward)

## session.refresh()
Refresh the current page

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.refresh();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#refresh)

## session.getTitle()
Get the current page title.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const title = await session.getTitle();
// title = 'web page title'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-title)

## session.getWindowHandle()
Get handle of current window

**RETURNS**

`Promise`

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

`Promise`

**EXAMPLES**

```typescript
await session.closeWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#close-window)

## session.switchToWindow(handle)
Change focus to another window. The window to change focus to may be specified by it's server assigned window handle.

**PARAMETERS**

- `handle` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.switchToWindow('CDwindow-7321145136535301DE771CCBD9555CEA');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#switch-to-window)

## session.getWindowHandles()
Get all window handles

**RETURNS**

`Promise`

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

- `target` : `null` | `number` | [`Element`](#element)

**RETURNS**

`Promise`

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

`Promise`

**EXAMPLES**

```typescript
await session.switchToParentFrame();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#switch-to-frame)

## session.getWindowRect()
Get the size and position on the screen of the operating system window

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.getWindowRect();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-window-rect)

## session.setWindowRect(windowRect)
Set the size and position on the screen of the operating system window

**PARAMETERS**

- `windowRect` : [`WindowRect`](#windowrect)

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.setWindowRect();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#set-window-rect)

## session.maximizeWindow()
Maximizes the current window

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.maximizeWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#maximize-window)

## session.minimizeWindow()
Minimizes the current window

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.minimizeWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#minimize-window)

## session.fullScreenWindow()
This command increases Current window to Full-Screen

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.fullScreenWindow();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#fullscreen-window)

## session.findElement(strategy, selector)
Search for an element on the page, starting from the document root.

**PARAMETERS**

- `strategy` : [`LocatorStrategy`](#locatorstrategy)
- `selector` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const element = await session.findElement('css selector', 'h2');
// element = <webdriver element>
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#find-element)

## session.findElements(strategy, selector)
Search for multiple elements on the page, starting from the document root. The located
elements will be returned as a WebElement JSON objects. The table below lists the locator
strategies that each server should support. Elements should be returned in the order located
in the DOM.

**PARAMETERS**

- `strategy` : [`LocatorStrategy`](#locatorstrategy)
- `selector` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const elements = await session.findElements('css selector', 'h2');
// elements = [<webdriver element>]
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#find-elements)

## session.getActiveElement()
Get the element on the page that currently has focus.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const element = await session.getActiveElement();
// element = <webdriver element>
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-active-element)

## session.getPageSource()
Returns a string serialization of the DOM of the current browsing context active document.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const source = await session.getPageSource();
// source = '<!DOCTYPE html><head><title>...'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#getting-page-source)

## session.executeScript(script, args)
Inject a snippet of JavaScript into the page for execution in the context of the
currently selected frame. The executed script is assumed to be synchronous and
the result of evaluating the script is returned to the client.

**PARAMETERS**

- `script` : `string`
- `args` : `any[]`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const script = `
  const [from] = arguments;
  return `Hello from ${from}!`;
`;
const message = await session.executeScript(script, ['WebDriver']);
// message = 'Hello from WebDriver!'
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#execute-script)

## session.executeAsyncScript(script, args)
causes JavaScript to execute as an anonymous function. Unlike the Execute Script command, the
result of the function is ignored. Instead an additional argument is provided as the final
argument to the function. This is a function that, when called, returns its first argument
as the response.

**PARAMETERS**

- `script` : `string`
- `args` : `any[]`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const script = `
  const [a, b, callback] = arguments;
  setTimeout(() => callback(a * b), 1000);
`;
const message = await session.executeAsyncScript(script, [5, 3]);
// message = 15
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#execute-async-script)

## session.getAllCookies()
Returns all cookies associated with the address of the current browsing context’s active
document.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const cookies = await session.getAllCookies();
// cookies = [
//   {
//     name: 'cookie name',
//     value: 'cookie value',
//     path: '/',
//     domain: 'localhost',
//     secure: false,
//     httpOnly: true
//   }
// ]
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-all-cookies)

## session.getNamedCookie(propertyName)
Returns cookie based on the cookie name

**PARAMETERS**

- `propertyName` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const cookie = await session.getNamedCookie('cookieName');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-named-cookie)

## session.addCookie(cookie)
Adds a single cookie to the cookie store associated with the active document’s address.

**PARAMETERS**

- `cookie` : [`Cookie`](#cookie)

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.addCookie({ name: 'test cookie', value: 'test value' });
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#add-cookie)

## session.deleteCookie(propertyName)
Delete a cookie based on its name

**PARAMETERS**

- `propertyName` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.deleteCookie('cookieName');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#delete-cookie)

## session.deleteAllCookies()
Delete all cookies associated with the address of the current browsing context’s active
document.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.deleteAllCookies();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#delete-all-cookies)

## session.performActions(actionSequences)
Sends virtualised device input to the web browser like keyboard or pointer events in a series of actions.

**PARAMETERS**

- `actionSequences` : [`ActionSequence[]`](#actionsequence)

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.performActions([
  {
    type: 'none',
    id: 'none_id',
    actions: [{ type: 'pause', duration: 0 }]
  },
  {
    type: 'pointer',
    id: 'click on b field',
    actions: [
      { type: 'pause', duration: 0 },
      { type: 'pointerMove', x: 118, y: 121 },
      { type: 'pointerDown', button: 0 },
      { type: 'pointerUp', button: 0 }
    ]
  }
]);
```
```typescript
await session.performActions([
  {
    type: 'key',
    id: 'type in 15',
    actions: [
      { type: 'pause', duration: 100 },
      { type: 'keyDown', value: '1' },
      { type: 'keyUp', value: '1' },
      { type: 'keyDown', value: '5' },
      { type: 'keyUp', value: '5' }
    ]
  }
]);
```
```typescript
await session.performActions([
  {
    type: 'pointer',
    id: 'click on add button',
    actions: [
      { type: 'pointerMove', x: 1, y: 1, origin: await session.findElement('css selector', '#add') },
      { type: 'pointerDown', button: 0 },
      { type: 'pointerUp', button: 0 }
    ],
    parameters: {
      pointerType: 'mouse'
    }
  }
]);
```
```typescript
await session.performActions([
  {
    type: 'key',
    id: 'key id',
    actions: [
      { type: 'keyDown', value: 'a' },
      { type: 'keyUp', value: 'a' },
      { type: 'keyDown', value: 'b' },
      { type: 'keyUp', value: 'b' },
      { type: 'keyDown', value: Key.LEFT },
      { type: 'keyUp', value: Key.LEFT },
      { type: 'keyDown', value: Key.DELETE },
      { type: 'keyUp', value: Key.DELETE }
    ]
  }
]);
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#perform-actions)

## session.releaseActions()
Release all the keys and pointer buttons that are currently depressed

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.performActions([
  {
    type: 'key',
    id: 'key id',
    actions: [{ type: 'keyDown', value: 'a' }]
  }
]);
await session.releaseActions();
// Now 'a' key was pressed
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#release-actions)

## session.dismissAlert()
Dismiss the alert in current page

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.dismissAlert();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#dismiss-alert)

## session.acceptAlert()
Accept the alert in current page

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.acceptAlert();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#accept-alert)

## session.getAlertText()
Returns the text from an alert

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const alertText = await session.getAlertText();
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#get-alert-text)

## session.sendAlertText(propertyName)
Sets the text field of a prompt to the given value.

**PARAMETERS**

- `propertyName` : `string`

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
await session.sendAlertText('Test');
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#send-alert-text)

## session.takeScreenshot()
Takes a screenshot of the top-level browsing context’s viewport.

**RETURNS**

`Promise`

**EXAMPLES**

```typescript
const screenshot = await session.takeScreenshot();
// screenshot = Buffer containing PNG
```

**SEE ALSO**

- [WebDriver spec](https://www.w3.org/TR/webdriver/#take-screenshot)

## PauseAction

**PROPERTIES**

- `type` : `'pause'`
- `duration` : `number`

## KeyDownAction

**PROPERTIES**

- `type` : `'keyDown'`
- `value` : `string`

## KeyUpAction

**PROPERTIES**

- `type` : `'keyUp'`
- `value` : `string`

## PointerMoveAction

**PROPERTIES**

- `type` : `'pointerMove'`
- `x` : `number`
- `y` : `number`
- `duration?` : `number`
- `origin?` : [`Element`](#element) | `'viewport'` | `'pointer'`

## PointerUpAction

**PROPERTIES**

- `type` : `'pointerUp'`
- `button` : `number`

## PointerDownAction

**PROPERTIES**

- `type` : `'pointerDown'`
- `button` : `number`

## NullAction

**PROPERTIES**

- `type` : `'pause'`
- `duration` : `number`

## KeyAction

**POSSIBLE VALUES**

- [`PauseAction`](#pauseaction)
- [`KeyDownAction`](#keydownaction)
- [`KeyUpAction`](#keyupaction)

## PointerAction

**POSSIBLE VALUES**

- [`PauseAction`](#pauseaction)
- [`PointerMoveAction`](#pointermoveaction)
- [`PointerUpAction`](#pointerupaction)
- [`PointerDownAction`](#pointerdownaction)

## NullActionSequence

**PROPERTIES**

- `type` : `'none'`
- `id` : `string`
- `actions` : [`PauseAction[]`](#pauseaction)

## KeyActionSequence

**PROPERTIES**

- `type` : `'key'`
- `id` : `string`
- `actions` : [`KeyAction[]`](#keyaction)

## PointerParameters

**PROPERTIES**

- `pointerType` : `'mouse'` | `'pen'` | `'touch'`

## PointerActionSequence

**PROPERTIES**

- `type` : `'pointer'`
- `id` : `string`
- `actions` : [`PointerAction[]`](#pointeraction)
- `parameters?` : [`PointerParameters`](#pointerparameters)

## ActionSequence

**POSSIBLE VALUES**

- [`NullActionSequence`](#nullactionsequence)
- [`KeyActionSequence`](#keyactionsequence)
- [`PointerActionSequence`](#pointeractionsequence)

## Key

**POSSIBLE VALUES**

- `NULL`
- `CANCEL`
- `HELP`
- `BACKSPACE`
- `TAB`
- `CLEAR`
- `RETURN`
- `ENTER`
- `SHIFT`
- `CONTROL`
- `ALT`
- `PAUSE`
- `ESCAPE`
- `SPACE`
- `PAGE_UP`
- `PAGE_DOWN`
- `END`
- `HOME`
- `LEFT`
- `UP`
- `RIGHT`
- `DOWN`
- `INSERT`
- `DELETE`
- `SEMICOLON`
- `EQUALS`
- `NUMPAD0`
- `NUMPAD1`
- `NUMPAD2`
- `NUMPAD3`
- `NUMPAD4`
- `NUMPAD5`
- `NUMPAD6`
- `NUMPAD7`
- `NUMPAD8`
- `NUMPAD9`
- `MULTIPLY`
- `ADD`
- `SEPARATOR`
- `SUBTRACT`
- `DECIMAL`
- `DIVIDE`
- `F1`
- `F2`
- `F3`
- `F4`
- `F5`
- `F6`
- `F7`
- `F8`
- `F9`
- `F10`
- `F11`
- `F12`
- `META`
- `ZENKAKUHANKAKU`
- `R_SHIFT`
- `R_CONTROL`
- `R_ALT`
- `R_META`
- `R_PAGEUP`
- `R_PAGEDOWN`
- `R_END`
- `R_HOME`
- `R_ARROWLEFT`
- `R_ARROWUP`
- `R_ARROWRIGHT`
- `R_ARROWDOWN`
- `R_INSERT`
- `R_DELETE`

## ChromeOptions

**PROPERTIES**

- `w3c?` : `boolean`
- `binary?` : `string`
- `args?` : `string[]`

## FirefoxOptions

**PROPERTIES**

- `log?` : `__type`
- `args?` : `string[]`

## InternetExplorerOptions

**PROPERTIES**

- `ignoreProtectedModeSettings` : `boolean`
- `ignoreZoomSetting` : `boolean`
- `ie.ensureCleanSession` : `boolean`

## BrowserStackOptions

**PROPERTIES**

- `os?` : `string`
- `osVersion?` : `string`
- `sessionName?` : `string`
- `buildName?` : `string`
- `projectName?` : `string`
- `debug?` : `boolean`
- `networkLogs?` : `boolean`
- `local?` : `boolean`
- `safari?` : `__type`

## BrowserCapability

**PROPERTIES**

- `browserName` : `string`
- `goog:chromeOptions?` : [`ChromeOptions`](#chromeoptions)
- `moz:firefoxOptions?` : [`FirefoxOptions`](#firefoxoptions)
- `se:ieOptions?` : [`InternetExplorerOptions`](#internetexploreroptions)
- `bstack:options?` : [`BrowserStackOptions`](#browserstackoptions)

## Capabilities

**PROPERTIES**

- `alwaysMatch?` : [`BrowserCapability`](#browsercapability)
- `firstMatch?` : [`BrowserCapability[]`](#browsercapability)

## Cookie
An object defining the cookie.

**PROPERTIES**

- `name` : `string`
- `value` : `string`
- `path?` : `string`
- `domain?` : `string`
- `secure?` : `boolean`
- `httpOnly?` : `boolean`
- `expiry?` : `number`

## ElementRect
An object defining the Element Rect.

**PROPERTIES**

- `x` : `number`
- `y` : `number`
- `width` : `number`
- `height` : `number`

## LocatorStrategy
Strategy for searching element on the page

**POSSIBLE VALUES**

- `'css selector'`
- `'link text'`
- `'partial link text'`
- `'tag name'`
- `'xpath'`

## StatusOfOS

**PROPERTIES**

- `name` : `string`
- `version` : `string`
- `arch` : `string`

## StatusOfWebDriver

**PROPERTIES**

- `version` : `string`

## Status
WebDriver status object

**PROPERTIES**

- `message` : `string`
- `ready` : `boolean`
- `os` : [`StatusOfOS`](#statusofos)
- `build` : [`StatusOfWebDriver`](#statusofwebdriver)

## Timeout
WebDriver Timeout configuration object

**PROPERTIES**

- `script?` : `number`
- `pageLoad?` : `number`
- `implicit?` : `number`

## WindowRect
An object defining the Window Rect.

**PROPERTIES**

- `x` : `number`
- `y` : `number`
- `width` : `number`
- `height` : `number`
