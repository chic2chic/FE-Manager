const puppeteer = require("../node_modules/puppeteer");
const fs = require("fs");

async function setupAuth() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();

  try {
    console.log("인증 설정 시작");

    await page.goto("http://localhost:4173/onboarding", {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // 페이지 로드 후 요소들 확인
    console.log("페이지 로드 완료, 요소 확인 중...");

    // 이메일 필드 존재 확인
    const emailField = await page.$("#input-Email");
    const passwordField = await page.$("#input-PW");
    console.log("이메일 필드 존재:", !!emailField);
    console.log("패스워드 필드 존재:", !!passwordField);

    if (!emailField || !passwordField) {
      console.log("페이지 HTML:", await page.content());
      throw new Error("로그인 필드를 찾을 수 없습니다");
    }

    // 환경변수 확인
    console.log("TEST_EMAIL:", process.env.TEST_EMAIL ? "설정됨" : "없음");
    console.log(
      "TEST_PASSWORD:",
      process.env.TEST_PASSWORD ? "설정됨" : "없음",
    );

    // 로그인 수행
    console.log("이메일 입력 중...");
    await page.type("#input-Email", process.env.TEST_EMAIL);

    console.log("패스워드 입력 중...");
    await page.type("#input-PW", process.env.TEST_PASSWORD);

    // 스크롤
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // 버튼 상태 확인
    const buttonExists = await page.$("button:not([disabled])");
    console.log("활성화된 버튼 존재:", !!buttonExists);

    if (!buttonExists) {
      // 모든 버튼 확인
      const allButtons = await page.$eval("button", buttons =>
        buttons.map(btn => ({
          text: btn.textContent.trim(),
          disabled: btn.disabled,
          type: btn.type,
        })),
      );
      console.log("페이지의 모든 버튼:", allButtons);
    }

    await page.waitForSelector("button:not([disabled])", {
      visible: true,
      timeout: 10000,
    });

    console.log("로그인 버튼 클릭 중...");
    await page.click("button:not([disabled])");

    // 클릭 후 잠시 대기
    await page.waitForTimeout(3000);

    // 현재 상태 확인
    const currentUrl = await page.url();
    console.log("클릭 후 URL:", currentUrl);

    // localStorage 확인
    const storageCheck = await page.evaluate(() => {
      const authStorage = localStorage.getItem("auth-storage");
      console.log("localStorage 내용:", authStorage);
      return authStorage;
    });

    // 페이지에 에러 메시지가 있는지 확인
    const errorMessages = await page.$eval(
      '[class*="error"], [class*="Error"], .error-message',
      elements => elements.map(el => el.textContent.trim()),
    );
    if (errorMessages.length > 0) {
      console.log("페이지 에러 메시지:", errorMessages);
    }

    // 더 긴 대기시간으로 시도
    try {
      await page.waitForFunction(
        () => {
          const authStorage = localStorage.getItem("auth-storage");
          return authStorage && JSON.parse(authStorage).state?.accessToken;
        },
        { timeout: 15000 },
      );
      console.log("토큰 생성 확인됨");
    } catch (timeoutError) {
      console.log("토큰 생성 타임아웃");

      // 최종 상태 확인
      const finalUrl = await page.url();
      const finalStorage = await page.evaluate(() =>
        localStorage.getItem("auth-storage"),
      );

      console.log("최종 URL:", finalUrl);
      console.log("최종 localStorage:", finalStorage);

      throw new Error("로그인 실패: 토큰이 생성되지 않았습니다");
    }

    // 인증 정보 추출
    const authData = await page.evaluate(() => {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        return parsed.state?.accessToken;
      }
      return null;
    });

    const cookies = await page.cookies();

    // 인증 정보를 파일로 저장
    const authInfo = {
      token: authData,
      cookies: cookies,
      timestamp: new Date().toISOString(),
    };

    fs.writeFileSync("./auth-data.json", JSON.stringify(authInfo, null, 2));
    console.log("인증 정보 저장 완료");
    console.log("토큰:", authData ? "있음" : "없음");
    console.log("쿠키 개수:", cookies.length);

    await browser.close();
    return authInfo;
  } catch (error) {
    console.error("인증 설정 실패:", error);
    await browser.close();
    throw error;
  }
}

// 직접 실행시 auth 설정
if (require.main === module) {
  setupAuth().catch(console.error);
}

module.exports = setupAuth;
