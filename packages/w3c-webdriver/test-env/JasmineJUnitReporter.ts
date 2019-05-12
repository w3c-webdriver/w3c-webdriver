import { writeFileSync } from 'fs';
import xml from 'xml';

/**
 * Jest Jasmine JUnit XML Reporter
 */
export class JasmineJUnitReporter {
  private readonly outputFile: string;
  private readonly testcases: object[] = [];
  private jasmineStartTime = Date.now();
  private specStartTime = Date.now();
  private output: string[] = [];

  constructor(outputFile: string) {
    this.outputFile = outputFile;
  }

  public jasmineStarted() {
    this.jasmineStartTime = Date.now();
    const originalStdoutWrite = process.stdout.write.bind(process.stdout);
    const originalStderrWrite = process.stderr.write.bind(process.stderr);
    // tslint:disable-next-line: no-any
    process.stdout.write = (...args: [string, any?, any?]) => {
      this.output.push(args[0]);

      return originalStdoutWrite(...args);
    };
    // tslint:disable-next-line: no-any
    process.stderr.write = (...args: [string, any?, any?]) => {
      this.output.push(args[0]);

      return originalStderrWrite(...args);
    };
  }

  public specStarted() {
    this.specStartTime = Date.now();
  }

  public specDone({
    description,
    fullName,
    status,
    failedExpectations
  }: {
    description: string;
    fullName: string;
    status: string;
    failedExpectations: Error[];
  }) {
    const descIndex = fullName.indexOf(description);
    const name = [fullName.slice(0, descIndex), description].join(':: ');
    const duration = Date.now() - this.specStartTime;
    this.testcases.push({
      testcase: this.createTestCase({
        name,
        status,
        duration,
        failure: failedExpectations[0]
      })
    });
    this.output = [];
  }

  public jasmineDone() {
    const duration = Date.now() - this.jasmineStartTime;

    writeFileSync(
      this.outputFile,
      xml({
        testsuites: [
          {
            testsuite: [{ _attr: { time: duration / 1000 } }, ...this.testcases]
          }
        ]
      }),
      'utf8'
    );
  }

  private createTestCase({ name, status, failure, duration }: { name: string; status: string; failure: Error; duration: number }) {
    const errors = [
      status === 'failed' && 'Status is failed',
      this.output.some(message => /error/i.test(message)) && 'stdout contains string "error"'
    ].filter(Boolean);

    return [
      { _attr: { name, time: duration / 1000 } },
      (failure || errors.length) && {
        failure: {
          _attr: {
            message: failure ? failure.message : errors.join('. ')
          },
          _cdata: failure && (failure.stack || failure.message)
        }
      },
      {
        'system-out': {
          _cdata: this.output.join('')
        }
      }
    ].filter(Boolean);
  }
}
