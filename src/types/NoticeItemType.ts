export type NoticeItemType = {
  id: number;
  type: "normal" | "hot";
  popup: string;
  title: string;
  timestamp: string;
  stockThreshold: number;
};
