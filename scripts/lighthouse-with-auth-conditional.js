const fs = require("fs");

module.exports = async function (page, url) {
  // URL 추출
  let testUrl;
  if (typeof url === "string") {
    testUrl = url;
  } else if (url && url.url) {
    testUrl = url.url;
  } else {
    return;
  }

  console.log(`테스트 URL: ${testUrl}`);

  // 인증이 필요한 페이지인지 확인
  const needsAuth = ["/popup-list", "/dashboard"];
  const requiresLogin = needsAuth.some(path => testUrl.includes(path));

  if (!requiresLogin) {
    console.log(`${testUrl} - 인증 불필요`);
    return;
  }

  console.log(`${testUrl} - localStorage 토큰 설정 중...`);

  try {
    if (fs.existsSync("./auth-data.json")) {
      const authData = JSON.parse(fs.readFileSync("./auth-data.json", "utf8"));

      if (authData.token) {
        // 페이지 로드 전에 localStorage 설정
        await page.evaluateOnNewDocument(token => {
          localStorage.setItem(
            "auth-storage",
            JSON.stringify({
              state: {
                accessToken: token,
                isLogin: true,
              },
              version: 0,
            }),
          );
        }, authData.token);

        console.log("localStorage 토큰 설정 완료");
      }
    }
  } catch (error) {
    console.error("토큰 설정 오류:", error);
  }
};
