declare module 'geckodriver' {
  export const path: string;
}

declare module 'iedriver' {
  export const path: string;
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
