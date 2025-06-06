import { defineConfig, devices } from "@playwright/test";
import path from "path";
import process from "process";
import dotenv from "dotenv";

const isCI = !!process.env.CI;
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: false,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: "html",
  globalSetup: path.resolve("./tests/global-setup.ts"),

  use: {
    // baseURL: `${isCI ? process.env.VITE_DNS_URL : "http://localhost:3000"}`,
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
    storageState: "tests/auth.json",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "default-helper-func",
      testMatch: /.*DefaultFlow\.spec\.ts/,
      use: {
        storageState: undefined,
      },
      dependencies: ["setup"],
    },
    {
      name: "core",
      testMatch: /^(?!.*DefaultFlow).*\.spec\.ts$/,
      use: {
        ...devices["Desktop Chrome"],
      },
      dependencies: ["default-helper-func"],
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  ...(isCI
    ? {}
    : {
        webServer: {
          command: "npm run dev",
          url: "http://localhost:3000",
          reuseExistingServer: true,
        },
      }),
});
