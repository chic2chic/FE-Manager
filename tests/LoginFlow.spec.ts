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
    await page.getByRole("button", { name: "login" }).click();

    await expect(page).toHaveURL("/popup-list");
  });
});
