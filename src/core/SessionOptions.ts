import { Capabilities } from './Capabilities';
import { Headers } from '../rest';

/**
 * @section Sessions
 */
export type SessionOptions = {
  /**
   * WebDriver server URL
   */
  url: string;
  /**
   * WebDriver capabilities
   */
  capabilities: Capabilities;
  /**
   * Legacy WebDriver capabilities. Can be used to enable the new W3C dialect
   */
  desiredCapabilities?: {
    'browserstack.use_w3c': boolean;
  };
  /**
   * Session creation request headers. Can be used for authorization.
   */
  headers?: Headers;
};
