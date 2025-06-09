// scripts/generate-lighthouse-config.js
const fs = require("fs");
const path = require("path");

function generateLighthouseConfig() {
  try {
    console.log("Lighthouse 설정 생성 중...");

    // 저장된 토큰 읽기
    const authFilePath = path.join(__dirname, "auth-token.json");
    let accessToken = "";

    if (fs.existsSync(authFilePath)) {
      const authData = JSON.parse(fs.readFileSync(authFilePath, "utf8"));
      accessToken = authData.accessToken;
      console.log("저장된 토큰 로드 완료");
    } else {
      console.warn("토큰 파일이 없습니다. auth-setup.js를 먼저 실행하세요.");
    }

    // Lighthouse CI 설정
    const lighthouseConfig = {
      ci: {
        collect: {
          url: [
            "http://localhost:4173/popup-list",
            "http://localhost:4173/dashboard",
          ],
          settings: {
            chromeFlags: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--disable-dev-shm-usage",
              "--disable-web-security",
              "--disable-features=VizDisplayCompositor",
            ],
            // JWT 토큰을 Authorization 헤더로 설정
            extraHeaders: accessToken
              ? JSON.stringify({
                  Authorization: `Bearer ${accessToken}`,
                })
              : undefined,
            // 추가 설정
            preset: "desktop",
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
              requestLatencyMs: 0,
              downloadThroughputKbps: 0,
              uploadThroughputKbps: 0,
            },
          },
          numberOfRuns: 3,
        },
        assert: {
          assertions: {
            "categories:performance": ["warn", { minScore: 0.8 }],
            "categories:accessibility": ["error", { minScore: 0.8 }],
            "categories:best-practices": ["warn", { minScore: 0.8 }],
            "categories:seo": ["warn", { minScore: 0.8 }],
          },
        },
        upload: {
          target: "temporary-public-storage",
        },
      },
    };

    // 설정 파일 저장
    const configPath = path.join(process.cwd(), "lighthouserc.json");
    fs.writeFileSync(configPath, JSON.stringify(lighthouseConfig, null, 2));
    console.log(`Lighthouse 설정 저장 완료: ${configPath}`);

    return lighthouseConfig;
  } catch (error) {
    console.error("Lighthouse 설정 생성 실패:", error.message);
    throw error;
  }
}

// 직접 실행될 때
if (require.main === module) {
  generateLighthouseConfig();
  console.log("Lighthouse 설정 생성 완료!");
}

module.exports = { generateLighthouseConfig };
