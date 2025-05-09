import TestImage from "@/assets/webps/onBoarding/test.png";
import { http, HttpResponse } from "msw";

export const ItemListHandlers = [
  http.get("/popups/1/items", async () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: {
          A: [
            {
              location: "1",
              itemId: "life001",
              name: "다용도 청소포",
              imageUrl: TestImage,
              price: 5000,
              stock: 120,
            },
            {
              location: "2",
              itemId: "life002",
              name: "친환경 세제",
              imageUrl: TestImage,
              price: 8900,
              stock: 85,
            },
            {
              location: "3",
              itemId: "life003",
              name: "대나무 빨대 세트",
              imageUrl: TestImage,
              price: 12000,
              stock: 64,
            },
            {
              location: "4",
              itemId: "life004",
              name: "다용도 수납함",
              imageUrl: TestImage,
              price: 15000,
              stock: 42,
            },
          ],
          B: [
            {
              location: "1",
              itemId: "tech001",
              name: "무선 충전기",
              imageUrl: TestImage,
              price: 29000,
              stock: 37,
            },
            {
              location: "2",
              itemId: "tech002",
              name: "블루투스 스피커",
              imageUrl: TestImage,
              price: 45000,
              stock: 25,
            },
            {
              location: "3",
              itemId: "tech003",
              name: "스마트 플러그",
              imageUrl: TestImage,
              price: 18500,
              stock: 58,
            },
            {
              location: "4",
              itemId: "tech004",
              name: "LED 스탠드",
              imageUrl: TestImage,
              price: 34000,
              stock: 19,
            },
          ],
          C: [
            {
              location: "1",
              itemId: "food001",
              name: "유기농 그래놀라",
              imageUrl: TestImage,
              price: 12500,
              stock: 75,
            },
            {
              location: "2",
              itemId: "food002",
              name: "과일 주스 세트",
              imageUrl: TestImage,
              price: 18000,
              stock: 42,
            },
            {
              location: "3",
              itemId: "food003",
              name: "건조 과일 믹스",
              imageUrl: TestImage,
              price: 9800,
              stock: 89,
            },
            {
              location: "4",
              itemId: "food004",
              name: "견과류 선물세트",
              imageUrl: TestImage,
              price: 25000,
              stock: 31,
            },
          ],
          D: [
            {
              location: "1",
              itemId: "cloth001",
              name: "면 티셔츠",
              imageUrl: TestImage,
              price: 15000,
              stock: 120,
            },
            {
              location: "2",
              itemId: "cloth002",
              name: "데님 자켓",
              imageUrl: TestImage,
              price: 59000,
              stock: 28,
            },
            {
              location: "3",
              itemId: "cloth003",
              name: "겨울 양말 세트",
              imageUrl: TestImage,
              price: 12000,
              stock: 95,
            },
            {
              location: "4",
              itemId: "cloth004",
              name: "캐시미어 목도리",
              imageUrl: TestImage,
              price: 38000,
              stock: 22,
            },
          ],
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];
