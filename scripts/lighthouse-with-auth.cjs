const path = require("path");
const lighthouse = require(path.join(__dirname, "../node_modules/lighthouse"));
const chromeLauncher = require(
  path.join(__dirname, "../node_modules/chrome-launcher"),
);
const puppeteer = require(path.join(__dirname, "../node_modules/puppeteer"));
const process = require("process");

async function loginAndGetAuth() {
  const browser = await puppeteer.launch({
    headless: false, // 디버깅용
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();

  try {
    console.log("로그인 시작...");
    console.log("페이지 이동 중: http://localhost:4173/onboarding");

    await page.goto("http://localhost:4173/onboarding", {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    console.log("페이지 로드 완료");
    console.log("이메일 입력 중...");

    await page.type("#input-Email", process.env.TEST_EMAIL);
    console.log("패스워드 입력 중...");

    await page.type("#input-PW", process.env.TEST_PASSWORD);
    console.log("페이지 스크롤 중...");

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page.evaluate(() => {
      const button = document.querySelector("button:not([disabled])");
      if (button) {
        button.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    console.log("로그인 버튼 대기 중...");

    await page.waitForSelector("button:not([disabled])", {
      visible: true,
      timeout: 10000,
    });

    console.log("로그인 버튼 활성화됨, 클릭 중...");

    await page.click("button:not([disabled])");
    console.log("버튼 클릭 완료");

    await page.waitForFunction(
      () => !window.location.href.includes("/onboarding"),
      { timeout: 10000 },
    );

    console.log("로그인 후 페이지 이동 완료");

    const authData = await page.evaluate(() => {
      const authStorage = localStorage.getItem("auth-storage");
      console.log("localStorage auth-storage:", authStorage);
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        return parsed.state?.accessToken;
      }
      return null;
    });

    const cookies = await page.cookies();

    console.log("로그인 완료, 토큰:", authData ? "있음" : "없음");
    console.log("쿠키 개수:", cookies.length);

    await browser.close();

    return { token: authData, cookies };
  } catch (error) {
    console.error("로그인 중 에러:", error);
    await browser.close();
    throw error;
  }
}

async function runLighthouseWithAuth(url) {
  const needsAuth = ["/popup-list", "/dashboard"];
  const requiresLogin = needsAuth.some(path => url.includes(path));

  let authData = null;

  if (requiresLogin) {
    console.log(`${url} - 인증 필요, 로그인 수행 중...`);
    authData = await loginAndGetAuth();
  } else {
    console.log(`${url} - 인증 불필요`);
  }

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    const browser = await puppeteer.connect({
      browserURL: `http://localhost:${chrome.port}`,
    });

    const page = await browser.newPage();

    if (authData) {
      if (authData.cookies && authData.cookies.length > 0) {
        await page.setCookie(...authData.cookies);
      }

      if (authData.token) {
        await page.evaluateOnNewDocument(token => {
          const authStorage = {
            state: {
              accessToken: token,
              isLogin: true,
            },
            version: 0,
          };
          localStorage.setItem("auth-storage", JSON.stringify(authStorage));
        }, authData.token);
      }
    }

    await page.close();
    await browser.disconnect();

    const result = await lighthouse(url, {
      port: chrome.port,
      output: "html",
    });

    return result;
  } finally {
    await chrome.kill();
  }
}

// CommonJS export
module.exports = async function (url) {
  return await runLighthouseWithAuth(url);
};

// 직접 실행시에만 main 함수 실행
if (require.main === module) {
  async function main() {
    try {
      console.log("인증된 Lighthouse 실행 시작");
      const result = await runLighthouseWithAuth(
        "http://localhost:4173/dashboard",
      );

      const htmlReport = Array.isArray(result.report)
        ? result.report[0]
        : result.report;
      fs.writeFileSync("./lighthouse-report.html", htmlReport);
      console.log("Lighthouse 실행 완료!");
    } catch (error) {
      console.error("Lighthouse 실행 실패:", error);
      process.exit(1);
    }
  }

  main();
}
