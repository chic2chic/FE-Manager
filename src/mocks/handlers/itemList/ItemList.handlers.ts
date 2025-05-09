import TestImage from "@/assets/webps/onBoarding/test.png";
import { ItemListType } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

// 섹션별 아이템 데이터를 전역 객체로 관리
const itemsDatabase: ItemListType = {
  A: [
    {
      location: 1,
      itemId: "item1",
      name: "다용도 청소포",
      imageUrl: TestImage,
      price: 5000,
      stock: 120,
    },
    {
      location: 2,
      itemId: "life002",
      name: "친환경 세제",
      imageUrl: TestImage,
      price: 8900,
      stock: 85,
    },
    {
      location: 3,
      itemId: "life003",
      name: "대나무 빨대 세트",
      imageUrl: TestImage,
      price: 12000,
      stock: 64,
    },
    {
      location: 4,
      itemId: "life004",
      name: "다용도 수납함",
      imageUrl: TestImage,
      price: 15000,
      stock: 42,
    },
  ],
  B: [
    {
      location: 1,
      itemId: "tech001",
      name: "무선 충전기",
      imageUrl: TestImage,
      price: 29000,
      stock: 37,
    },
    {
      location: 2,
      itemId: "tech002",
      name: "블루투스 스피커",
      imageUrl: TestImage,
      price: 45000,
      stock: 25,
    },
    {
      location: 3,
      itemId: "tech003",
      name: "스마트 플러그",
      imageUrl: TestImage,
      price: 18500,
      stock: 58,
    },
    {
      location: 4,
      itemId: "tech004",
      name: "LED 스탠드",
      imageUrl: TestImage,
      price: 34000,
      stock: 19,
    },
  ],
  C: [
    {
      location: 1,
      itemId: "food001",
      name: "유기농 그래놀라",
      imageUrl: TestImage,
      price: 12500,
      stock: 75,
    },
    {
      location: 2,
      itemId: "food002",
      name: "과일 주스 세트",
      imageUrl: TestImage,
      price: 18000,
      stock: 42,
    },
    {
      location: 3,
      itemId: "food003",
      name: "건조 과일 믹스",
      imageUrl: TestImage,
      price: 9800,
      stock: 89,
    },
    {
      location: 4,
      itemId: "food004",
      name: "견과류 선물세트",
      imageUrl: TestImage,
      price: 25000,
      stock: 31,
    },
  ],
  D: [
    {
      location: 1,
      itemId: "cloth001",
      name: "면 티셔츠",
      imageUrl: TestImage,
      price: 15000,
      stock: 120,
    },
    {
      location: 2,
      itemId: "cloth002",
      name: "데님 자켓",
      imageUrl: TestImage,
      price: 59000,
      stock: 28,
    },
    {
      location: 3,
      itemId: "cloth003",
      name: "겨울 양말 세트",
      imageUrl: TestImage,
      price: 12000,
      stock: 95,
    },
    {
      location: 4,
      itemId: "cloth004",
      name: "캐시미어 목도리",
      imageUrl: TestImage,
      price: 38000,
      stock: 22,
    },
  ],
};

// 아이템 ID로 해당 아이템이 있는 섹션과 인덱스를 찾는 함수
function findItemByIdAndSection(itemId: string) {
  for (const [section, items] of Object.entries(itemsDatabase)) {
    const itemIndex = items.findIndex(item => item.itemId === itemId);
    if (itemIndex !== -1) {
      return { section, itemIndex };
    }
  }
  return { section: null, itemIndex: -1 };
}

export const ItemListHandlers = [
  // 아이템 목록 조회 API
  http.get("/popups/1/items", async () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: itemsDatabase, // 현재 데이터베이스 상태를 그대로 반환
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),

  // 아이템 삭제 API
  http.delete("/popups/1/items/:itemId", async ({ params }) => {
    const { itemId } = params;

    // 아이템 ID로 해당 섹션과 인덱스 찾기
    const { section, itemIndex } = findItemByIdAndSection(String(itemId));

    // 아이템이 존재하면 삭제
    if (section && itemIndex !== -1) {
      itemsDatabase[section].splice(itemIndex, 1);
      console.log(`아이템 "${itemId}" 삭제됨. (섹션: ${section})`);
    } else {
      console.log(`아이템 "${itemId}"을 찾을 수 없음.`);
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
