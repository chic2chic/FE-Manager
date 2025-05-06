// import type { Config } from "jest";

// const config: Config = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   transform: {
//     "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
//   },
//   // transform: {
//   //   "^.+\\.tsx?$": [
//   //     "ts-jest",
//   //     {
//   //       tsconfig: "tsconfig.test.json",
//   //     },
//   //   ],
//   // },
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//     "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
//     // "\\.(jpg|jpeg|png|webp|svg)$": "identity-obj-proxy",
//     // "^@/(.*)$": "<rootDir>/src/$1",
//     "^@$": "<rootDir>/src",
//     "^@/(.*)": "<rootDir>/src/$1",
//   },
//   testMatch: ["**/__test__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
//   setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
// };

// export default config;

// jest.config.js
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/__mocks__/imageMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};
