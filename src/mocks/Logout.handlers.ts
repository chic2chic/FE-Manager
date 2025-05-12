import { http, HttpResponse } from "msw";

export const LogoutHandlers = [
  http.post("/managers/logout", async () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: null,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];
