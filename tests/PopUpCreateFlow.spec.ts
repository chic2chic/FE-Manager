import { NavigateDashboard } from "@/utils/TestHelper";
import test, { Page } from "playwright/test";

test.describe("팝업스토어 등록 Flow", () => {
  let sharedPage: Page;

  test.beforeAll(async ({ browser }) => {
    sharedPage = await browser.newPage();
    await NavigateDashboard(sharedPage);
  });

  test("현재 URL 찍어보기", async () => {
    const currentUrl = sharedPage.url();
    console.log("현재 URL:", currentUrl);
  });
});
