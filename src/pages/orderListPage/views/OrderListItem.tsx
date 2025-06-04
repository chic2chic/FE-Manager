import { OrderListItemType } from "@/types/OrderListPageType";
import { PendingActionType } from "../OrderListPage";
import { useState } from "react";

type Props = {
  item: OrderListItemType;
  idx: number;
  changePendingAction: (_request: PendingActionType) => void;
};

export default function OrderListItem({
  item,
  idx,
  changePendingAction,
}: Props) {
  const [realCount, setRealCount] = useState<string>("");

  const getStateText = (item: OrderListItemType) => {
    switch (item.status) {
      case "PENDING":
        return (
          <div className="flex w-full justify-center gap-2">
            <button
              className="cursor-pointer px-4 py-2 border rounded-full bg-gray10 text-gray01 hover:bg-gray08"
              onClick={() =>
                changePendingAction({
                  item: { ...item, realCount: Number(realCount) },
                  status: "COMPLETED",
                })
              }
            >
              승인
            </button>
            <button
              className="cursor-pointer px-4 py-2 border rounded-full hover:bg-gray03"
              onClick={() =>
                changePendingAction({
                  item: { ...item, realCount: Number(realCount) },
                  status: "CANCELLED",
                })
              }
            >
              취소
            </button>
          </div>
        );
      case "COMPLETED":
        return <span>완료</span>;
      case "CANCELLED":
        return <span>취소</span>;
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <tr className="hover:bg-gray02 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray10">
        {idx + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-lg font-medium text-gray10">{item.itemName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="text-lg font-semibold text-gray10">
          {item.recommendCount}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        {item.status !== "PENDING" ? (
          <div>
            <span className="text-lg font-semibold text-gray10 w-20 px-2 py-1 ">
              {item.realCount}
            </span>
          </div>
        ) : (
          <input
            className="text-lg font-medium text-gray10 w-20 px-2 py-1 border border-gray07 rounded bg-gray01 text-center placeholder:text-gray07"
            placeholder={String(item.realCount)}
            value={realCount}
            onChange={e => setRealCount(e.target.value)}
          />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-lg text-gray09">
        {formatDate(item.lastRestockDate)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        {getStateText(item)}
      </td>
    </tr>
  );
}
