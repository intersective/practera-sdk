'use strict';
module.exports = {
  preset: 'ts-jest',
  roots: ['src/'],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    "mock-data.ts",
    ".spec.ts",
  ],
  coverageDirectory: 'coverage/',
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
};
