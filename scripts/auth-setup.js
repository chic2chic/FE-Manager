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

    console.log("아이디 필드 대기 중...");
    await page.waitForSelector('input[placeholder*="아이디를 입력해주세요"]', {
      timeout: 10000,
    });

    console.log("아이디 입력: manager1");
    await page.type('input[placeholder*="아이디를 입력해주세요"]', "manager1");

    console.log("비밀번호 입력: password1");
    await page.type(
      'input[placeholder*="비밀번호를 입력해주세요"]',
      "password1",
    );

    console.log("로그인 버튼 찾는 중...");
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const loginButton = buttons.find(button =>
        button.textContent.includes("login"),
      );
      if (loginButton) {
        loginButton.click();
      }
    });

    console.log("3초 대기 중...");
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log("토큰 확인 중...");
    const authData = await page.evaluate(() => {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        return parsed.state?.accessToken;
      }
      return null;
    });

    const cookies = await page.cookies();

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

if (require.main === module) {
  setupAuth().catch(console.error);
}

module.exports = setupAuth;
