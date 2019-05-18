import { session } from '../test-env/session';

// tslint:disable-next-line: export-name
export async function createWindow(): Promise<string> {
  const handlesBefore = await session.getWindowHandles();
  await session.executeScript(`window.open()`);
  const handlesAfter = await session.getWindowHandles();
  const newHandle = handlesAfter.find((handle: string) => !handlesBefore.includes(handle));

  if (!newHandle) {
    throw new Error('Creating new Window was not successful');
  }

  await session.switchToWindow(newHandle);

  return newHandle;
}
