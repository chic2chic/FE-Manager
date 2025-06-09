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

    // 로그인 수행
    await page.type("#input-Email", process.env.TEST_EMAIL);
    await page.type("#input-PW", process.env.TEST_PASSWORD);

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page.waitForSelector("button:not([disabled])", {
      visible: true,
      timeout: 10000,
    });

    await page.click("button:not([disabled])");

    // 더 긴 대기시간과 다른 조건으로 시도
    try {
      await page.waitForFunction(
        () => !window.location.href.includes("/onboarding"),
        { timeout: 15000 },
      );
    } catch (timeoutError) {
      // 타임아웃이면 현재 URL 확인
      const currentUrl = await page.url();
      console.log("현재 URL:", currentUrl);

      // URL이 변경되지 않았더라도 localStorage에 토큰이 있는지 확인
      const hasToken = await page.evaluate(() => {
        const authStorage = localStorage.getItem("auth-storage");
        return !!authStorage;
      });

      if (!hasToken) {
        throw new Error("로그인 실패: 토큰이 생성되지 않았습니다");
      }
      console.log("URL은 변경되지 않았지만 토큰은 존재합니다");
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
