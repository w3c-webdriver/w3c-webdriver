# Sessions

## newSession(options)

Before we can send any command to the browser we drive we need to create a [WebDriver](https://www.w3.org/TR/webdriver) session.
This should be always the first step of interaction through the protocol.
After executing this command the browser will be started and ready to receive the commands.
As part of session creation we have to provide the url of WebDriver protocol compliant server.
This can be a locally running browser driver server ([Chromedriver](http://chromedriver.chromium.org), [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver), etc.),
[Selenium Server or Grid](https://www.seleniumhq.org) or cloud provider url ([BrowserStack](https://www.browserstack.com), [Sauce Labs](https://saucelabs.com), .etc.).
Also we can set the browser and operating system parameters we want to interact with.

**PARAMETERS**

- `options`: object
  - `url`: string
  - `capabilities`: [Capabilities](capabilities.md#capabilities)
  - `desiredCapabilities?`: object
    - `browserstack.use_w3c`: boolean
  - `headers`: Headers | string[] | object

**RETURNS**

Promise&lt;[Session](#session)&gt;

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
const credentials = Buffer.from(
  ['myusername', 'Password123'].join(':')
).toString('base64');
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

- `url`: string

**RETURNS**

Promise&lt;[Status](#status)&gt;

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

## Session

This object represents a WebDriver session.

**SEE ALSO**

- [Actions](actions.md)
- [Contexts](contexts.md)
- [Cookies](cookies.md)
- [Document](document.md)
- [Elements](elements.md)
- [Navigation](navigation.md)
- [Screen capture](screen-capture.md)
- [Timeouts](timeouts.md)
- [User prompts](user-prompts.md)

## session.close()

Close the session.

**RETURNS**

Promise&lt;void&gt;

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

## Status

WebDriver status object

**PROPERTIES**

- `message`: string
- `ready`: boolean
- `os`: [StatusOfOS](#statusofos)
- `build`: [StatusOfWebDriver](#statusofwebdriver)

## StatusOfOS

**PROPERTIES**

- `name`: string
- `version`: string
- `arch`: string

## StatusOfWebDriver

**PROPERTIES**

- `version`: string
