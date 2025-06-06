import { findProjectRoot, NavigateDashboard } from "@/utils/TestHelper";
import path from "path";
import test, { expect, Page } from "playwright/test";

test.describe("팝업스토어 등록 Flow", () => {
  let sharedPage: Page;

  test.beforeAll(async ({ browser }) => {
    sharedPage = await browser.newPage();
    await NavigateDashboard(sharedPage);
  });

  test.describe.configure({ mode: "serial" });

  test("팝업 리스트 페이지에서 팝업 등록 페이지로 이동할 수 있다.", async () => {
    // given - 팝업 리스트 페이지로 이동하고 '+' 버튼이 보이는 상태
    await sharedPage.goto("/popup-list");
    await sharedPage.waitForLoadState("networkidle");
    const plusBtn = sharedPage.locator('div[data-testid^="popup-create-btn"]');
    expect(plusBtn).toBeVisible();

    // when - '+' 버튼을 클릭한다
    await plusBtn.click();

    // then - 팝업 등록 페이지로 이동되었는지 확인
    await expect(sharedPage).toHaveURL("/popup-create");
  });

  test("입력 필드를 모두 채우지 않으면 오류 문구가 발생한다.", async () => {
    // given - 페이지 맨 아래로 스크롤한 후 Wide 버튼 찾기 & Alert Div와 저장하기 버튼 요소 찾기
    await sharedPage.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );
    await sharedPage.waitForTimeout(500);

    const wideBtn = sharedPage.locator(
      'div[data-testid="popup-create-wideBtn"]',
    );

    await sharedPage.waitForLoadState("networkidle");
    await wideBtn.click();

    const divAlertMsg = sharedPage.locator(
      'div[data-testid="popup-create-alert-message"]',
    );
    const saveBtn = sharedPage.locator(
      'button[data-testid="popup-create-save-btn"]',
    );

    await sharedPage.waitForLoadState("networkidle");

    // when - SaveBtn 클릭
    await saveBtn.click();

    // then - 오류 버튼이 화면에 보임
    await expect(divAlertMsg).toBeVisible();
  });

  test("PostCode 버튼 클릭 시 즉시 주소 입력", async () => {
    // Daum PostCode API 호출을 모킹해서 사용할 예정이므로 이쪽으로 나가는 API를 차단
    await sharedPage.route("**/postcode/**", route => route.abort());
    await sharedPage.route("**/daumcdn.net/**", route => route.abort());
    await sharedPage.route("**/daum.net/**", route => route.abort());

    // Mock 설정 - 실제 성공 요청의 주소 사용
    await sharedPage.addInitScript(() => {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      (window as any).daum = {
        Postcode: function (options: any) {
          return {
            embed: function () {
              options.oncomplete({
                jibunAddress: "서울 강동구 천호동 287-5", // 실제 성공 요청과 동일
              });
            },
          };
        },
        maps: {
          services: {
            Geocoder: function () {
              return {
                addressSearch: function (_address: string, callback: any) {
                  callback(
                    [{ y: "37.5493603874142", x: "127.128169354749" }], // 실제 성공 요청의 좌표
                    "OK",
                  );
                },
              };
            },
            Status: { OK: "OK" },
          },
        },
      };
      /* eslint-enable @typescript-eslint/no-explicit-any */
    });

    await sharedPage.reload();
    await sharedPage.waitForLoadState("networkidle");

    const searchButton = sharedPage.locator(
      '[data-testid="postcode-search-button"]',
    );
    const addressInput = sharedPage.locator(
      '[data-testid="postcode-address-input"]',
    );

    await expect(searchButton).toBeVisible();
    await searchButton.click();

    await sharedPage.waitForTimeout(2000);

    await expect(addressInput).toHaveValue("서울 강동구 천호동 287-5");
  });

  test("팝업 정보 필드를 모두 채운다.", async () => {
    await sharedPage.waitForLoadState("networkidle");

    await sharedPage
      .locator('[data-testid="popup-create-input-name"]')
      .fill("12");

    // 시간 입력
    await sharedPage
      .locator('[data-testid="popup-create-run-open-time"]')
      .fill("12");
    await sharedPage
      .locator('[data-testid="popup-create-run-close-time"]')
      .fill("12");

    // 용량 입력
    await sharedPage
      .locator('[data-testid="popup-create-time-capacity"]')
      .fill("12");
    await sharedPage
      .locator('[data-testid="popup-create-total-capacity"]')
      .fill("12");

    // 예약 시간 입력
    await sharedPage
      .locator('[data-testid="popup-create-reserv-open"]')
      .fill("3");
    await sharedPage
      .locator('[data-testid="popup-create-reserv-close"]')
      .fill("3");

    // 상세 주소
    await sharedPage
      .locator('[data-testid="popup-create-detail-address"]')
      .fill("12");
  });

  test("팝업 등록 페이지에서 이미지를 업로드하면, Preview 이미지가 생성된다.", async () => {
    // given - 팝업 등록 페이지에서 이미지 업로드 영역이 준비된 상태
    await sharedPage.waitForLoadState("networkidle");
    const noImageComponent = sharedPage
      .locator("div")
      .filter({ hasText: /이미지를 업로드해주세요/ })
      .first();
    await expect(noImageComponent).toBeVisible();

    const fileInput = sharedPage.locator(
      'input[data-testid="popup-create-img-btn"]',
    );
    await expect(fileInput).toBeAttached();

    // 테스트용 이미지 파일 경로 설정
    const projectRoot = findProjectRoot();
    const testImagePath = path.join(projectRoot, "src/assets/jpeg/test.jpeg");

    // when - 이미지 파일을 업로드한다
    await fileInput.setInputFiles(testImagePath);

    await sharedPage.waitForTimeout(1000); // 잠깐 기다리기

    const previewImage = sharedPage.locator(
      'img[data-testid="popup-create-preview-img"]',
    );

    // then - 업로드된 이미지가 미리보기로 표시되고, 기존 메시지가 사라졌는지 확인
    await expect(previewImage).toBeVisible();
    const imageSrc = await previewImage.getAttribute("src");
    expect(imageSrc).toMatch(/^blob:|^data:image/);

    await expect(noImageComponent).not.toBeVisible();
  });

  test("설문지를 Q1, Q2 기준으로 찾아서 입력한다", async () => {
    await sharedPage.waitForLoadState("networkidle");

    // Wide 버튼 클릭
    await sharedPage.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );
    await sharedPage.waitForTimeout(500);

    const wideBtn = sharedPage.locator(
      'div[data-testid="popup-create-wideBtn"]',
    );
    await wideBtn.click();
    await sharedPage.waitForTimeout(1000);

    // Q1 영역 찾기
    const q1Section = sharedPage.locator('text="Q1."').locator("..");
    const q1Inputs = q1Section.locator('input[placeholder*="답변"]');

    // Q1 입력
    await q1Inputs.nth(0).scrollIntoViewIfNeeded();
    await sharedPage.waitForTimeout(500);
    await q1Inputs.nth(0).fill("12");
    await q1Inputs.nth(1).fill("12");

    // Q2 영역 찾기
    const q2Section = sharedPage.locator('text="Q2."').locator("..");
    const q2Inputs = q2Section.locator('input[placeholder*="답변"]');

    // Q2 입력
    await q2Inputs.nth(0).scrollIntoViewIfNeeded();
    await sharedPage.waitForTimeout(500);
    await q2Inputs.nth(0).fill("12");
    await q2Inputs.nth(1).fill("12");

    const q3Section = sharedPage.locator('text="Q3."').locator("..");
    const q3Inputs = q3Section.locator('input[placeholder*="답변"]');

    // Q3 입력
    await q3Inputs.nth(0).scrollIntoViewIfNeeded();
    await sharedPage.waitForTimeout(500);
    await q3Inputs.nth(0).fill("12");
    await q3Inputs.nth(1).fill("12");

    const q4Section = sharedPage.locator('text="Q4."').locator("..");
    const q4Inputs = q4Section.locator('input[placeholder*="답변"]');

    // Q4 입력
    await q4Inputs.nth(0).scrollIntoViewIfNeeded();
    await sharedPage.waitForTimeout(500);
    await q4Inputs.nth(0).fill("12");
    await q4Inputs.nth(1).fill("12");

    // 저장 버튼 클릭
    await sharedPage.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );
    await sharedPage.waitForTimeout(1500);

    const saveBtn = sharedPage.locator('[data-testid="popup-create-save-btn"]');
    await saveBtn.click();

    await sharedPage.waitForTimeout(3000);

    await expect(sharedPage.getByText("팝업이 등록되었습니다")).toBeVisible();
  });
});
