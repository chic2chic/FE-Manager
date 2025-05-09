import { http, HttpResponse } from "msw";
import TestImage from "@/assets/webps/popUpList/pop-up-poster-01.webp";

export const popUpList = [
  {
    popupId: 1,
    name: "BLACKPINK IN YOUR AREA - THE POP-UP",
    imageUrl: TestImage,
  },
  {
    popupId: 2,
    name: "BIGBANG IS BACK: LIMITED SHOWCASE",
    imageUrl: TestImage,
  },
  {
    popupId: 3,
    name: "NEWJEANS BUNNYLAND EXPERIENCE",
    imageUrl: TestImage,
  },
  {
    popupId: 4,
    name: "BTS UNIVERSE POP-UP: MIC DROP EDITION",
    imageUrl: TestImage,
  },
  {
    popupId: 5,
    name: "SEVENTEEN WORLD: A MOMENT IN TIME",
    imageUrl: TestImage,
  },
  {
    popupId: 6,
    name: "STRAY KpopupIdS ZONE - MANIAC ROOM",
    imageUrl: TestImage,
  },
  {
    popupId: 7,
    name: "ENHYPEN DARK MOON POP-UP",
    imageUrl: TestImage,
  },
  {
    popupId: 8,
    name: "IVE THE REALITY: STARSHIP STAGE",
    imageUrl: TestImage,
  },
  {
    popupId: 9,
    name: "LE SSERAFIM ANTIFRAGILE STUDIO",
    imageUrl: TestImage,
  },
];

export const popUpListReadHandlers = [
  http.get("/popups", () => {
    return HttpResponse.json({
      success: true,
      status: 200,
      data: popUpList,
      timestamp: new Date().toISOString(),
    });
  }),
];
