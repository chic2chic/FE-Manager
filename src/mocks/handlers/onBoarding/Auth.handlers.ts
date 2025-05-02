import { http, HttpResponse } from "msw";

export const AuthHandlers = [
  http.post("/auth/login", async ({ request }) => {
    const requestBody = await request.json();
    const { username } = requestBody as { username: string };

    if (username === "error") {
      return HttpResponse.json(
        {
          success: false,
          status: 401,
          data: {
            errorClassName: "AUTHENTICATION_FAILED",
            message: "아이디 또는 비밀번호가 일치하지 않습니다.",
          },
          timestamp: new Date().toISOString(),
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: {
          accessToken:
            "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJwb3BpLW1hbmFnZXIiLCJzdWIiOiJ5b3Vuc2FuZzAxMjQiLCJhdXRob3JpdGllcyI6IlJPTEVfVVNFUiIsImlhdCI6MTc0NjE5MTIwMSwiZXhwIjoxNzQ2MTk4NDAxfQ.v8jv5jFspTFJ-Wilu3bLErf6HIS215AC6DfZ6FBj0mXlyp8f1JyRsvyaNflAiUvDwDTDPOWc-kTZS_noJOlSIQ",
          refreshToken:
            "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJwb3BpLW1hbmFnZXIiLCJzdWIiOiJ5b3Vuc2FuZzAxMjQiLCJpYXQiOjE3NDYxOTEyMDEsImV4cCI6MTc0NjM2NDAwMX0.YSZiH_1mHsZ2KpLGwhL2PvnBLnsuDftpX35LK7RV9NCLQHPpsQefMcBsHNEiS7UsZPDWQdMdSa4b8iL5Rxk3pQ",
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];
