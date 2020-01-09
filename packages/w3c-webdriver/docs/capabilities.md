# Capabilities

## Capabilities

**PROPERTIES**

- `alwaysMatch?`: [BrowserCapability](#browsercapability)
- `firstMatch?`: [BrowserCapability](#browsercapability)[]

## BrowserCapability

**PROPERTIES**

- `browserName`: string
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

- `log?`: object
  - `level?`: string
- `args?`: string[]

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