import { ChildProcess } from "child_process";

let instance: ChildProcess;

export const setInstance = (newInstance: ChildProcess) => {
  instance = newInstance;
}

export const getInstance = (): ChildProcess | undefined => instance;
