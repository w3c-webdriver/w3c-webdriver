declare module 'geckodriver' {
  export const path: string;
}

declare module 'iedriver' {
  export const path: string;
}

declare module 'browserstack-local' {
  interface LocalStartOptions {
    key: string;
  }

  /**
   * BrowserStack proxy server for testing website running on localhost
   */
  export class LocalServer {
    public start: (options: LocalStartOptions, callback: Function) => void;
    public stop: (callback: Function) => void;
  }
}

declare namespace jasmine {
  /**
   * Jest testing environment
   */
  class JestEnvironment {
    // tslint:disable-next-line: no-any
    public addReporter(reporter: any): void;
  }

  function getEnv(): JestEnvironment;
  let testPath: string;
}
