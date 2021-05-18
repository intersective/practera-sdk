'use strict';
module.exports = {
  preset: 'ts-jest',
  roots: ['./src/testing'],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: 'coverage/',
  testMatch: [
    '**/?(*.)spec.ts'
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
};
