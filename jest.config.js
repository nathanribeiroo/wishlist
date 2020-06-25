module.exports = {
  bail: true,
  clearMocks: true,
  // collectCoverage: true,
  // collectCoverageFrom: ["src/**"],
  // coverageDirectory: "src/__tests__/coverage",
  modulePathIgnorePatterns: [
    "/src/database/",
    "/src/__tests__/coverage/",
    "/src/__tests__/utils/",
    "/src/index.ts"
  ],
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.spec.ts?(x)"
  ]
};
