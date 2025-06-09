import { GetItemListResponse } from "@/types/api/ApiResponseType";
import { NavigateDashboard } from "@/utils/TestHelper";
import test, { expect, Page } from "@playwright/test";

test.describe("상품 조회 E2E 테스트", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await NavigateDashboard(page);
  });

  test("상품 목록 API 요청이 발생하고, 응답에 따라 UI가 렌더링된다", async () => {
    const [response] = await Promise.all([
      page.waitForResponse(
        res =>
          res.url().includes("/popups/") &&
          res.url().includes("/items") &&
          res.request().method() === "GET",
      ),
      page.goto("/items"),
    ]);

    expect(response.status()).toBe(200);

    const body = await response.json();
    const itemData = body.data as GetItemListResponse;
    const itemCount = Object.values(itemData ?? {}).flat().length;

    const productLocator = page.locator('p[id^="test-product-name-"]');

    if (itemCount > 0) {
      await expect(productLocator.first()).toBeVisible();
      expect(await productLocator.count()).toBe(itemCount);
    } else {
      await expect(page.getByText("등록된 상품이 아직 없습니다")).toBeVisible();
      await expect(page.getByText("상품 등록 버튼")).toBeVisible();
    }
  });
});
