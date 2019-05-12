module.exports = {
  globalSetup: './test-env/globalSetup.ts',
  globalTeardown: './test-env/globalTeardown.ts',
  setupFilesAfterEnv: ['./test-env/setup.ts'],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,ts}",
    "!<rootDir>/src/**/*.test.{js,ts}"
  ]
};
