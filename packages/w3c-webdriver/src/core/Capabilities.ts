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
 */
export type FirefoxOptions = {
  log?: {
    level?: string;
  };
  args?: string[];
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
  networkLogs?: boolean;
  local?: boolean;
  safari?: {
    enablePopups?: boolean;
    allowAllCookies?: boolean;
  };
};

/**
 * @section Capabilities
 */
export type BrowserCapability = {
  browserName: string;
  'goog:chromeOptions'?: ChromeOptions;
  'moz:firefoxOptions'?: FirefoxOptions;
  'se:ieOptions'?: InternetExplorerOptions;
  'bstack:options'?: BrowserStackOptions;
};

/**
 * @section Capabilities
 */
export type Capabilities = {
  alwaysMatch?: BrowserCapability;
  firstMatch?: BrowserCapability[];
};

