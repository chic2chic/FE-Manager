import { NoticeItemType } from "@/types/NoticeItemType";

export const NoticeItems: NoticeItemType[] = [
  {
    id: 1,
    type: "hot",
    popup: "BLACKPINK",
    title: "팝업 포스터",
    timestamp: "2025-04-26T03:13:00.000Z",
    stockThreshold: 30,
  },
  {
    id: 2,
    type: "normal",
    popup: "NEWJEANS",
    title: "한정판 굿즈",
    timestamp: "2025-04-27T05:30:00.000Z",
    stockThreshold: 10,
  },
];
