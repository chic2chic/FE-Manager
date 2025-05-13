import {
  GetPresignedUrlRequest,
  PopUpWithChoicesRequest,
} from "@/types/api/ApiRequestType";
import {
  GetPresignedUrlResponse,
  PostPopUpCreateResponse,
} from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

export const PopUpCreateHandlers = [
  http.post("/popups/upload-url", async ({ request }) => {
    const { imageFileExtension, imageDirectory } =
      (await request.json()) as GetPresignedUrlRequest;
    if (!imageFileExtension || !imageDirectory) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: {
          presignedUrl: import.meta.env.VITE_TEST_PRESIGNED_URL,
        } as GetPresignedUrlResponse,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),

  http.put(import.meta.env.VITE_TEST_PRESIGNED_URL, async () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  http.post("/popups", async ({ request }) => {
    const requestBody = (await request.json()) as PopUpWithChoicesRequest;
    const isError = requestBody.popupCreateRequest.name === "error";

    console.log("popup 생성시 Request : ", requestBody);

    if (isError) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        status: 201,
        data: {
          popupId: "5",
        } as PostPopUpCreateResponse,
        timestamp: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),
];
