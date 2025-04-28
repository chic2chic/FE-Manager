export type CongestionData = {
  time: number;
  value: number;
};

export type CongestionType = {
  [key: string]: CongestionData[];
};
