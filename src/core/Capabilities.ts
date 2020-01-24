/**
 * @section Capabilities
 */
export type ChromeOptions = {
  w3c?: boolean;
  binary?: string;
  args?: string[];
};

/**
 * @section Capabilities
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities/firefoxOptions|MDN web docs}
 */
export type FirefoxOptions = {
  binary?: string;
  args?: string[];
  profile?: string;
  log?: {
    level?: string;
  };
  prefs?: object;
};

/**
 * @section Capabilities
 */
export type InternetExplorerOptions = {
  ignoreProtectedModeSettings: boolean;
  ignoreZoomSetting: boolean;
  'ie.ensureCleanSession': boolean;
};

/**
 * @section Capabilities
 */
export type BrowserStackOptions = {
  os?: string;
  osVersion?: string;
  sessionName?: string;
  buildName?: string;
  projectName?: string;
  debug?: boolean;
  console?: 'error';
  networkLogs?: boolean;
  local?: boolean;
  seleniumVersion?: string;
  safari?: {
    enablePopups?: boolean;
    allowAllCookies?: boolean;
  };
};

/**
 * @section Capabilities
 */
export type BrowserCapability = {
  browserName?: string;
  browserVersion?: string;
  platformName?: string;
  acceptInsecureCerts?: boolean;

  'goog:chromeOptions'?: ChromeOptions;
  'moz:firefoxOptions'?: FirefoxOptions;
  'se:ieOptions'?: InternetExplorerOptions;
  'bstack:options'?: BrowserStackOptions;
};

/**
 * Before we can send any command to the browser we drive we need to create a [WebDriver](https://www.w3.org/TR/webdriver) session.
 * This should be always the first step of interaction using the protocol.
 * To create a new session we need to provide some requirements like `browserName`, `browserVersion`, `platformName`.
 * These requirements are called [`Capabilities`](https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities).
 * This is especially important when we interact not directly with a single browser but with a grid of browsers.
 * Using `alwaysMatch` property we can provide some strict requirements.
 * If the WebDriver sever can't provide the required features the session creation will fail.
 * Using `firstMatch` property we can provide a list of requirements.
 * During session creation the server will pick the first capability it's able to match.
 * `firstMatch` can of course be combined with `alwaysMatch` to narrow down the selection.
 *
 * @section Capabilities
 * @example
 * const capabilities = {
 *   alwaysMatch: {
 *     browserName: 'firefox',
 *     browserVersion: '60'
 *   }
 * }
 * @example
 * const capabilities = {
 *   firstMatch: [
 *     { browserName: 'chrome' },
 *     { browserName: 'firefox' }
 *   ]
 * }
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities|MDN web docs}
 */
export type Capabilities = {
  alwaysMatch?: BrowserCapability;
  firstMatch?: BrowserCapability[];
};
