const fs = require("fs");

function generateLighthouseConfig() {
  let token = null;

  // auth-data.json에서 토큰 읽기
  try {
    if (fs.existsSync("./auth-data.json")) {
      const authData = JSON.parse(fs.readFileSync("./auth-data.json", "utf8"));
      token = authData.token;
      console.log("토큰 로드 완료:", token ? "있음" : "없음");
    } else {
      console.log("auth-data.json 파일이 없습니다");
    }
  } catch (error) {
    console.error("토큰 읽기 실패:", error);
  }

  // lighthouserc.json 생성 (기존 구조 유지)
  const config = {
    ci: {
      collect: {
        url: [
          "http://localhost:4173/onboarding",
          "http://localhost:4173/popup-list",
          "http://localhost:4173/dashboard",
        ],
        numberOfRuns: 3,
        settings: {
          formFactor: "desktop",
          screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          },
          throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
          },
        },
      },
      assert: {
        assertions: {
          "categories:performance": ["warn", { minScore: 0.8 }],
          "categories:accessibility": ["warn", { minScore: 0.85 }],
        },
      },
      upload: {
        target: "temporary-public-storage",
      },
    },
  };

  // 토큰이 있으면 extraHeaders 추가 (puppeteerScript 제거)
  if (token) {
    config.ci.collect.settings.extraHeaders = {
      Authorization: `Bearer ${token}`,
    };
    console.log("Authorization 헤더 추가됨");
  } else {
    // 토큰이 없으면 puppeteerScript 유지
    config.ci.collect.puppeteerScript = "scripts/lighthouse-with-auth.js";
    console.log("토큰이 없어서 puppeteerScript 유지");
  }

  // lighthouserc.json 파일로 저장
  fs.writeFileSync("./lighthouserc.json", JSON.stringify(config, null, 2));
  console.log("lighthouserc.json 생성 완료");
}

if (require.main === module) {
  generateLighthouseConfig();
}

module.exports = generateLighthouseConfig;
