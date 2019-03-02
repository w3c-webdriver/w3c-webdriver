import { ICookie, IElement, ISession, ITimeout, LocatorStrategy } from './core';
import { Element } from './Element2';
import { DELETE, GET, POST } from './rest';

/**
 * This object represents a WebDriver session.
 */
export class Session implements ISession {
  private readonly url: string;
  private readonly sessionId: string;
  private readonly options: { JsonWire: boolean };

  constructor(url: string, sessionId: string, options: { JsonWire: boolean }) {
    this.url = url;
    this.sessionId = sessionId;
    this.options = options;
  }

  public async close(): Promise<void> {
    await DELETE(`${this.url}/session/${this.sessionId}`);
  }

  public async go(targetUrl: string): Promise<void> {
    await POST(`${this.url}/session/${this.sessionId}/url`, { url: targetUrl });
  }

  public async getTitle(): Promise<string> {
    return GET<string>(`${this.url}/session/${this.sessionId}/title`);
  }

  public async findElement(
    strategy: LocatorStrategy,
    selector: string
  ): Promise<IElement> {
    const element = await POST<{ [name: string]: string }>(
      `${this.url}/session/${this.sessionId}/element`,
      {
        using: strategy,
        value: selector
      }
    );

    return new Element(
      this.url,
      this.sessionId,
      element.ELEMENT || Object.values(element)[0],
      this.options
    );
  }

  public async findElements(
    strategy: LocatorStrategy,
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
        new Element(
          this.url,
          this.sessionId,
          element.ELEMENT || Object.values(element)[0],
          this.options
        )
    );
  }

  public async getTimeout(): Promise<ITimeout> {
    return GET<ITimeout>(`${this.url}/session/${this.sessionId}/timeouts`);
  }

  public async setTimeout(timeout: ITimeout): Promise<void> {
    await POST(`${this.url}/session/${this.sessionId}/timeouts`, timeout);
  }

  public async getPageSource(): Promise<string> {
    return GET<string>(`${this.url}/session/${this.sessionId}/source`);
  }

  // tslint:disable-next-line:no-any
  public async executeScript(script: string, args: any[] = []): Promise<any> {
    // tslint:disable-next-line:no-any
    return POST<any>(
      `${this.url}/session/${this.sessionId}/execute${!this.options.JsonWire ? '/sync' : ''}`,
      {
        script,
        args
      }
    );
  }

  // tslint:disable-next-line:no-any
  public async executeAsyncScript(script: string, args: any[] = []): Promise<any> {
    // tslint:disable-next-line:no-any
    return POST<any>(
      `${this.url}/session/${this.sessionId}/execute${
        !this.options.JsonWire ? '/async' : '_async'
      }`,
      {
        script,
        args
      }
    );
  }

  public async getAllCookies(): Promise<ICookie[]> {
    return GET<ICookie[]>(`${this.url}/session/${this.sessionId}/cookie`);
  }

  public async addCookie(cookie: ICookie) {
    await POST(`${this.url}/session/${this.sessionId}/cookie`, { cookie });
  }

  public async takeScreenshot(): Promise<Buffer> {
    const screenshot = await GET<string>(`${this.url}/session/${this.sessionId}/screenshot`);

    return Buffer.from(screenshot, 'base64');
  }
}
