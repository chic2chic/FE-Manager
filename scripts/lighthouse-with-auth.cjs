const fs = require("fs");

module.exports = async function ({ page, url }) {
  console.log(`테스트 URL: ${url}`);

  const needsAuth = ["/popup-list", "/dashboard"];
  const requiresLogin = needsAuth.some(path => url.includes(path));

  if (!requiresLogin) {
    console.log(`${url} - 인증 불필요`);
    return;
  }

  console.log(`${url} - 인증 필요, 토큰 설정 중...`);

  try {
    if (fs.existsSync("./auth-data.json")) {
      const authData = JSON.parse(fs.readFileSync("./auth-data.json", "utf8"));

      // 쿠키 설정
      if (authData.cookies && authData.cookies.length > 0) {
        await page.setCookie(...authData.cookies);
        console.log("쿠키 설정 완료");
      }

      // localStorage에 토큰 설정
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
        console.log("토큰 설정 완료");
      }
    } else {
      console.warn(
        "인증 데이터 파일이 없습니다. auth-setup.js를 먼저 실행하세요.",
      );
    }
  } catch (error) {
    console.error("인증 설정 오류:", error);
  }
};
