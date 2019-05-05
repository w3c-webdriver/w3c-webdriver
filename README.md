# WebDriver client for JavaScript

[![npm version](https://badge.fury.io/js/w3c-webdriver.svg)](https://badge.fury.io/js/w3c-webdriver)
[![Build Status](https://dev.azure.com/w3c-webdriver/w3c-webdriver/_apis/build/status/w3c-webdriver.w3c-webdriver?branchName=master)](https://dev.azure.com/w3c-webdriver/w3c-webdriver/_build/latest?definitionId=1&branchName=master)

Very minimal future proof JavaScript bindings
that conform to the [W3C WebDriver standard](https://w3c.github.io/webdriver/webdriver-spec.html),
which specifies a remote control protocol for web browsers. No magic just pure promise based REST client.

Tested on major browsers

| ![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/chrome/chrome_24x24.png) | ![FireFox](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/firefox/firefox_24x24.png) | ![Safari](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/safari/safari_24x24.png) | ![Internet Explorer](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/archive/internet-explorer_9-11/internet-explorer_9-11_24x24.png) |
| :--------------------------------------------------------------------------------------------: |  :--------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
|                                       :white_check_mark:                                       |                                         :white_check_mark:                                        |                                                                                                                                                :white_check_mark:                                               |


# Getting started

### 1. Install the package

    npm install w3c-webdriver

### 2. Install a browser driver for WebDriver protocol

|                                                                      Browser                                                                      |                             Driver package                             |
| :-----------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|                           ![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/chrome/chrome_24x24.png)                          |       [chromedriver](https://www.npmjs.com/package/chromedriver)       |
|                         ![FireFox](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/firefox/firefox_24x24.png)                         |        [geckodriver](https://www.npmjs.com/package/geckodriver)        |
|                           ![Safari](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/safari/safari_24x24.png)                          |                                                                        |
| ![Internet Explorer](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/archive/internet-explorer_9-11/internet-explorer_9-11_24x24.png) |           [iedriver](https://www.npmjs.com/package/iedriver)           |
|

For example in case of Google Chrome or its headless version you can do.

    npm install chromedriver

Also you can manage the drivers using [webdriver-manager](https://www.npmjs.com/package/webdriver-manager)

### 3. Start the driver as described in the docs

### 4. Control the browser through WebDriver protocol

```javascript
import webdriver from 'w3c-webdriver';

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const input = await session.findElement('css selector', '[name="first-name"]');
    await a.sendKeys('Hello World');
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

# :construction: Work in progress...

## Sessions

| Method | URI Template                   | Command                            |   Implementation   |
| ------ | ------------------------------ | ---------------------------------- | :----------------: |
| POST   | /session                       | [New Session](#newsession)         | :white_check_mark: |
| DELETE | /session/{session id}          | [Delete Session](#sessiondelete)   | :white_check_mark: |
| GET    | /status                        | [Status](#status)                  | :white_check_mark: |
| GET    | /session/{session id}/timeouts | [Get Timeouts](#sessiongettimeout) | :white_check_mark: |
| POST   | /session/{session id}/timeouts | [Set Timeouts](#sessionsettimeout) | :white_check_mark: |

## Navigation

| Method | URI Template                  | Command                       |   Implementation   |
| ------ | ----------------------------- | ----------------------------- | :----------------: |
| POST   | /session/{session id}/url     | [Go](#sessiongo)              | :white_check_mark: |
| GET    | /session/{session id}/url     | [Get Current URL](#sessiongetcurrentUrl)              | :white_check_mark: |
| POST   | /session/{session id}/back    | Back                          | :white_check_mark: |
| POST   | /session/{session id}/forward | Forward                       | :white_check_mark: |
| POST   | /session/{session id}/refresh | Refresh                       | :white_check_mark: |
| GET    | /session/{session id}/title   | [Get Title](#sessiongettitle) | :white_check_mark: |

## Command Contexts

| Method | URI Template                            | Command                | Implementation |
| ------ | --------------------------------------- | ---------------------- | :------------: |
| GET    | /session/{session id}/window            | Get Window Handle      |                |
| DELETE | /session/{session id}/window            | Close Window           |                |
| POST   | /session/{session id}/window            | Switch To Window       |                |
| GET    | /session/{session id}/window/handles    | Get Window Handles     |                |
| POST   | /session/{session id}/frame             | Switch To Frame        |                |
| POST   | /session/{session id}/frame/parent      | Switch To Parent Frame |                |
| GET    | /session/{session id}/window/rect       | Get Window Rect        |                |
| POST   | /session/{session id}/window/rect       | Set Window Rect        |                |
| POST   | /session/{session id}/window/maximize   | Maximize Window        |                |
| POST   | /session/{session id}/window/minimize   | Minimize Window        |                |
| POST   | /session/{session id}/window/fullscreen | Fullscreen Window      |                |

## Elements

| Method | URI Template                         | Command            | Implementation |
| ------ | ------------------------------------ | ------------------ | :------------: |
| GET    | /session/{session id}/element/active | Get Active Element |                |

## Element Retrieval

| Method | URI Template                                        | Command                               |   Implementation   |
| ------ | --------------------------------------------------- | ------------------------------------- | :----------------: |
| POST   | /session/{session id}/element                       | [Find Element](#sessionfindelement)   | :white_check_mark: |
| POST   | /session/{session id}/elements                      | [Find Elements](#sessionfindelements) | :white_check_mark: |
| POST   | /session/{session id}/element/{element id}/element  | Find Element From Element             |                    |
| POST   | /session/{session id}/element/{element id}/elements | Find Elements From Element            |                    |

## Element State

| Method | URI Template                                                   | Command                                 |   Implementation   |
| ------ | -------------------------------------------------------------- | --------------------------------------- | :----------------: |
| GET    | /session/{session id}/element/{element id}/selected            | Is Element Selected                     |                    |
| GET    | /session/{session id}/element/{element id}/attribute/{name}    | Get Element Attribute                   |                    |
| GET    | /session/{session id}/element/{element id}/property/{name}     | Get Element Property                    |                    |
| GET    | /session/{session id}/element/{element id}/css/{property name} | [Get Element CSS Value](#elementgetcss) | :white_check_mark: |
| GET    | /session/{session id}/element/{element id}/text                | [Get Element Text](#elementgettext)     | :white_check_mark: |
| GET    | /session/{session id}/element/{element id}/name                | Get Element Tag Name                    |                    |
| GET    | /session/{session id}/element/{element id}/rect                | Get Element Rect                        |                    |
| GET    | /session/{session id}/element/{element id}/enabled             | Is Element Enabled                      |                    |

## Element Interaction

| Method | URI Template                                     | Command                               |   Implementation   |
| ------ | ------------------------------------------------ | ------------------------------------- | :----------------: |
| POST   | /session/{session id}/element/{element id}/click | [Element Click](#elementclick)        | :white_check_mark: |
| POST   | /session/{session id}/element/{element id}/clear | Element Clear                         |                    |
| POST   | /session/{session id}/element/{element id}/value | [Element Send Keys](#elementsendkeys) | :white_check_mark: |

## Document Handling

| Method | URI Template                        | Command                                            |   Implementation   |
| ------ | ----------------------------------- | -------------------------------------------------- | :----------------: |
| GET    | /session/{session id}/source        | [Get Page Source](#sessiongetpagesource)           | :white_check_mark: |
| POST   | /session/{session id}/execute/sync  | [Execute Script](#sessionexecutescript)            | :white_check_mark: |
| POST   | /session/{session id}/execute/async | [Execute Async Script](#sessionexecuteasyncscript) | :white_check_mark: |

## Cookies

| Method | URI Template                        | Command                                  |   Implementation   |
| ------ | ----------------------------------- | ---------------------------------------- | :----------------: |
| GET    | /session/{session id}/cookie        | [Get All Cookies](#sessiongetallcookies) | :white_check_mark: |
| GET    | /session/{session id}/cookie/{name} | Get Named Cookie                         |                    |
| POST   | /session/{session id}/cookie        | [Add Cookie](#sessionaddcookie)          | :white_check_mark: |
| DELETE | /session/{session id}/cookie/{name} | Delete Cookie                            |                    |
| DELETE | /session/{session id)/cookie        | Delete All Cookies                       |                    |

## Actions

| Method | URI Template                  | Command         | Implementation |
| ------ | ----------------------------- | --------------- | :------------: |
| POST   | /session/{session id}/actions | Perform Actions |                |
| DELETE | /session/{session id}/actions | Release Actions |                |

## User Prompts

| Method | URI Template                        | Command         | Implementation |
| ------ | ----------------------------------- | --------------- | :------------: |
| POST   | /session/{session id}/alert/dismiss | Dismiss Alert   |                |
| POST   | /session/{session id}/alert/accept  | Accept Alert    |                |
| GET    | /session/{session id}/alert/text    | Get Alert Text  |                |
| POST   | /session/{session id}/alert/text    | Send Alert Text |                |

## Screen Capture

| Method | URI Template                                          | Command                                   |   Implementation   |
| ------ | ----------------------------------------------------- | ----------------------------------------- | :----------------: |
| GET    | /session/{session id}/screenshot                      | [Take Screenshot](#sessiontakescreenshot) | :white_check_mark: |
| GET    | /session/{session id}/element/{element id}/screenshot | Take Element Screenshot                   |                    |

# We are using

[<img src="https://user-images.githubusercontent.com/3163392/53362202-e803e800-3939-11e9-9738-2fbdce3d8ce3.png" alt="Browser Stack Logo" width="300">](https://www.browserstack.com/)

We are using [BrowserStack](https://www.browserstack.com) for testing the Selenium support of current package. BrowserStack loves open source and has sponsored thousands of projects. They offered us a free account as we're an open source project. This makes testing very easy on different browsers and various platforms including real mobile devices.


# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## newSession

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#new-session)**

This function creates a new WebDriver session.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** WebDriver server URL
-   `options` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** configuration object for creating the session

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

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
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Session](#session)>** session

## status

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#status)**

This function queries the WebDriver server's current status.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** WebDriver server URL

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

(async () => {
  try {
    const status = await webdriver.status('http://localhost:4444');
    // status = {
    //   build: { version: '1.2.0' },
    //   os: { name: 'mac', version: 'unknown', arch: '64bit' }
    // }
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** status

## Session

This object represents a WebDriver session.

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `delete` **[session.deleteSession](#sessiondelete)** Delete the session.
-   `go` **[Session.go](#sessiongo)** Navigate to a new URL.
-   `getTitle` **[Session.getTitle](#sessiongettitle)** Get the current page title.
-   `findElement` **[Session.findElement](#sessionfindelement)** Search for an element on the page,
     starting from the document root.

## session.deleteSession

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#delete-session)**

Delete the session.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

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
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## Session.go

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#go)**

Navigate to a new URL.

**Parameters**

-   `targetUrl` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The URL to navigate to.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## Session.getCurrentUrl

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#get-current-url)**

Get the current page url.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const currentUrl = await session.getCurrentURL();
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** The current page url.

## Session.getTitle

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#get-title)**

Get the current page title.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const title = await session.getTitle();
    // title = 'web page title'
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** The current page title.

## Session.findElement

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#find-element)**

Search for an element on the page, starting from the document root.

**Parameters**

-   `strategy` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Locator strategy
    ("css selector", "link text", "partial link text", "tag name", "xpath").
-   `selector` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector string.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const element = await session.findElement('css selector', 'h2');
    // element = <webdriver element>
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Element](#element)>**

## Session.findElements

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#find-elements)**

Search for multiple elements on the page, starting from the identified element. The located
elements will be returned as a WebElement JSON objects. The table below lists the locator
strategies that each server should support. Elements should be returned in the order located
in the DOM.

**Parameters**

-   `strategy` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Locator strategy
    ("css selector", "link text", "partial link text", "tag name", "xpath").
-   `selector` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Selector string.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const elements = await session.findElements('css selector', 'h2');
    // elements = [<webdriver element>]
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Element](#element)>>**

## Session.getTimeout

-   **See: [WebDriver spec](https://w3c.github.io/webdriver/webdriver-spec.html#get-timeouts)**

Gets timeout durations associated with the current session.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    const timeout = await session.getTimeout();
    // timeout = {
    //   script: 30000,
    //   pageLoad: 60000,
    //   implicit: 40000
    // }
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** Timeout durations associated with the current session
in milliseconds.

## Session.setTimeout

-   **See: [WebDriver spec](https://w3c.github.io/webdriver/webdriver-spec.html#set-timeouts)**

Configure the amount of time that a particular type of operation can execute for before
they are aborted and a |Timeout| error is returned to the client.

**Parameters**

-   `timeouts` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Timeout configuration object with values in milliseconds.
    -   `timeouts.script` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Session script timeout - Determines when to interrupt
         a script that is being evaluated.
    -   `timeouts.pageLoad` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Session page load timeout - Provides the timeout
         limit used to interrupt navigation of the browsing context.
    -   `timeouts.implicit` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Session implicit wait timeout -Gives the timeout
          of when to abort locating an element.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.setTimeout({
      script: 30000,
      pageLoad: 60000,
      implicit: 40000
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## Session.getPageSource

-   **See: [WebDriver spec](https://w3c.github.io/webdriver/webdriver-spec.html#getting-page-source)**

Returns a string serialization of the DOM of the current browsing context active document.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const source = await session.getPageSource();
    // source = '<!DOCTYPE html><head><title>...'
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** The current page source.

## Session.executeScript

-   **See: [WebDriver spec](https://w3c.github.io/webdriver/webdriver-spec.html#execute-script)**

Inject a snippet of JavaScript into the page for execution in the context of the
currently selected frame. The executed script is assumed to be synchronous and
the result of evaluating the script is returned to the client.

**Parameters**

-   `script` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**  The script to execute.
-   `args` **[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)?** The script arguments.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const script = `
      const [from] = arguments;
      return `Hello from ${from}!`;
    `;
    const message = await session.executeScript(script, ['WebDriver']);
    // message = 'Hello from WebDriver!'
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The script result.

## Session.executeAsyncScript

-   **See: [WebDriver spec](https://w3c.github.io/webdriver/webdriver-spec.html#execute-async-script)**

causes JavaScript to execute as an anonymous function. Unlike the Execute Script command, the
result of the function is ignored. Instead an additional argument is provided as the final
argument to the function. This is a function that, when called, returns its first argument
as the response.

**Parameters**

-   `script` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**  The script to execute.
-   `args` **[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)?** The script arguments.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const script = `
      const [a, b, callback] = arguments;
      setTimeout(() => callback(a * b), 1000);
    `;
    const message = await session.executeAsyncScript(script, [5, 3]);
    // message = 15
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;any>** The script result.

## Session.getAllCookies

-   **See: [WebDriver spec](https://w3c.github.io/webdriver/webdriver-spec.html#get-all-cookies)**

Returns all cookies associated with the address of the current browsing context’s active
document.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
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
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>>** A list of cookies.

## Session.addCookie

-   **See: [WebDriver spec](https://w3c.github.io/webdriver/webdriver-spec.html#add-cookie)**

Adds a single cookie to the cookie store associated with the active document’s address.

**Parameters**

-   `cookie` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**  An object defining the cookie to add.
    -   `cookie.name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The name of the cookie.
    -   `cookie.value` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The cookie value.
    -   `cookie.path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** The cookie path. Defaults to "/" if omitted when adding a
        cookie.
    -   `cookie.domain` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** The domain the cookie is visible to. Defaults to the
        current browsing context’s document’s URL domain if omitted when adding a cookie.
    -   `cookie.secure` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** Whether the cookie is a secure cookie. Defaults to false
        if omitted when adding a cookie.
    -   `cookie.httpOnly` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** Whether the cookie is an HTTP only cookie. Defaults to
        false if omitted when adding a cookie.
    -   `cookie.expiry` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** When the cookie expires, specified in seconds since Unix
        Epoch. Defaults to 20 years into the future if omitted when adding a cookie.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    await session.addCookie({ name: 'test cookie', value: 'test value' });
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## Session.takeScreenshot

-   **See: [WebDriver spec](https://w3c.github.io/webdriver/webdriver-spec.html#take-screenshot)**

The Take Screenshot command takes a screenshot of the top-level browsing context’s viewport.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const screenshot = await session.takeScreenshot();
    // screenshot = Buffer containing PNG
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Buffer](https://nodejs.org/api/buffer.html)>** The screenshot as a PNG.

## Element

This object represents a WebDriver element.

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `sendKeys` **[Element.sendKeys](#elementsendkeys)** Send a sequence of key strokes to an element.
-   `click` **[Element.click](#elementclick)** Click on an element.
-   `getText` **[Element.getText](#elementgettext)** Returns the visible text for the element.
-   `getCss` **[Element.getCss](#elementgetcss)** Returns the computed value of the given CSS
    property for the element.

## Element.sendKeys

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#element-send-keys)**

Send a sequence of key strokes to an element.

**Parameters**

-   `text` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The sequence of keys to type.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const input = await session.findElement('css selector', '[name="first-name"]');
    await a.sendKeys('Hello World');
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## Element.click

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#element-click)**

Click on an element.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const submitButton = await session.findElement('css selector', 'button[type="submit"]');
    await submitButton.click();
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)**

## Element.getText

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-text)**

Returns the visible text for the element.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const result = await session.findElement('css selector', '#result');
    const text = await result.getText();
    // test = <result>
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** Visible text for the element.

## Element.getCss

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-css-value)**

Returns the computed value of the given CSS property for the element.

**Parameters**

-   `propertyName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** CSS property.

**Examples**

```javascript
import webdriver from 'w3c-webdriver';

let session;

(async () => {
  try {
    session = await newSession('http://localhost:4444', {
      desiredCapabilities: {
        browserName: 'Chrome'
      }
    });
    await session.go('http://localhost:8080');
    const button = await session.findElement('css selector', '#red-button');
    const backgroundColor = await button.getCss('background-color');
    // backgroundColor = 'rgba(255, 0, 0, 1)'
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** Computed CSS property value for the element.

# Contributors

Thanks goes to these wonderful people :

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars3.githubusercontent.com/u/3163392?v=3" width="100px;"/><br /><sub>Igor Muchychka</sub>](https://github.com/mucsi96)<br /> | [<img src="https://avatars0.githubusercontent.com/u/6848578?v=3" width="100px;"/><br /><sub>Gabor Szalay</sub>](https://github.com/GaborSzalay)<br /> | [<img src="https://avatars1.githubusercontent.com/u/5919649?v=3" width="100px;"/><br /><sub>Adam Graf</sub>](https://github.com/netgrafe)<br /> | [<img src="https://avatars2.githubusercontent.com/u/4106395?v=3" width="100px;"/><br /><sub>Roland Orosz</sub>](https://github.com/Blodwynn)<br /> |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
