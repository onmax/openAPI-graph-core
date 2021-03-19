module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    "ts-jest": {
      diagnostics: false,
      module: "ES2020",
      tsconfig: "./tsconfig.json"
    }
  },
};