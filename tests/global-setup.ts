import { chromium, FullConfig } from "@playwright/test";
import fs from "fs";
import process from "process";

async function globalSetup(config: FullConfig) {
  const authFile = "tests/auth.json";

  if (fs.existsSync(authFile) && !process.env.CI) {
    return;
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseURL = config.projects?.[0]?.use?.baseURL;

  try {
    await page.goto(`${baseURL}/onboarding`);
    await page.waitForSelector('input[placeholder*="아이디를 입력해주세요"]', {
      timeout: 10000,
    });

    await page.getByPlaceholder("아이디를 입력해주세요").fill("manager1");
    await page.getByPlaceholder("비밀번호를 입력해주세요").fill("password1");
    await page.click('button:has-text("login")');

    await page.waitForTimeout(3000);

    await page.context().storageState({ path: authFile });
  } finally {
    await browser.close();
  }
}

export default globalSetup;
