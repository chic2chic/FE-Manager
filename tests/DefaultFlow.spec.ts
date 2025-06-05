import test, { expect } from "playwright/test";

test.describe("헬퍼함수 기능 테스트", () => {
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
