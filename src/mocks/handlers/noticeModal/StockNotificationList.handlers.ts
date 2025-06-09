import { http, HttpResponse } from "msw";

export const stockNotificationList = [
  {
    notificationId: 8,
    popularity: "HOT",
    name: "스페셜 카드",
    notifiedAt: "2025-04-29T12:00:00.000Z",
    minStock: 25,
  },
  {
    notificationId: 7,
    popularity: "NORMAL",
    name: "콘서트 포토북",
    notifiedAt: "2025-04-28T10:15:00.000Z",
    minStock: 40,
  },
  {
    notificationId: 6,
    popularity: "HOT",
    name: "스페셜 키링",
    notifiedAt: "2025-04-27T08:45:00.000Z",
    minStock: 20,
  },
  {
    notificationId: 5,
    popularity: "NORMAL",
    name: "한정판 굿즈",
    notifiedAt: "2025-04-26T05:30:00.000Z",
    minStock: 10,
  },
  {
    notificationId: 4,
    popularity: "NORMAL",
    name: "한정판 굿즈",
    notifiedAt: "2025-04-25T05:30:00.000Z",
    minStock: 10,
  },
  {
    notificationId: 3,
    popularity: "HOT",
    name: "팝업 포스터 팝업 포스터 팝업 포스터 팝업 포스터 팝업 포스터 팝업 포스터",
    notifiedAt: "2025-04-24T03:13:00.000Z",
    minStock: 30,
  },
  {
    notificationId: 2,
    popularity: "HOT",
    name: "팝업 포스터",
    notifiedAt: "2025-04-23T03:13:00.000Z",
    minStock: 30,
  },
  {
    notificationId: 1,
    popularity: "NORMAL",
    name: "한정판 굿즈",
    notifiedAt: "2025-04-22T05:30:00.000Z",
    minStock: 10,
  },
];

export const StockNotificationListHandlers = [
  http.get("/popups/:popupId/notifications/stock", () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: stockNotificationList,
        notifiedAt: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];
