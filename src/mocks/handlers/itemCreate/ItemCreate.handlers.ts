import {
  ItemCreateRequest,
  PatchItemRequest,
} from "@/types/api/ApiRequestType";
import { PatchItemResponse } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

export const ItemCreateHandlers = [
  http.post("/popups/:popupId/items", async ({ request }) => {
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
        status: 400,
        data: null,
        timestamp: new Date().toISOString(),
      },
      { status: 400 },
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

  http.patch("/popups/:popupId/items/:itemId", async ({ request }) => {
    const requestBody = (await request.json()) as PatchItemRequest;

    if (!requestBody.minStock) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: "request Type 확인하세요",
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
          itemId: "2",
          popupId: "1",
          name: "지수 포토카드",
          imageUrl: "https://bucket/1",
          price: 50000,
          stock: 500,
          minStock: 30,
          location: "a1",
        } as PatchItemResponse,
        timestamp: "2024-06-16T16:44:52.7230313",
      },
      { status: 200 },
    );
  }),
];
