import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.mjs",
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:4321",
    browserName: "chromium",
    headless: true,
    launchOptions: process.env.CHROMIUM_EXECUTABLE
      ? {
          executablePath: process.env.CHROMIUM_EXECUTABLE,
          args: ["--no-sandbox", "--disable-dev-shm-usage", "--no-zygote"],
        }
      : {},
  },
  reporter: [["list"], ["json", { outputFile: "test-results/results.json" }]],
  webServer: {
    command: "npm run preview -- --port 4321",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  workers: 2,
});
