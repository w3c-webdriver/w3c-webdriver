# Introduction

This a very minimal future proof JavaScript bindings
that conform to the [W3C WebDriver standard](https://w3c.github.io/webdriver/webdriver-spec.html),
which specifies a remote control protocol for web browsers. No magic just pure promise based REST client.

## Getting started

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
const { newSession } = require('w3c-webdriver');

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
    await session.go('http://localhost:8080');
    const input = await session.findElement('css selector', '[name="first-name"]');
    await input.sendKeys('Hello World');
  } catch (err) {
    console.log(err.stack);
  } finally {
    session.deleteSession();
  }
})();
```

## We are using

[browserstack](#browserstack)

We are using [BrowserStack](https://www.browserstack.com) for testing the Selenium support of current package. BrowserStack loves open source and has sponsored thousands of projects. They offered us a free account as we're an open source project. This makes testing very easy on different browsers and various platforms including real mobile devices.
