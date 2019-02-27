import portscanner from 'portscanner';
import waitOn from 'wait-on';

export const getFreePorts = async (startPort: number, endPort: number, numberOfPorts:number) => {
  let port = startPort - 1;
  const ports = [];
  while (ports.length < numberOfPorts) {
    /* eslint-disable no-await-in-loop */
    port = await portscanner.findAPortNotInUse(port + 1, endPort, '127.0.0.1');
    ports.push(port);
  }
  return ports;
};

export const waitForBusyPort = (port: number) =>
  new Promise((resolve, reject) => {
    waitOn({ resources: [`tcp:127.0.0.1:${port}`] }, err => (err ? reject(err) : resolve()));
  });

export const waitForFreePort = (port: number) =>
  new Promise((resolve, reject) => {
    waitOn({ resources: [`tcp:127.0.0.1:${port}`], reverse: true }, err =>
      err ? reject(err) : resolve()
    );
  });
