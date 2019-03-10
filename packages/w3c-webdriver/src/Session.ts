import { Cookie, IElement, ISession, LocatorStrategy, Timeout } from './core';
import { Element } from './Element';
import { DELETE, GET, POST } from './rest';

/**
 * This object represents a WebDriver session.
 */
export class Session implements ISession {
  private readonly url: string;
  private readonly sessionId: string;

  constructor(url: string, sessionId: string) {
    this.url = url;
    this.sessionId = sessionId;
  }

  public async deleteSession(): Promise<void> {
    await DELETE(`${this.url}/session/${this.sessionId}`);
  }

  public async go(targetUrl: string): Promise<void> {
    await POST(`${this.url}/session/${this.sessionId}/url`, { url: targetUrl });
  }

  public async getTitle(): Promise<string> {
    return GET<string>(`${this.url}/session/${this.sessionId}/title`);
  }

  public async findElement(strategy: LocatorStrategy, selector: string): Promise<IElement> {
    const element = await POST<{ [name: string]: string }>(
      `${this.url}/session/${this.sessionId}/element`,
      {
        using: strategy,
        value: selector
      }
    );

    return new Element(this.url, this.sessionId, Object.values(element)[0]);
  }

  public async findElements(strategy: LocatorStrategy, selector: string) {
    const elements = await POST<[{ [name: string]: string }]>(
      `${this.url}/session/${this.sessionId}/elements`,
      {
        using: strategy,
        value: selector
      }
    );

    return elements.map(
      element => new Element(this.url, this.sessionId, Object.values(element)[0])
    );
  }

  public async getTimeout(): Promise<Timeout> {
    return GET<Timeout>(`${this.url}/session/${this.sessionId}/timeouts`);
  }

  public async setTimeout(timeout: Timeout): Promise<void> {
    await POST(`${this.url}/session/${this.sessionId}/timeouts`, timeout);
  }

  public async getPageSource(): Promise<string> {
    return GET<string>(`${this.url}/session/${this.sessionId}/source`);
  }

  // tslint:disable-next-line:no-any
  public async executeScript(script: string, args: any[] = []): Promise<any> {
    // tslint:disable-next-line:no-any
    return POST<any>(`${this.url}/session/${this.sessionId}/execute/sync`, {
      script,
      args
    });
  }

  // tslint:disable-next-line:no-any
  public async executeAsyncScript(script: string, args: any[] = []): Promise<any> {
    // tslint:disable-next-line:no-any
    return POST<any>(`${this.url}/session/${this.sessionId}/execute/async`, {
      script,
      args
    });
  }

  public async getAllCookies(): Promise<Cookie[]> {
    return GET<Cookie[]>(`${this.url}/session/${this.sessionId}/cookie`);
  }

  public async addCookie(cookie: Cookie) {
    await POST(`${this.url}/session/${this.sessionId}/cookie`, { cookie });
  }

  public async takeScreenshot(): Promise<Buffer> {
    const screenshot = await GET<string>(`${this.url}/session/${this.sessionId}/screenshot`);

    return Buffer.from(screenshot, 'base64');
  }
}
