const fs = require("fs");

async function setupAuth() {
  try {
    console.log("API 로그인 시작");

    const response = await fetch("https://dev-api.ceo.popi.today/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "manager1",
        password: "password1",
      }),
    });

    if (!response.ok) {
      throw new Error(`로그인 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("로그인 응답:", data);

    // 응답 구조에 맞게 토큰 추출
    if (!data.success || !data.data || !data.data.accessToken) {
      console.log("전체 응답:", JSON.stringify(data, null, 2));
      throw new Error("로그인 실패 또는 토큰이 없습니다");
    }

    const token = data.data.accessToken;

    // Set-Cookie 헤더에서 쿠키 추출
    const cookies = [];
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      // 쿠키 파싱
      const cookieStrings = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];
      cookieStrings.forEach(cookieString => {
        const [nameValue] = cookieString.trim().split(";");
        const [name, value] = nameValue.split("=");
        if (name && value) {
          cookies.push({
            name: name.trim(),
            value: value.trim(),
            domain: "localhost",
            path: "/",
          });
        }
      });
    }

    const authInfo = {
      token: token,
      cookies: cookies,
      timestamp: new Date().toISOString(),
    };

    fs.writeFileSync("./auth-data.json", JSON.stringify(authInfo, null, 2));

    console.log("인증 정보 저장 완료");
    console.log("토큰:", token ? "있음" : "없음");
    console.log("토큰 길이:", token.length);
    console.log("쿠키 개수:", cookies.length);

    return authInfo;
  } catch (error) {
    console.error("API 로그인 실패:", error);
    throw error;
  }
}

if (require.main === module) {
  setupAuth().catch(console.error);
}

module.exports = setupAuth;
