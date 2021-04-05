module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  resolver: "jest-ts-webcompat-resolver",
  testMatch: [
    "<rootDir>/tests/e2e/**/*.spec.[jt]s?(x)",
  ]
}
