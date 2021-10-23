export async function poll({
  timeout = 5000,
  interval = 100,
  predicate,
}: {
  timeout?: number;
  interval?: number;
  predicate: () => Promise<boolean>;
}): Promise<void> {
  let timeoutTimer: NodeJS.Timeout | null = null;
  let pollTimeout: NodeJS.Timeout | null = null;

  try {
    await Promise.race([
      new Promise((_resolve, reject) => {
        timeoutTimer = setTimeout(() => {
          reject(new Error(`Condition was not met it ${timeout}ms`));
        }, timeout);
      }),
      new Promise<void>((resolve, reject) => {
        pollTimeout = setInterval(() => {
          predicate()
            .then((result) => {
              if (!result) {
                return;
              }

              resolve();
            })
            .catch(reject);
        }, interval);
      }),
    ]);
  } finally {
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }

    if (pollTimeout) {
      clearInterval(pollTimeout);
    }
  }
}
