import { ItemCreateRequest } from "@/types/api/ApiRequestType";
import { http, HttpResponse } from "msw";

export const ItemCreateHandlers = [
  http.post("/items", async ({ request }) => {
    const requestBody = (await request.json()) as ItemCreateRequest;

    if (requestBody.name === "error") {
      return HttpResponse.json(
        {
          success: false,
          status: 401,
          data: {
            errorClassName: "AUTHENTICATION_FAILED",
            message: "생성 오류",
          },
          timestamp: new Date().toISOString(),
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        status: 201,
        data: {},
        timestamp: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),
];
