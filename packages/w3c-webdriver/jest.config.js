module.exports = {
  globalSetup: './test-env/globalSetup.ts',
  globalTeardown: './test-env/globalTeardown.ts',
  setupFilesAfterEnv: ['./test-env/setup.ts'],
  reporters: ['default', process.env.CI && 'jest-junit'].filter(Boolean),
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,ts}",
    "!<rootDir>/src/**/*.test.{js,ts}"
  ],
  coverageReporters: ['html', process.env.CI && 'cobertura'].filter(Boolean),
  ...(process.env.CI && { collectCoverage: true }),
  ...(process.env.BROWSER === 'safari' && { maxConcurrency: 1 })
};
