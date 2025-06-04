export type OrderListItemType = {
  orderItemId: number;
  itemName: string;
  recommendCount: number;
  realCount: number;
  lastRestockDate: string;
  status: OrderItemStatus;
};

export type OrderItemStatus = "CANCELLED" | "COMPLETED" | "PENDING";
