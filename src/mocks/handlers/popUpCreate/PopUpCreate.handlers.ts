import {
  GetPresignedUrlRequest,
  PopUpCreateRequest,
} from "@/types/api/ApiRequestType";
import { http, HttpResponse } from "msw";

export const PopUpCreateHandlers = [
  http.post("/popup", async ({ request }) => {
    const requestBody = (await request.json()) as PopUpCreateRequest;

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

  http.post("/popups/upload-url", async ({ request }) => {
    const { fileName, extension } =
      (await request.json()) as GetPresignedUrlRequest;

    const basePresignedUrl = import.meta.env.VITE_TEST_PRESIGNED_URL as string;
    const newPresignedUrl = basePresignedUrl.replace(
      /(amazonaws\.com\/)(.*?)(\?)/,
      `$1${fileName}.${extension}$3`,
    );

    return HttpResponse.json({
      success: true,
      status: 201,
      data: {
        preSignedUrl: newPresignedUrl,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  http.post("popups/upload-complete", async ({ request }) => {
    const { fileName, extension } =
      (await request.json()) as GetPresignedUrlRequest;

    if (!fileName || !extension) {
      return HttpResponse.json({
        success: false,
        status: 400,
        data: {},
        timeStamp: new Date().toISOString(),
      });
    }

    return HttpResponse.json({
      success: true,
      status: 200,
      data: {},
      timeStamp: new Date().toISOString(),
    });
  }),
];
