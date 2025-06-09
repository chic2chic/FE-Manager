import { NavigateDashboard } from "@/utils/TestHelper";
import test, { Page, expect } from "playwright/test";
import path from "path";
import { fileURLToPath } from "url";

type PresignedRequestBody = {
  imageFileExtension: "JPEG" | "JPG" | "PNG";
  imageDirectory: "ITEM" | "POPUP";
};

test.describe.configure({ mode: "serial" });

test.describe("상품 등록 전체 Flow (presigned + PUT + 등록 POST)", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await NavigateDashboard(page);
  });

  test("이미지 업로드(PUT) 및 상품 등록 POST가 모두 정상 동작해야 한다", async () => {
    // 페이지 이동
    await page.getByRole("link", { name: "상품관리" }).click();
    await expect(page).toHaveURL("items");

    await page.locator("#item-create-button").click();
    await expect(page).toHaveURL("items/create");

    // 필드 입력
    await page.locator("#input-상품명").fill("i8");
    await page.locator("#input-가격").fill("22000");
    await page.locator("#input-수량").fill("50");
    await page.locator("#input-발주기준수량").fill("20");
    await page.locator("#input-로케이션").fill("i1");

    // 이미지 파일 지정
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.resolve(__dirname, "assets/item-sample.jpeg");

    await page.setInputFiles('input[type="file"]', filePath);

    // 요청 감시
    page.on("request", req => {
      if (
        req.url().includes("/images/presigned-url") &&
        req.method() === "POST"
      ) {
        const data = req.postDataJSON() as PresignedRequestBody;
        expect(data).toMatchObject({
          imageFileExtension: "JPEG",
          imageDirectory: "ITEM",
        });
      }
    });

    await page.getByRole("button", { name: "등록" }).click();
    // 응답 기다림
    const [presignedResponse, putRequest, itemPostResponse] = await Promise.all(
      [
        page.waitForResponse(
          res =>
            res.url().includes("/images/presigned-url") && res.status() === 200,
        ),
        page.waitForRequest(
          req => req.method() === "PUT" && req.url().includes("amazonaws.com"),
        ),
        page.waitForResponse(
          res => res.url().includes("/items") && res.status() === 201,
        ),
      ],
    );

    // 검증
    expect(presignedResponse.ok()).toBeTruthy();
    expect(putRequest.method()).toBe("PUT");
    const itemPostData = await itemPostResponse.json();
    expect(itemPostData.success).toBe(true);
    expect(itemPostData.data).toBeDefined();

    // 모달 확인 + 리스트 페이지 이동 확인
    await expect(page.getByText("상품이 등록되었습니다")).toBeVisible();
    await page.getByRole("button", { name: "확인" }).click();
    await page.waitForURL("/items");
    await expect(page).toHaveURL("/items");
  });
});
