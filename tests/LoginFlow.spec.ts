import test, { expect } from "playwright/test";

test.describe("로그인 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/onboarding");
  });

  test("발급받은 관리자 계정으로 로그인을 진행하면, 팝업 리스트 페이지로 이동된다.", async ({
    page,
  }) => {
    await page.getByPlaceholder("아이디를 입력해주세요").fill("manager1");
    await page.getByPlaceholder("비밀번호를 입력해주세요").fill("password1");

    const responsePromise = page.waitForResponse(
      response =>
        response.url().includes("/auth/login") && response.status() === 200,
    );

    await page.getByRole("button", { name: "login" }).click();

    const response = await responsePromise;

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody.data).toHaveProperty("accessToken");
    expect(responseBody.success).toBe(true);

    await expect(page).toHaveURL("/popup-list");
  });

  test("유효하지 않은 계정으로 로그인을 진행하면, 로그인이 거절된다.", async ({
    page,
  }) => {
    await page.getByPlaceholder("아이디를 입력해주세요").fill("1");
    await page.getByPlaceholder("비밀번호를 입력해주세요").fill("1");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("로그인에 실패했습니다.")).toBeTruthy();
  });

  test("첫 번째 팝업을 선택하면 대시보드 이동한다.", async ({ page }) => {
    await page.goto("/popup-list");

    const clickableElement = page
      .locator('span[class*="cursor-pointer"]')
      .first();

    await clickableElement.waitFor({ state: "visible" });

    await expect(clickableElement).toBeVisible();
    await clickableElement.click();
    await expect(page).toHaveURL("/dashboard");
  });
});
