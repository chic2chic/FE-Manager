import path from "path";
import { Page } from "playwright/test";
import fs from "fs";
import process from "process";

/**
 * 해당 함수는 E2E 테스트에서 공통적으로 적용되는
 * 팝업 선택 -> 메인페이지 이동 기능을 담당합니다.
 *
 * 각 테스트의 BeforeEach에 추가하도록 합시다
 *
 * @param page Playwright에서 사용하는 Page를 매개변수로 받습니다.
 */

export async function NavigateDashboard(page: Page) {
  await page.goto("/popup-list");
  await page.waitForLoadState("networkidle");

  const allPopups = page.locator('span[data-testid^="popup-card-"]');
  const firstPopup = allPopups.first();

  await firstPopup.waitFor({ state: "visible" });
  await firstPopup.dispatchEvent("click");
  await page.waitForURL("/dashboard");
}

/**
 * package.json이랑 동일한 위치를 루트 디렉토리 Path로 인식합니다.
 * 프로젝트 루트 경로를 반환해줍니다.
 *
 * @returns 루트 디렉토리 Path를 뱉어줍니다.
 */
export function findProjectRoot(): string {
  let currentPath = process.cwd();

  while (currentPath !== path.dirname(currentPath)) {
    const packageJsonPath = path.join(currentPath, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      return currentPath;
    }
    currentPath = path.dirname(currentPath);
  }

  throw new Error("프로젝트 루트를 찾을 수 없습니다.");
}
