import { GetOrderListResponse } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

const mockOrderItems = [
  {
    orderItemId: 1,
    itemName: "프리미엄 원두커피",
    recommendCount: 50,
    realCount: 45,
    lastRestockDate: "2025-06-03T14:30:00Z",
    status: "PENDING",
  },
  {
    orderItemId: 2,
    itemName: "유기농 우유",
    recommendCount: 100,
    realCount: 95,
    lastRestockDate: "2025-06-03T13:15:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 3,
    itemName: "신선한 샐러드",
    recommendCount: 30,
    realCount: 28,
    lastRestockDate: "2025-06-03T12:45:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 4,
    itemName: "프로틴 바",
    recommendCount: 80,
    realCount: 75,
    lastRestockDate: "2025-06-03T11:20:00Z",
    status: "PENDING",
  },
  {
    orderItemId: 5,
    itemName: "천연 주스",
    recommendCount: 60,
    realCount: 58,
    lastRestockDate: "2025-06-03T10:10:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 6,
    itemName: "글루텐프리 빵",
    recommendCount: 40,
    realCount: 35,
    lastRestockDate: "2025-06-03T09:30:00Z",
    status: "CANCELLED",
  },
  {
    orderItemId: 7,
    itemName: "아이스크림",
    recommendCount: 25,
    realCount: 20,
    lastRestockDate: "2025-06-03T08:45:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 8,
    itemName: "에너지 드링크",
    recommendCount: 90,
    realCount: 85,
    lastRestockDate: "2025-06-03T07:15:00Z",
    status: "PENDING",
  },
  {
    orderItemId: 9,
    itemName: "베이글",
    recommendCount: 35,
    realCount: 30,
    lastRestockDate: "2025-06-03T06:30:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 10,
    itemName: "그릭 요거트",
    recommendCount: 70,
    realCount: 70,
    lastRestockDate: "2025-06-03T05:45:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 11,
    itemName: "아보카도",
    recommendCount: 20,
    realCount: 18,
    lastRestockDate: "2025-06-02T23:30:00Z",
    status: "PENDING",
  },
  {
    orderItemId: 12,
    itemName: "스무디 믹스",
    recommendCount: 45,
    realCount: 40,
    lastRestockDate: "2025-06-02T22:15:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 13,
    itemName: "치아시드",
    recommendCount: 15,
    realCount: 15,
    lastRestockDate: "2025-06-02T21:00:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 14,
    itemName: "견과류 믹스",
    recommendCount: 55,
    realCount: 50,
    lastRestockDate: "2025-06-02T20:30:00Z",
    status: "PENDING",
  },
  {
    orderItemId: 15,
    itemName: "코코넛 워터",
    recommendCount: 80,
    realCount: 85,
    lastRestockDate: "2025-06-02T19:45:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 16,
    itemName: "퀴노아",
    recommendCount: 25,
    realCount: 22,
    lastRestockDate: "2025-06-02T18:20:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 17,
    itemName: "올리브오일",
    recommendCount: 12,
    realCount: 10,
    lastRestockDate: "2025-06-02T17:15:00Z",
    status: "CANCELLED",
  },
  {
    orderItemId: 18,
    itemName: "허브 티",
    recommendCount: 40,
    realCount: 38,
    lastRestockDate: "2025-06-02T16:30:00Z",
    status: "PENDING",
  },
  {
    orderItemId: 19,
    itemName: "다크 초콜릿",
    recommendCount: 60,
    realCount: 55,
    lastRestockDate: "2025-06-02T15:45:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 20,
    itemName: "현미",
    recommendCount: 95,
    realCount: 90,
    lastRestockDate: "2025-06-02T14:20:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 21,
    itemName: "두부",
    recommendCount: 30,
    realCount: 28,
    lastRestockDate: "2025-06-02T13:10:00Z",
    status: "PENDING",
  },
  {
    orderItemId: 22,
    itemName: "연어",
    recommendCount: 18,
    realCount: 15,
    lastRestockDate: "2025-06-02T12:30:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 23,
    itemName: "브로콜리",
    recommendCount: 45,
    realCount: 42,
    lastRestockDate: "2025-06-02T11:45:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 24,
    itemName: "레몬",
    recommendCount: 35,
    realCount: 30,
    lastRestockDate: "2025-06-02T10:20:00Z",
    status: "PENDING",
  },
  {
    orderItemId: 25,
    itemName: "생강",
    recommendCount: 10,
    realCount: 8,
    lastRestockDate: "2025-06-02T09:15:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 26,
    itemName: "마카다미아",
    recommendCount: 22,
    realCount: 20,
    lastRestockDate: "2025-06-02T08:30:00Z",
    status: "CANCELLED",
  },
  {
    orderItemId: 27,
    itemName: "코코아 파우더",
    recommendCount: 15,
    realCount: 15,
    lastRestockDate: "2025-06-02T07:45:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 28,
    itemName: "메이플 시럽",
    recommendCount: 28,
    realCount: 25,
    lastRestockDate: "2025-06-02T06:20:00Z",
    status: "PENDING",
  },
  {
    orderItemId: 29,
    itemName: "콤부차",
    recommendCount: 50,
    realCount: 48,
    lastRestockDate: "2025-06-02T05:10:00Z",
    status: "COMPLETED",
  },
  {
    orderItemId: 30,
    itemName: "캐슈넛",
    recommendCount: 40,
    realCount: 35,
    lastRestockDate: "2025-06-02T04:30:00Z",
    status: "COMPLETED",
  },
];

export const OrderListHandlers = [
  http.get("/order-items", async ({ request }) => {
    const url = new URL(request.url);
    const lastOrderItemId = url.searchParams.get("lastOrderItemId");
    const size = parseInt(url.searchParams.get("size") || "10");

    let startIndex = 0;
    if (lastOrderItemId) {
      const lastIndex = mockOrderItems.findIndex(
        item => item.orderItemId === Number(lastOrderItemId),
      );
      startIndex = lastIndex >= 0 ? lastIndex + 1 : 0;
    }

    const content = mockOrderItems.slice(startIndex, startIndex + size);
    const isLast = startIndex + size >= mockOrderItems.length;

    console.log(
      `Order List Request - lastOrderItemId: ${lastOrderItemId}, size: ${size}`,
    );
    console.log(`Returning ${content.length} items, isLast: ${isLast}`);

    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: {
          content,
          isLast,
        } as GetOrderListResponse,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),

  http.post("/order-items/status/:orderItemId", async ({ request, params }) => {
    const { orderItemId } = params;
    const requestBody = (await request.json()) as {
      qty: number;
      status: string;
    };

    console.log(`Status Change Request - orderItemId: ${orderItemId}`);
    console.log(`Request body:`, requestBody);

    const itemExists = mockOrderItems.find(
      item => item.orderItemId === Number(orderItemId),
    );

    if (!itemExists) {
      return HttpResponse.json(
        {
          success: false,
          status: 404,
          data: null,
          timestamp: new Date().toISOString(),
          error: "Order item not found",
        },
        { status: 404 },
      );
    }

    const validStatuses = ["COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(requestBody.status)) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          data: null,
          timestamp: new Date().toISOString(),
          error: "Invalid status value",
        },
        { status: 400 },
      );
    }

    const itemIndex = mockOrderItems.findIndex(
      item => item.orderItemId === Number(orderItemId),
    );

    if (itemIndex !== -1) {
      mockOrderItems[itemIndex].status = requestBody.status as any;
      mockOrderItems[itemIndex].realCount = requestBody.qty;
      console.log(
        `Updated item ${orderItemId} status to ${requestBody.status}`,
      );
    }

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
