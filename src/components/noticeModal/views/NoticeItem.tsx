import { GetStockNotificationResponse } from "@/types/api/ApiResponseType";
import { formatTimestamp } from "@/utils/FormatTimestamp";

// 알림: api 10분에 한번씩 요청하기

type Props = Omit<GetStockNotificationResponse, "notificationId"> & {
  popup: string;
};

export default function NoticeItem({
  popularity,
  popup,
  name,
  notifiedAt,
  minStock,
}: Props) {
  return (
    <div className="border-b border-b-gray03 w-full flex flex-col pt-3 pb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[6px]">
          <span
            lang="en"
            className="text-[18px] max-w-[150px] truncate tracking-[-2%]"
          >
            {popup}
          </span>
          {popularity === "hot" && (
            <div
              lang="en"
              className="bg-gradient-to-r from-[#FF458D] to-[#FF67A2] rounded-full px-2 py-1 flex justify-center items-center text-[12px] text-gray01"
            >
              HOT
            </div>
          )}
        </div>
        <span className="text-[14px] text-gray07">
          {formatTimestamp(notifiedAt)}
        </span>
      </div>

      <p className="text-[16px] tracking-[-2%] text-gray08 mt-[6px]">
        <span className="font-semibold text-gray10">{name}</span> 재고가
        <span className="font-semibold"> {minStock}개 미만</span>이에요!
      </p>
      {popularity === "hot" && (
        <p className="text-[14px] mt-[2px] text-main04">
          <strong>인기 상품</strong>이니 서둘러주세요
        </p>
      )}
    </div>
  );
}
