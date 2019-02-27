import { GET, POST } from './rest';
import WebDriver from './types';

export default class WebDriverElement implements WebDriver.Element {
  private url: string;
  private sessionId: string;
  private elementId: string;
  private options: { JsonWire: boolean };

  constructor(url: string, sessionId: string, elementId: string, options: { JsonWire: boolean }) {
    this.url = url;
    this.sessionId = sessionId;
    this.elementId = elementId;
    this.options = options;
  }

  async sendKeys(text: string): Promise<void> {
    await POST(
      `${this.url}/session/${this.sessionId}/element/${this.elementId}/value`,
      !this.options.JsonWire ? { text } : { value: [text] }
    );
  }

  async click(): Promise<void> {
    await POST(`${this.url}/session/${this.sessionId}/element/${this.elementId}/click`, {});
  }

  async getText(): Promise<string> {
    const text = await GET<string>(
      `${this.url}/session/${this.sessionId}/element/${this.elementId}/text`
    );

    return text;
  }

  async getCss(propertyName: string) {
    const value = await GET<string>(
      `${this.url}/session/${this.sessionId}/element/${this.elementId}/css/${propertyName}`
    );
    return value;
  }
}
