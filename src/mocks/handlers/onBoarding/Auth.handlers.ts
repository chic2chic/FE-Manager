import { LoginRequest } from "@/types/api/ApiRequestType";
import { LoginResponse } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

export const AuthHandlers = [
  http.post("/auth/login", async ({ request }) => {
    const requestBody = (await request.json()) as LoginRequest;
    const { username } = requestBody;

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
        } as LoginResponse,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];
