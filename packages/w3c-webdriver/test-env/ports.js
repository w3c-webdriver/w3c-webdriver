import portscanner from 'portscanner';
import waitOn from 'wait-on';

export const getFreePorts = async (startPort, endPort, n) => {
  let port = startPort - 1;
  const ports = [];
  while (ports.length < n) {
    /* eslint-disable no-await-in-loop */
    port = await portscanner.findAPortNotInUse(port + 1, endPort, '127.0.0.1');
    ports.push(port);
  }
  return ports;
};

export const waitForBusyPort = port =>
  new Promise((resolve, reject) => {
    waitOn({ resources: [`tcp:127.0.0.1:${port}`] }, err => (err ? reject(err) : resolve()));
  });

export const waitForFreePort = port =>
  new Promise((resolve, reject) => {
    waitOn({ resources: [`tcp:127.0.0.1:${port}`], reverse: true }, err =>
      err ? reject(err) : resolve()
    );
  });
