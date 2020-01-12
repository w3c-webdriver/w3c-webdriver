# Capabilities

## Capabilities

Before we can send any command to the browser we drive we need to create a [WebDriver](https://www.w3.org/TR/webdriver) session.
This should be always the first step of interaction using the protocol.
To create a new session we need to provide some requirements like `browserName`, `browserVersion`, `platformName`.
These requirements are called [`Capabilities`](https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities).
This is especially important when we interact not directly with a single browser but with a grid of browsers.
Using `alwaysMatch` property we can provide some strict requirements.
If the WebDriver sever can't provide the required features the session creation will fail.
Using `firstMatch` property we can provide a list of requirements.
During session creation the server will pick the first capability it's able to match.
`firstMatch` can of course be combined with `alwaysMatch` to narrow down the selection.

**PROPERTIES**

- `alwaysMatch?`: [BrowserCapability](#browsercapability)
- `firstMatch?`: [BrowserCapability](#browsercapability)[]

**EXAMPLES**

```typescript
const capabilities = {
  alwaysMatch: {
    browserName: 'firefox',
    browserVersion: '60'
  }
};
```

```typescript
const capabilities = {
  firstMatch: [{ browserName: 'chrome' }, { browserName: 'firefox' }]
};
```

**SEE ALSO**

- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities)

## BrowserCapability

**PROPERTIES**

- `browserName?`: string
- `browserVersion?`: string
- `platformName?`: string
- `acceptInsecureCerts?`: boolean
- `goog:chromeOptions?`: [ChromeOptions](#chromeoptions)
- `moz:firefoxOptions?`: [FirefoxOptions](#firefoxoptions)
- `se:ieOptions?`: [InternetExplorerOptions](#internetexploreroptions)
- `bstack:options?`: [BrowserStackOptions](#browserstackoptions)

## ChromeOptions

**PROPERTIES**

- `w3c?`: boolean
- `binary?`: string
- `args?`: string[]

## FirefoxOptions

**PROPERTIES**

- `binary?`: string
- `args?`: string[]
- `profile?`: string
- `log?`: object
  - `level?`: string
- `prefs?`: object

**SEE ALSO**

- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities/firefoxOptions)

## InternetExplorerOptions

**PROPERTIES**

- `ignoreProtectedModeSettings`: boolean
- `ignoreZoomSetting`: boolean
- `ie.ensureCleanSession`: boolean

## BrowserStackOptions

**PROPERTIES**

- `os?`: string
- `osVersion?`: string
- `sessionName?`: string
- `buildName?`: string
- `projectName?`: string
- `debug?`: boolean
- `networkLogs?`: boolean
- `local?`: boolean
- `safari?`: object
  - `enablePopups?`: boolean
  - `allowAllCookies?`: boolean
