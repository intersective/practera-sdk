'use strict';
module.exports = {
  preset: 'ts-jest',
  roots: ['src/'],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: [
    'src/services/**/*.ts',
    'src/index.ts'
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    "mock-data.ts",
    ".spec.ts",
  ],
  coverageDirectory: 'coverage/',
  testMatch: [
    '**/?(*.)spec.ts'
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
};
