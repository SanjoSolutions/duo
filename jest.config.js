module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  resolver: "jest-ts-webcompat-resolver",
  testMatch: [
    "<rootDir>/src/**/*.spec.[jt]s?(x)"
  ]
}
