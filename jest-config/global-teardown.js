import { stop as stopDriver } from './webdriver';
import { stop as stopTestApp } from '../test-app';

async function teardown() {
  await stopDriver();
  await stopTestApp();
}

export default teardown;
