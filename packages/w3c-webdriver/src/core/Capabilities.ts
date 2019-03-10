type ChromeOptions = {
  w3c?: boolean;
  binary?: string;
  args?: string[];
};

type FirefoxOptions = {
  log?: {
    level?: string;
  };
  args?: string[];
};

type InternetExplorerOptions = {
  ignoreProtectedModeSettings: boolean;
  ignoreZoomSetting: boolean;
  'ie.ensureCleanSession': boolean;
};

type BrowserStackOptions = {
  os?: string;
  osVersion?: string;
  sessionName?: string;
  buildName?: string;
  projectName?: string;
  debug?: boolean;
  networkLogs?: boolean;
  local?: boolean;
};

type BrowserCapability = {
  browserName: string;
  'goog:chromeOptions'?: ChromeOptions;
  'moz:firefoxOptions'?: FirefoxOptions;
  'se:ieOptions'?: InternetExplorerOptions;
  'bstack:options'?: BrowserStackOptions;
};

export type Capabilities = {
  alwaysMatch?: BrowserCapability;
  firstMatch?: BrowserCapability[];
};

