# WebDriver client for JavaScript

[![npm version](https://badge.fury.io/js/w3c-webdriver.svg)](https://badge.fury.io/js/w3c-webdriver)
[![Build Status](https://ci.appveyor.com/api/projects/status/github/mucsi96/w3c-webdriver?branch=master&svg=true)](https://ci.appveyor.com/project/mucsi96/w3c-webdriver)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![Dependency Status](https://dependencyci.com/github/mucsi96/w3c-webdriver/badge)](https://dependencyci.com/github/mucsi96/w3c-webdriver)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This package provides JavaScript bindings
that conform to the [W3C WebDriver standard](https://w3c.github.io/webdriver/webdriver-spec.html),
which specifies a remote control protocol for web browsers.

Tested on major browsers

| ![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/chrome/chrome_24x24.png) | ![FireFox](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/firefox/firefox_24x24.png) | ![Safari](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/safari/safari_24x24.png) | ![Internet Explorer](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/archive/internet-explorer_9-11/internet-explorer_9-11_24x24.png) | ![PhantomJS](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/43.1.0/archive/phantomjs/phantomjs_24x24.png) |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| :white_check_mark:                                                                             | :white_check_mark:                                                                                |                                                                                                | :white_check_mark:                                                                                                                                | :white_check_mark:                                                                                              |

Tested on most popular Node.js versions

| 6                  | 7                  | 8                  |
| ------------------ | ------------------ | ------------------ |
| :white_check_mark: | :white_check_mark: | :white_check_mark: |

# :construction: Work in progress...

| Method | URI Template                                                   | Command                                 |   Implementation   |
| ------ | -------------------------------------------------------------- | --------------------------------------- | :----------------: |
| POST   | /session                                                       | [New Session](#newsession)              | :white_check_mark: |
| DELETE | /session/{session id}                                          | [Delete Session](#sessiondelete)        | :white_check_mark: |
| GET    | /status                                                        | [Status](#status)                       | :white_check_mark: |
| GET    | /session/{session id}/timeouts                                 | Get Timeouts                            |                    |
| POST   | /session/{session id}/timeouts                                 | Set Timeouts                            |                    |
| POST   | /session/{session id}/url                                      | [Go](#sessiongo)                        | :white_check_mark: |
| GET    | /session/{session id}/url                                      | Get Current URL                         |                    |
| POST   | /session/{session id}/back                                     | Back                                    |                    |
| POST   | /session/{session id}/forward                                  | Forward                                 |                    |
| POST   | /session/{session id}/refresh                                  | Refresh                                 |                    |
| GET    | /session/{session id}/title                                    | [Get Title](#sessiongettitle)           | :white_check_mark: |
| GET    | /session/{session id}/window                                   | Get Window Handle                       |                    |
| DELETE | /session/{session id}/window                                   | Close Window                            |                    |
| POST   | /session/{session id}/window                                   | Switch To Window                        |                    |
| GET    | /session/{session id}/window/handles                           | Get Window Handles                      |                    |
| POST   | /session/{session id}/frame                                    | Switch To Frame                         |                    |
| POST   | /session/{session id}/frame/parent                             | Switch To Parent Frame                  |                    |
| GET    | /session/{session id}/window/rect                              | Get Window Rect                         |                    |
| POST   | /session/{session id}/window/rect                              | Set Window Rect                         |                    |
| POST   | /session/{session id}/window/maximize                          | Maximize Window                         |                    |
| POST   | /session/{session id}/window/minimize                          | Minimize Window                         |                    |
| POST   | /session/{session id}/window/fullscreen                        | Fullscreen Window                       |                    |
| GET    | /session/{session id}/element/active                           | Get Active Element                      |                    |
| POST   | /session/{session id}/element                                  | [Find Element](#sessionfindelement)     | :white_check_mark: |
| POST   | /session/{session id}/elements                                 | Find Elements                           |                    |
| POST   | /session/{session id}/element/{element id}/element             | Find Element From Element               |                    |
| POST   | /session/{session id}/element/{element id}/elements            | Find Elements From Element              |                    |
| GET    | /session/{session id}/element/{element id}/selected            | Is Element Selected                     |                    |
| GET    | /session/{session id}/element/{element id}/attribute/{name}    | Get Element Attribute                   |                    |
| GET    | /session/{session id}/element/{element id}/property/{name}     | Get Element Property                    |                    |
| GET    | /session/{session id}/element/{element id}/css/{property name} | [Get Element CSS Value](#elementgetcss) | :white_check_mark: |
| GET    | /session/{session id}/element/{element id}/text                | [Get Element Text](#elementgettext)     | :white_check_mark: |
| GET    | /session/{session id}/element/{element id}/name                | Get Element Tag Name                    |                    |
| GET    | /session/{session id}/element/{element id}/rect                | Get Element Rect                        |                    |
| GET    | /session/{session id}/element/{element id}/enabled             | Is Element Enabled                      |                    |
| POST   | /session/{session id}/element/{element id}/click               | [Element Click](#elementclick)          | :white_check_mark: |
| POST   | /session/{session id}/element/{element id}/clear               | Element Clear                           |                    |
| POST   | /session/{session id}/element/{element id}/value               | [Element Send Keys](#elementsendkeys)   | :white_check_mark: |
| GET    | /session/{session id}/source                                   | Get Page Source                         |                    |
| POST   | /session/{session id}/execute/sync                             | Execute Script                          |                    |
| POST   | /session/{session id}/execute/async                            | Execute Async Script                    |                    |
| GET    | /session/{session id}/cookie                                   | Get All Cookies                         |                    |
| GET    | /session/{session id}/cookie/{name}                            | Get Named Cookie                        |                    |
| POST   | /session/{session id}/cookie                                   | Add Cookie                              |                    |
| DELETE | /session/{session id}/cookie/{name}                            | Delete Cookie                           |                    |
| DELETE | /session/{session id)/cookie                                   | Delete All Cookies                      |                    |
| POST   | /session/{session id}/actions                                  | Perform Actions                         |                    |
| DELETE | /session/{session id}/actions                                  | Release Actions                         |                    |
| POST   | /session/{session id}/alert/dismiss                            | Dismiss Alert                           |                    |
| POST   | /session/{session id}/alert/accept                             | Accept Alert                            |                    |
| GET    | /session/{session id}/alert/text                               | Get Alert Text                          |                    |
| POST   | /session/{session id}/alert/text                               | Send Alert Text                         |                    |
| GET    | /session/{session id}/screenshot                               | Take Screenshot                         |                    |
| GET    | /session/{session id}/element/{element id}/screenshot          | Take Element Screenshot                 |                    |

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
const session = await webdriver.newSession('http://localhost:4444', {
    desiredCapabilities: {
        browserName: 'Chrome'
    }
});
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Session](#session)>** session

## status

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#status)**

This function queries the WebDriver server's current status.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** WebDriver server URL

**Examples**

```javascript
await webdriver.status('http://localhost:4444');
// {
//   build: { version: '1.2.0' },
//   os: { name: 'mac', version: 'unknown', arch: '64bit' }
// }
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** status

## Session

This object represents a WebDriver session.

Type: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Properties**

-   `delete` **[Session.delete](#sessiondelete)** Delete the session.
-   `go` **[Session.go](#sessiongo)** Navigate to a new URL.
-   `getTitle` **[Session.getTitle](#sessiongettitle)** Get the current page title.
-   `findElement` **[Session.findElement](#sessionfindelement)** Search for an element on the page,
     starting from the document root.

## Session.delete

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#delete-session)**

Delete the session.

**Examples**

```javascript
await session.delete();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

## Session.go

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#go)**

Navigate to a new URL.

**Parameters**

-   `targetUrl` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The URL to navigate to.

**Examples**

```javascript
await session.go('http://localhost:8087');
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

## Session.getTitle

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#get-title)**

Get the current page title.

**Examples**

```javascript
const title = await session.getTitle();
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
const element = await session.findElement('css', 'h2');
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Element](#element)>** 

## Session.getScriptTimeout

-   **See: [WebDriver spec](https://w3c.github.io/webdriver/webdriver-spec.html#get-timeouts)**

Retrieves session script timeout that specifies a time to wait for scripts to run.

**Examples**

```javascript
const timeout = await session.getScriptTimeout();
// 30000
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** session script timeout in milliseconds.

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
const input = await session.findElement('css', '[name="first-name"]');
await a.sendKeys('Hello World');
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

## Element.click

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#element-click)**

Click on an element.

**Examples**

```javascript
const submitButton = await session.findElement('css', 'button[type="submit"]');
await submitButton.click();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

## Element.getText

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-text)**

Returns the visible text for the element.

**Examples**

```javascript
const result = await session.findElement('css', '#result');
const text = await result.getText();
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** Visible text for the element.

## Element.getCss

-   **See: [WebDriver spec](https://www.w3.org/TR/webdriver/#get-element-css-value)**

Returns the computed value of the given CSS property for the element.

**Parameters**

-   `propertyName` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** CSS property.

**Examples**

```javascript
const button = await session.findElement('css', '#red-button');
const backgroundColor = await button.getCss('background-color');
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** Computed CSS property value for the element.

# Contributors

Thanks goes to these wonderful people :

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars3.githubusercontent.com/u/3163392?v=3" width="100px;"/><br /><sub>Igor Muchychka</sub>](https://github.com/mucsi96)<br /> | [<img src="https://avatars0.githubusercontent.com/u/6848578?v=3" width="100px;"/><br /><sub>Gabor Szalay</sub>](https://github.com/GaborSzalay)<br /> | [<img src="https://avatars1.githubusercontent.com/u/5919649?v=3" width="100px;"/><br /><sub>Adam Graf</sub>](https://github.com/netgrafe)<br /> | [<img src="https://avatars2.githubusercontent.com/u/4106395?v=3" width="100px;"/><br /><sub>Roland Orosz</sub>](https://github.com/Blodwynn)<br /> |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
