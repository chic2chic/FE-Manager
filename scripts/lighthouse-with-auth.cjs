const fs = require("fs");

module.exports = async function (page, url) {
  // URL 파라미터 디버깅
  console.log("받은 파라미터들:");
  console.log("- page:", typeof page);
  console.log("- url:", url);
  console.log("- url 타입:", typeof url);

  // URL 추출 시도
  let testUrl;
  if (typeof url === "string") {
    testUrl = url;
  } else if (url && typeof url === "object") {
    testUrl = url.href || url.url || url.toString();
  } else if (typeof page === "string") {
    // 파라미터 순서가 바뀐 경우
    testUrl = page;
    page = url;
  } else {
    console.log("URL을 추출할 수 없습니다. arguments:", Array.from(arguments));
    return;
  }

  console.log(`테스트 URL: ${testUrl}`);

  const needsAuth = ["/popup-list", "/dashboard"];
  const requiresLogin = needsAuth.some(path => testUrl.includes(path));

  if (!requiresLogin) {
    console.log(`${testUrl} - 인증 불필요`);
    return;
  }

  console.log(`${testUrl} - 인증 필요, 토큰 설정 중...`);

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
