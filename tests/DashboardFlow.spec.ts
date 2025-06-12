import { ReservationChartResponse, Visitor } from "@/types/api/ApiResponseType";
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
    const responsePromise = page.waitForResponse(response => {
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

  test("팝업스토어 방문자 분석 데이터를 조회할 수 있다. 만약 데이터가 없다면 조회 데이터가 없다는 문구를 보여준다.", async ({
    page,
  }) => {
    const responsePromise = page.waitForResponse(response => {
      const url = response.url();
      return (
        url.endsWith("dashboard/visitors") &&
        response.request().method() === "GET"
      );
    });

    await page.waitForLoadState("networkidle");
    const visitorArea = page.locator("div[data-testid='dashboard-visitor']");
    await visitorArea.scrollIntoViewIfNeeded();

    const response = await responsePromise;
    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    const { data } = responseBody;

    if (data && Object.keys(data).length > 0) {
      const expectedKeys = ["gender", "age"];
      const actualKeys = Object.keys(data);

      expectedKeys.forEach(key => {
        expect(actualKeys).toContain(key);
      });

      if (data.gender && Array.isArray(data.gender)) {
        expect(data.gender.length).toBeGreaterThan(0);

        data.gender.forEach((genderItem: Visitor) => {
          expect(genderItem).toHaveProperty("name");
          expect(genderItem).toHaveProperty("count");
          expect(genderItem).toHaveProperty("ratio");

          expect(typeof genderItem.name).toBe("string");
          expect(typeof genderItem.count).toBe("number");
          expect(typeof genderItem.ratio).toBe("number");

          expect(genderItem.count).toBeGreaterThanOrEqual(0);
          expect(genderItem.ratio).toBeGreaterThanOrEqual(0);
          expect(genderItem.ratio).toBeLessThanOrEqual(100);
        });
      }

      if (data.age && Array.isArray(data.age)) {
        expect(data.age.length).toBeGreaterThan(0);

        data.age.forEach((ageItem: Visitor) => {
          expect(ageItem).toHaveProperty("name");
          expect(ageItem).toHaveProperty("count");
          expect(ageItem).toHaveProperty("ratio");

          expect(typeof ageItem.name).toBe("string");
          expect(typeof ageItem.count).toBe("number");
          expect(typeof ageItem.ratio).toBe("number");

          expect(ageItem.count).toBeGreaterThanOrEqual(0);
          expect(ageItem.ratio).toBeGreaterThanOrEqual(0);
          expect(ageItem.ratio).toBeLessThanOrEqual(100);
        });
      }

      const chartElement = visitorArea.locator(
        "canvas, svg, .chart, .recharts-wrapper",
      );
      const chartExists = await chartElement.count();

      if (chartExists > 0) {
        await expect(chartElement.first()).toBeVisible();
      }

      const noDataMessage = visitorArea.getByText("조회된 데이터가 없습니다");
      expect(await noDataMessage.isVisible()).toBe(false);
    } else {
      const noDataMessage = visitorArea.getByText("조회된 데이터가 없습니다");
      await expect(noDataMessage).toBeVisible();
    }
  });

  test("예약자수 및 방문자수 데이터를 조회할 수 있다.", async ({ page }) => {
    const [reservationResponse, entrantsResponse] = await Promise.all([
      page.waitForResponse(
        response =>
          response.url().endsWith("dashboard/reservations") &&
          response.request().method() === "GET",
      ),
      page.waitForResponse(
        response =>
          response.url().endsWith("dashboard/entrants") &&
          response.request().method() === "GET",
      ),
    ]);

    await page.waitForLoadState("networkidle");
    const reservationArea = page.locator(
      "div[data-testid='dashboard-reservation']",
    );
    await reservationArea.scrollIntoViewIfNeeded();

    const reservationResponseBody = await reservationResponse.json();
    const entrantsResponseBody = await entrantsResponse.json();

    expect(reservationResponse.status()).toBe(200);
    expect(entrantsResponse.status()).toBe(200);

    const { data } = reservationResponseBody;
    const { entrantsData } = entrantsResponseBody;

    // API Response 검증만
    if (entrantsData && data.enteredCount) {
      expect(entrantsData).toHaveProperty("entrantCount");
      expect(typeof entrantsData.entrantCount).toBe("number");
    }

    if (data && data.chart && data.chart.length > 0) {
      expect(data).toHaveProperty("reservedCount");
      expect(data).toHaveProperty("chart");

      expect(typeof data.reservedCount).toBe("number");
      expect(Array.isArray(data.chart)).toBe(true);
      expect(data.reservedCount).toBeGreaterThanOrEqual(0);

      data.chart.forEach((chartItem: ReservationChartResponse) => {
        expect(chartItem).toHaveProperty("day");
        expect(chartItem).toHaveProperty("reservedCount");

        expect(typeof chartItem.day).toBe("string");
        expect(typeof chartItem.reservedCount).toBe("number");
        expect(chartItem.reservedCount).toBeGreaterThanOrEqual(0);
      });

      const expectedDays = ["월", "화", "수", "목", "금", "토", "일"];
      const actualDays = data.chart.map(
        (item: ReservationChartResponse) => item.day,
      );

      expectedDays.forEach(day => {
        expect(actualDays).toContain(day);
      });
    }
  });

  test("1인 평균 구매액 분석 데이터를 조회할 수 있다. 만약 데이터가 없다면 조회 데이터가 없다는 문구를 보여준다.", async ({
    page,
  }) => {
    const responsePromise = page.waitForResponse(response => {
      const url = response.url();
      return (
        url.endsWith("dashboard/average-purchase") &&
        response.request().method() === "GET"
      );
    });

    await page.waitForLoadState("networkidle");
    const transactionArea = page.locator(
      "div[data-testid='dashboard-transaction']",
    );
    await transactionArea.scrollIntoViewIfNeeded();

    const response = await responsePromise;
    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    if (responseBody.data) {
      expect(responseBody.data).toHaveProperty("totalAverageAmount");
      expect(responseBody.data).toHaveProperty("todayAverageAmount");
      expect(responseBody.data.totalAverageAmount).toBeGreaterThanOrEqual(0);
      expect(responseBody.data.todayAverageAmount).toBeGreaterThanOrEqual(0);
    } else {
      throw new Error("API Response 오류");
    }
  });

  test("설문지 결과 데이터를 대쉬보드를 통해 조회할 수 있다.", async ({
    page,
  }) => {
    const responsePromise = page.waitForResponse(
      response =>
        response.url().endsWith("dashboard/surveys") &&
        response.request().method() === "GET",
    );

    await page.waitForLoadState("networkidle");

    const response = await responsePromise;
    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    if (
      responseBody.data &&
      responseBody.data.surveys &&
      responseBody.data.surveys.length > 0
    ) {
      const surveyArea = page.locator(
        "div[data-testid='dashboard-questionnaire-data-exist']",
      );
      await expect(surveyArea).toBeVisible();

      expect(responseBody.data).toHaveProperty("totalCount");
      expect(responseBody.data).toHaveProperty("surveys");
      expect(Array.isArray(responseBody.data.surveys)).toBe(true);
      expect(responseBody.data.surveys.length).toBeGreaterThan(0);

      const firstSurvey = responseBody.data.surveys[0];
      expect(firstSurvey).toHaveProperty("contents");
      expect(Array.isArray(firstSurvey.contents)).toBe(true);

      if (firstSurvey.contents.length > 0) {
        for (const content of firstSurvey.contents) {
          const answerElement = surveyArea.getByText(content.title);
          await expect(answerElement).toBeVisible();
        }
      }
    } else {
      const emptyArea = page.locator(
        "div[data-testid='dashboard-questionnaire-data-empty']",
      );
      await expect(emptyArea).toBeVisible();
    }
  });

  test("구매전환율 데이터가 있다면 대쉬보드에서 확인할 수 있다.", async ({
    page,
  }) => {
    const responsePromise = page.waitForResponse(
      response =>
        response.url().endsWith("dashboard/conversion-ratio") &&
        response.request().method() === "GET",
    );

    const response = await responsePromise;
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.data).toHaveProperty("low");
    expect(responseBody.data).toHaveProperty("high");

    const conversionRateArea = page.locator(
      "div[data-testid='dashboard-conversionRate']",
    );
    await conversionRateArea.scrollIntoViewIfNeeded();

    if (responseBody.data.low.length === 0) {
      expect(
        conversionRateArea.getByText("조회된 데이터가 없습니다").isVisible(),
      ).toBe(true);
    } else {
      const chartElement = conversionRateArea.locator(
        "canvas, svg, .chart, .recharts-wrapper",
      );
      const chartExists = await chartElement.count();

      if (chartExists > 0) {
        await expect(chartElement.first()).toBeVisible();
      }
    }
  });
});
