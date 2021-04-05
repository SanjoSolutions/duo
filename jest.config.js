module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  resolver: "jest-ts-webcompat-resolver",
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "**/tests/unit/**/*.spec.[jt]s?(x)",
    "**/__tests__/*.[jt]s?(x)",
  ],
};
