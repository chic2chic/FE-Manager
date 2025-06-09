import test, { expect, Page } from "@playwright/test";
import { NavigateDashboard } from "@/utils/TestHelper";

test.describe("상품 목록 E2E 테스트", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await NavigateDashboard(page); // 로그인 후 대시보드 진입
  });

  test("상품 목록 페이지에서 API 호출 및 동적 데이터 렌더링을 검증한다", async () => {
    // GET /items 호출과 페이지 이동을 병렬로 대기
    const [response] = await Promise.all([
      page.waitForResponse(res =>
        res.url().endsWith("/items") && res.request().method() === "GET"
      ),
      page.goto("/items"),
    ]);
    expect(response.ok()).toBeTruthy();

    // 응답 데이터 파싱
    const body = await response.json();
    const data: Record<string, { name: string }[]> = body.data;

    // 섹션 수 검증
    const sections = Object.keys(data);
    await expect(page.locator("div.mb-12")).toHaveCount(sections.length);

    // 각 섹션 헤더 및 상품명이 화면에 렌더링되는지 동적으로 확인
    for (const section of sections) {
      await expect(page.getByText(section).first()).toBeVisible();
      for (const item of data[section]) {
        await expect(page.getByText(item.name)).toBeVisible();
      }
    }
  });
});
