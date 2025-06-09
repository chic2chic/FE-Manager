const fs = require("fs");

module.exports = async function (page, url) {
  // URL 추출
  let testUrl;
  if (typeof url === "string") {
    testUrl = url;
  } else if (url && url.url) {
    testUrl = url.url;
  } else {
    console.log("URL을 추출할 수 없습니다");
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

      // page 객체 메서드 확인
      console.log(
        "page 객체 메서드들:",
        Object.getOwnPropertyNames(page).filter(
          name => typeof page[name] === "function",
        ),
      );

      // 쿠키 설정 (다양한 방법 시도)
      if (authData.cookies && authData.cookies.length > 0) {
        try {
          if (typeof page.setCookie === "function") {
            await page.setCookie(...authData.cookies);
            console.log("setCookie로 쿠키 설정 완료");
          } else if (typeof page.setCookies === "function") {
            await page.setCookies(authData.cookies);
            console.log("setCookies로 쿠키 설정 완료");
          } else if (
            page.context &&
            typeof page.context.addCookies === "function"
          ) {
            await page.context.addCookies(authData.cookies);
            console.log("context.addCookies로 쿠키 설정 완료");
          } else {
            console.log("쿠키 설정 메서드를 찾을 수 없습니다");
          }
        } catch (cookieError) {
          console.log("쿠키 설정 실패:", cookieError.message);
        }
      }

      // localStorage에 토큰 설정
      if (authData.token) {
        try {
          if (typeof page.evaluateOnNewDocument === "function") {
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
            console.log("evaluateOnNewDocument로 토큰 설정 완료");
          } else if (typeof page.addInitScript === "function") {
            await page.addInitScript(token => {
              const authStorage = {
                state: {
                  accessToken: token,
                  isLogin: true,
                },
                version: 0,
              };
              localStorage.setItem("auth-storage", JSON.stringify(authStorage));
            }, authData.token);
            console.log("addInitScript로 토큰 설정 완료");
          } else if (typeof page.evaluate === "function") {
            await page.evaluate(token => {
              const authStorage = {
                state: {
                  accessToken: token,
                  isLogin: true,
                },
                version: 0,
              };
              localStorage.setItem("auth-storage", JSON.stringify(authStorage));
            }, authData.token);
            console.log("evaluate로 토큰 설정 완료");
          } else {
            console.log("토큰 설정 메서드를 찾을 수 없습니다");
          }
        } catch (tokenError) {
          console.log("토큰 설정 실패:", tokenError.message);
        }
      }
    } else {
      console.warn("인증 데이터 파일이 없습니다.");
    }
  } catch (error) {
    console.error("인증 설정 오류:", error);
  }
};
