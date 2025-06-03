import { defineConfig, devices } from "@playwright/test";
import path from "path";
import process from "process";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: false,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: "html",
  globalSetup: path.resolve("./tests/global-setup.ts"),

  use: {
    baseURL: `${isCI ? process.env.VITE_DNS_URL : "http://localhost:3000"}`,
    trace: "on-first-retry",
    storageState: "tests/auth.json",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
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
