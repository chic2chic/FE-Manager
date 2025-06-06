import { NavigateDashboard } from "@/utils/TestHelper";
import test, { expect } from "playwright/test";

test.describe("대쉬보드 조회 Flow", () => {
  test.beforeEach(async ({ page }) => {
    await NavigateDashboard(page);
    await page.waitForLoadState("networkidle");
  });

  test("대쉬보드에서는 인기상품을 3개까지 조회할 수 있다. 만약 데이터가 없다면 조회 데이터가 없다는 문구를 보여준다.", async ({
    page,
  }) => {
    const bestItemsArea = page.locator(
      "div[data-testid='dashboard-bestItems']",
    );
    await expect(bestItemsArea).toBeVisible();

    const responsePromise = await page.waitForResponse(response => {
      const url = response.url();
      return (
        url.endsWith("dashboard/trending") &&
        response.request().method() === "GET"
      );
    });

    const responseBody = await responsePromise.json();

    if (responseBody.data.length > 0) {
      const productCards = bestItemsArea.locator(
        'div[data-testid*="dashboard-bestItems-"]',
      );
      const cardCount = await productCards.count();
      expect(cardCount).toBeGreaterThan(0);
      expect(cardCount).toBeLessThanOrEqual(3);
    } else {
      await expect(
        bestItemsArea.getByText("조회된 데이터가 없습니다"),
      ).toBeVisible();
    }
  });

  test("대쉬보드에서는 혼잡도 분석 데이터를 조회할 수 있다. 만약 데이터가 없다면 조회 데이터가 없다는 문구를 보여준다.", async ({
    page,
  }) => {
    const responsePromise = await page.waitForResponse(response => {
      const url = response.url();
      return (
        url.endsWith("dashboard/congestion") &&
        response.request().method() === "GET"
      );
    });

    await page.waitForTimeout(1000);
    const congestionArea = page.locator(
      "div[data-testid='dashboard-congestion']",
    );
    await congestionArea.scrollIntoViewIfNeeded();

    const response = await responsePromise;
    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    const { data } = responseBody;

    if (data && Object.keys(data).length > 0) {
      const expectedDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      const actualDays = Object.keys(data);

      actualDays.forEach(day => {
        expect(expectedDays).toContain(day);
      });

      actualDays.forEach(day => {
        const dayData = data[day];

        expect(Array.isArray(dayData)).toBe(true);
        expect(dayData.length).toBeGreaterThan(0);

        if (dayData.length > 0) {
          const firstDataPoint = dayData[0];
          expect(firstDataPoint).toHaveProperty("dayOfWeek");
          expect(firstDataPoint).toHaveProperty("time");
          expect(firstDataPoint).toHaveProperty("value");

          expect(typeof firstDataPoint.dayOfWeek).toBe("string");
          expect(typeof firstDataPoint.time).toBe("number");
          expect(typeof firstDataPoint.value).toBe("number");

          expect(firstDataPoint.time).toBeGreaterThanOrEqual(10);
          expect(firstDataPoint.time).toBeLessThanOrEqual(20);

          expect(firstDataPoint.value).toBeGreaterThanOrEqual(0);
        }
      });

      const chartElement = congestionArea.locator(
        "canvas, svg, .chart, .recharts-wrapper",
      );
      const chartExists = await chartElement.count();

      if (chartExists > 0) {
        await expect(chartElement.first()).toBeVisible();
      }

      const noDataMessage =
        congestionArea.getByText("조회된 데이터가 없습니다");
      expect(await noDataMessage.isVisible()).toBe(false);
    } else {
      const noDataMessage =
        congestionArea.getByText("조회된 데이터가 없습니다");
      await expect(noDataMessage).toBeVisible();
    }
  });
});
