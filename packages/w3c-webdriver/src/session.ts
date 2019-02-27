import { GET, POST, DELETE } from './rest';
import WebDriverElement from './element';
import WebDriver from './types';

export default class WebDriverSession implements WebDriver.Session {
  private url: string;
  private sessionId: string;
  private options: { JsonWire: boolean };

  constructor(url: string, sessionId: string, options: { JsonWire: boolean }) {
    this.url = url;
    this.sessionId = sessionId;
    this.options = options;
  }

  async delete(): Promise<void> {
    await DELETE(`${this.url}/session/${this.sessionId}`);
  }

  async go(targetUrl: string): Promise<void> {
    await POST(`${this.url}/session/${this.sessionId}/url`, { url: targetUrl });
  }

  async getTitle(): Promise<string> {
    const title = await GET<string>(`${this.url}/session/${this.sessionId}/title`);

    return title;
  }

  async findElement(
    strategy: WebDriver.LocatorStrategy,
    selector: string
  ): Promise<WebDriver.Element> {
    const element = await POST<{ [name: string]: string }>(
      `${this.url}/session/${this.sessionId}/element`,
      {
        using: strategy,
        value: selector
      }
    );

    return new WebDriverElement(
      this.url,
      this.sessionId,
      element.ELEMENT || Object.values(element)[0],
      this.options
    );
  }

  async findElements(
    strategy: WebDriver.LocatorStrategy,
    selector: string
  ) {
    const elements = await POST<[{ [name: string]: string }]>(
      `${this.url}/session/${this.sessionId}/elements`,
      {
        using: strategy,
        value: selector
      }
    );

    return elements.map(
      element =>
        new WebDriverElement(
          this.url,
          this.sessionId,
          element.ELEMENT || Object.values(element)[0],
          this.options
        )
    );
  }

  async getTimeout(): Promise<WebDriver.Timeout> {
    const timeouts = GET<WebDriver.Timeout>(`${this.url}/session/${this.sessionId}/timeouts`);

    return timeouts;
  }

  async setTimeout(timeout: WebDriver.Timeout): Promise<void> {
    await POST(`${this.url}/session/${this.sessionId}/timeouts`, timeout);
  }

  async getPageSource(): Promise<string> {
    const pageSource = await GET<string>(`${this.url}/session/${this.sessionId}/source`);

    return pageSource;
  }

  async executeScript(script: string, args: any[] = []): Promise<any> {
    const result = await POST<any>(
      `${this.url}/session/${this.sessionId}/execute${!this.options.JsonWire ? '/sync' : ''}`,
      {
        script,
        args
      }
    );

    return result;
  }

  async executeAsyncScript(script: string, args: any[] = []): Promise<any> {
    const result = await POST<any>(
      `${this.url}/session/${this.sessionId}/execute${
        !this.options.JsonWire ? '/async' : '_async'
      }`,
      {
        script,
        args
      }
    );

    return result;
  }

  async getAllCookies(): Promise<WebDriver.Cookie[]> {
    const cookies = GET<WebDriver.Cookie[]>(`${this.url}/session/${this.sessionId}/cookie`);

    return cookies;
  }

  async addCookie(cookie: WebDriver.Cookie) {
    await POST(`${this.url}/session/${this.sessionId}/cookie`, { cookie });
  }

  async takeScreenshot(): Promise<Buffer> {
    const screenshot = await GET<string>(`${this.url}/session/${this.sessionId}/screenshot`);

    return Buffer.from(screenshot, 'base64');
  }
}
