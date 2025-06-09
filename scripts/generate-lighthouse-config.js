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

  // 인증이 필요한 페이지와 불필요한 페이지 분리
  const publicUrls = ["http://localhost:4173/onboarding"];
  const authUrls = [
    "http://localhost:4173/popup-list",
    "http://localhost:4173/dashboard",
  ];

  // 공개 페이지 설정 (인증 없이)
  const publicConfig = {
    ci: {
      collect: {
        url: publicUrls,
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

  // 인증 페이지 설정
  const authConfig = {
    ci: {
      collect: {
        url: authUrls,
        numberOfRuns: 3,
        puppeteerScript: "scripts/lighthouse-with-auth-simple.js",
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

  // 토큰이 있으면 인증 페이지에 Authorization 헤더도 추가
  if (token) {
    authConfig.ci.collect.settings.extraHeaders = {
      Authorization: `Bearer ${token}`,
    };
    console.log("인증 페이지에 Authorization 헤더 추가됨");
  }

  // 통합 설정 (모든 URL 포함)
  const combinedConfig = {
    ci: {
      collect: {
        url: [...publicUrls, ...authUrls],
        numberOfRuns: 3,
        puppeteerScript: "scripts/lighthouse-with-auth-conditional.js",
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

  if (token) {
    combinedConfig.ci.collect.settings.extraHeaders = {
      Authorization: `Bearer ${token}`,
    };
  }

  // lighthouserc.json 파일로 저장 (통합 설정 사용)
  fs.writeFileSync(
    "./lighthouserc.json",
    JSON.stringify(combinedConfig, null, 2),
  );
  console.log("lighthouserc.json 생성 완료 (조건부 puppeteer 스크립트)");
}

if (require.main === module) {
  generateLighthouseConfig();
}

module.exports = generateLighthouseConfig;
