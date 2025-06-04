import { GetOrderListResponse } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

const mockOrderItems = [
  {
    orderId: "ORD-2025-001",
    itemName: "프리미엄 원두커피",
    recommendQuantity: 50,
    realQuantity: 45,
    lastUpdated: "2025-06-03T14:30:00Z",
    state: "PENDING",
  },
  {
    orderId: "ORD-2025-002",
    itemName: "유기농 우유",
    recommendQuantity: 100,
    realQuantity: 95,
    lastUpdated: "2025-06-03T13:15:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-003",
    itemName: "신선한 샐러드",
    recommendQuantity: 30,
    realQuantity: 28,
    lastUpdated: "2025-06-03T12:45:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-004",
    itemName: "프로틴 바",
    recommendQuantity: 80,
    realQuantity: 75,
    lastUpdated: "2025-06-03T11:20:00Z",
    state: "PENDING",
  },
  {
    orderId: "ORD-2025-005",
    itemName: "천연 주스",
    recommendQuantity: 60,
    realQuantity: 58,
    lastUpdated: "2025-06-03T10:10:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-006",
    itemName: "글루텐프리 빵",
    recommendQuantity: 40,
    realQuantity: 35,
    lastUpdated: "2025-06-03T09:30:00Z",
    state: "CANCELLED",
  },
  {
    orderId: "ORD-2025-007",
    itemName: "아이스크림",
    recommendQuantity: 25,
    realQuantity: 20,
    lastUpdated: "2025-06-03T08:45:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-008",
    itemName: "에너지 드링크",
    recommendQuantity: 90,
    realQuantity: 85,
    lastUpdated: "2025-06-03T07:15:00Z",
    state: "PENDING",
  },
  {
    orderId: "ORD-2025-009",
    itemName: "베이글",
    recommendQuantity: 35,
    realQuantity: 30,
    lastUpdated: "2025-06-03T06:30:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-010",
    itemName: "그릭 요거트",
    recommendQuantity: 70,
    realQuantity: 70,
    lastUpdated: "2025-06-03T05:45:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-011",
    itemName: "아보카도",
    recommendQuantity: 20,
    realQuantity: 18,
    lastUpdated: "2025-06-02T23:30:00Z",
    state: "PENDING",
  },
  {
    orderId: "ORD-2025-012",
    itemName: "스무디 믹스",
    recommendQuantity: 45,
    realQuantity: 40,
    lastUpdated: "2025-06-02T22:15:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-013",
    itemName: "치아시드",
    recommendQuantity: 15,
    realQuantity: 15,
    lastUpdated: "2025-06-02T21:00:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-014",
    itemName: "견과류 믹스",
    recommendQuantity: 55,
    realQuantity: 50,
    lastUpdated: "2025-06-02T20:30:00Z",
    state: "PENDING",
  },
  {
    orderId: "ORD-2025-015",
    itemName: "코코넛 워터",
    recommendQuantity: 80,
    realQuantity: 85,
    lastUpdated: "2025-06-02T19:45:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-016",
    itemName: "퀴노아",
    recommendQuantity: 25,
    realQuantity: 22,
    lastUpdated: "2025-06-02T18:20:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-017",
    itemName: "올리브오일",
    recommendQuantity: 12,
    realQuantity: 10,
    lastUpdated: "2025-06-02T17:15:00Z",
    state: "CANCELLED",
  },
  {
    orderId: "ORD-2025-018",
    itemName: "허브 티",
    recommendQuantity: 40,
    realQuantity: 38,
    lastUpdated: "2025-06-02T16:30:00Z",
    state: "PENDING",
  },
  {
    orderId: "ORD-2025-019",
    itemName: "다크 초콜릿",
    recommendQuantity: 60,
    realQuantity: 55,
    lastUpdated: "2025-06-02T15:45:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-020",
    itemName: "현미",
    recommendQuantity: 95,
    realQuantity: 90,
    lastUpdated: "2025-06-02T14:20:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-021",
    itemName: "두부",
    recommendQuantity: 30,
    realQuantity: 28,
    lastUpdated: "2025-06-02T13:10:00Z",
    state: "PENDING",
  },
  {
    orderId: "ORD-2025-022",
    itemName: "연어",
    recommendQuantity: 18,
    realQuantity: 15,
    lastUpdated: "2025-06-02T12:30:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-023",
    itemName: "브로콜리",
    recommendQuantity: 45,
    realQuantity: 42,
    lastUpdated: "2025-06-02T11:45:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-024",
    itemName: "레몬",
    recommendQuantity: 35,
    realQuantity: 30,
    lastUpdated: "2025-06-02T10:20:00Z",
    state: "PENDING",
  },
  {
    orderId: "ORD-2025-025",
    itemName: "생강",
    recommendQuantity: 10,
    realQuantity: 8,
    lastUpdated: "2025-06-02T09:15:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-026",
    itemName: "마카다미아",
    recommendQuantity: 22,
    realQuantity: 20,
    lastUpdated: "2025-06-02T08:30:00Z",
    state: "CANCELLED",
  },
  {
    orderId: "ORD-2025-027",
    itemName: "코코아 파우더",
    recommendQuantity: 15,
    realQuantity: 15,
    lastUpdated: "2025-06-02T07:45:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-028",
    itemName: "메이플 시럽",
    recommendQuantity: 28,
    realQuantity: 25,
    lastUpdated: "2025-06-02T06:20:00Z",
    state: "PENDING",
  },
  {
    orderId: "ORD-2025-029",
    itemName: "콤부차",
    recommendQuantity: 50,
    realQuantity: 48,
    lastUpdated: "2025-06-02T05:10:00Z",
    state: "CONFIRMED",
  },
  {
    orderId: "ORD-2025-030",
    itemName: "캐슈넛",
    recommendQuantity: 40,
    realQuantity: 35,
    lastUpdated: "2025-06-02T04:30:00Z",
    state: "CONFIRMED",
  },
];

export const OrderListHandlers = [
  http.get("/orderItems", async ({ request }) => {
    const url = new URL(request.url);
    const lastId = url.searchParams.get("lastId");
    const size = parseInt(url.searchParams.get("size") || "10");

    let startIndex = 0;
    if (lastId) {
      const lastIndex = mockOrderItems.findIndex(
        item => item.orderId === lastId,
      );
      startIndex = lastIndex >= 0 ? lastIndex + 1 : 0;
    }

    const content = mockOrderItems.slice(startIndex, startIndex + size);
    const isLast = startIndex + size >= mockOrderItems.length;

    console.log(`Order List Request - lastId: ${lastId}, size: ${size}`);
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
];
