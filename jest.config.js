"use strict";

module.exports = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/config/jest.js"],
  transform: {
    ".ts": "ts-jest",
    ".tsx": "ts-jest",
  },
  testMatch: ["**/src/**/*.spec.ts", "**/src/**/*.spec.tsx"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/**/__tests__/**/*.ts",
    "!src/**/__tests__/**/*.tsx",
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100
  //   }
  // }
};
