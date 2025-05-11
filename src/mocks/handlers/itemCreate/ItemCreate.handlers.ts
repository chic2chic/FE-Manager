import { ItemCreateRequest } from "@/types/api/ApiRequestType";
import { http, HttpResponse } from "msw";

export const ItemCreateHandlers = [
  http.post("/items", async ({ request }) => {
    const requestBody = (await request.json()) as ItemCreateRequest;
    const { popupId, name, imageUrl, price, stock, minStock, location } =
      requestBody;

    console.log("ItemCreateHandlers Request : ", requestBody);

    if (
      !popupId ||
      !name ||
      !imageUrl ||
      !price ||
      !stock ||
      !minStock ||
      !location
    ) {
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
        data: null,
        timestamp: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),

  http.post("/images/presigned-url", async () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: {
          presignedUrl: import.meta.env.VITE_TEST_PRESIGNED_URL as string,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),

  http.put(import.meta.env.VITE_TEST_PRESIGNED_URL as string, async () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
