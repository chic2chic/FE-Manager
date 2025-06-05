import test, { expect } from "playwright/test";

test.describe("헬퍼함수 기능 테스트 - 로그인", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/onboarding");
  });

  test("발급받은 관리자 계정으로 로그인을 진행하면, 팝업 리스트 페이지로 이동된다.", async ({
    page,
  }) => {
    // 1. 필드 입력
    await page.getByPlaceholder("아이디를 입력해주세요").fill("manager1");
    await page.getByPlaceholder("비밀번호를 입력해주세요").fill("password1");

    // 2. 버튼 클릭과 동시에 응답 확인
    const [responsePromise] = await Promise.all([
      page.waitForResponse(response => response.url().includes("/auth/login")),
      page.getByRole("button", { name: "login" }).click(),
    ]);

    // 3. API 응답 검증 및 라우팅 검증
    expect(responsePromise.status()).toBe(200);
    const responseBody = await responsePromise.json();

    expect(responseBody.data).toHaveProperty("accessToken");
    expect(responseBody.success).toBe(true);
    await expect(page).toHaveURL("/popup-list");
  });

  test("인가되지 않은 관리자 계정으로 로그인을 진행하면, 로그인 실패 모달이 뜬다.", async ({
    page,
  }) => {
    // 1. 필드 입력
    await page.getByPlaceholder("아이디를 입력해주세요").fill("1");
    await page.getByPlaceholder("비밀번호를 입력해주세요").fill("1");

    // 2. 버튼 클릭과 동시에 응답 확인
    const [responsePromise] = await Promise.all([
      page.waitForResponse(response => response.url().includes("/auth/login")),
      page.getByRole("button", { name: "login" }).click(),
    ]);

    const responseBody = await responsePromise.json();

    expect(responsePromise.status()).toBe(401);
    expect(responseBody.data).toHaveProperty("errorClassName");

    await expect(page.getByText("로그인에 실패했습니다")).toBeVisible();
  });
});

test.describe("헬퍼함수 기능 테스트 - 팝업 리스트 조회 및 대쉬보드 이동", () => {
  test("팝업 리스트 조회가 가능하고 팝업이 있다면, 클릭시 대시보드 페이지로 이동한다. \n 만약 팝업이 없다면, 등록된 팝업이 없다는 문구가 보인다.", async ({
    page,
  }) => {
    // given & when - 팝업 리스트 이동시 조회 API 호출
    const [responsePromise] = await Promise.all([
      page.waitForResponse(response => {
        const url = response.url();
        return url.endsWith("/popups") && response.request().method() === "GET";
      }),
      page.goto("/popup-list"),
    ]);

    await page.waitForLoadState("networkidle"); // 네트워크가 안정화될 때까지 대기 -> waitFor과 동일한 효과 기대 가능

    // then - 조회 결과 검증
    expect(responsePromise.status()).toBe(200);
    const responseBody = await responsePromise.json();
    const numOfPopupFromAPI = responseBody.data.length;

    // 조회된 데이터가 있을 경우와 없을 경우를 if문을 통해 분기 처리
    if (numOfPopupFromAPI !== 0) {
      const allPopups = page.locator('span[id^="popup-name-"]');
      await expect(allPopups.first()).toBeVisible();

      const numOfPopupOnScreen = await allPopups.count();

      expect(numOfPopupFromAPI).toBeGreaterThan(0);
      expect(numOfPopupFromAPI).toBe(numOfPopupOnScreen);

      const firstPopup = allPopups.first();
      await firstPopup.click({ timeout: 3000 });

      await expect(page).toHaveURL("/dashboard");
    } else {
      await expect(page.getByText("등록된 팝업이 없습니다.")).toBeVisible();
    }
    await page.waitForLoadState("networkidle");
  });
});
