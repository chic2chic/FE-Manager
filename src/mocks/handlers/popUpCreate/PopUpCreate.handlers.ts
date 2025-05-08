import { GetPresignedUrlResponse } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

export const PopUpCreateHandlers = [
  http.post("/popups/upload-url", async () => {
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
];
