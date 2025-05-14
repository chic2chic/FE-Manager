import { http, HttpResponse } from "msw";
import TestImage from "@/assets/webps/onBoarding/test.png";
import { GetBestItemsResponse } from "@/types/api/ApiResponseType";

export const BestItems = [
  {
    itemId: 1,
    title: "BLACKPINK IN YOUR AREA - THE POP-UP",
    imagePath: TestImage,
    price: 20000,
    stock: 24,
  },
  {
    itemId: 2,
    title: "BIGBANG IS BACK: LIMITED SHOWCASE",
    imagePath: TestImage,
    price: 18000,
    stock: 12,
  },
  {
    itemId: 3,
    title: "NEWJEANS BUNNYLAND EXPERIENCE",
    imagePath: TestImage,
    price: 22000,
    stock: 30,
  },
];

export const BestItemsHandlers = [
  http.get("/popups/:popupId/items/trending", ({ request }) => {
    const url = new URL(request.url);
    const gender = url.searchParams.get("gender");
    const age = url.searchParams.get("age");

    console.log(`MSW 인터셉트: gender=${gender}, age=${age}`);

    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: BestItems as GetBestItemsResponse,
        // data: [],
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];
