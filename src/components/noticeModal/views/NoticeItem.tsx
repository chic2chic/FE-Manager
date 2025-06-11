import { GetStockNotificationResponse } from "@/types/api/ApiResponseType";
import { formatTimestamp } from "@/utils/FormatTimestamp";
import { useNavigate } from "react-router-dom";

type Props = Omit<GetStockNotificationResponse, "notificationId"> & {
  popUp: string;
  onClose?: () => void;
};

export default function NoticeItem({
  popularity,
  popUp,
  name,
  notifiedAt,
  minStock,
  onClose,
}: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    onClose?.();
    navigate("/order-list");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border-b border-b-gray03 w-full flex flex-col pt-3 pb-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[6px]">
          <span
            lang="en"
            className="text-[18px] max-w-[150px] truncate tracking-[-2%]"
          >
            {popUp}
          </span>
          {popularity?.toUpperCase() === "HOT" && (
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
      {popularity?.toUpperCase() === "HOT" && (
        <p className="text-[14px] mt-[2px] text-main04">
          <strong>인기 상품</strong>이니 서둘러주세요
        </p>
      )}
    </div>
  );
}
