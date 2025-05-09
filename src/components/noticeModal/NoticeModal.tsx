import NoticeItem from "@/components/noticeModal/views/NoticeItem";
import { useStockNotificationListApi } from "@/hooks/api/useStockNotificationListApi";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import { useEffect, useRef } from "react";

type Props = {
  onClose: () => void;
};

export default function NoticeModal({ onClose }: Props) {
  const { notifications } = useStockNotificationListApi();
  const popupName = usePopUpReadStore.getState().name;
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="pt-1 px-5 w-[360px] max-h-[544px] absolute overflow-scroll top-[46px] right-[-18px] z-[130px] bg-white rounded-[20px] shadow-[0_0_10px_2px_rgba(0,0,0,0.15)]"
    >
      <div className="relative flex flex-col items-center">
        {notifications && notifications.length > 0 ? (
          notifications.map(item => (
            <NoticeItem
              key={item.notificationId}
              popularity={item.popularity}
              popup={popupName}
              name={item.name}
              minStock={item.minStock}
              notifiedAt={item.notifiedAt}
            />
          ))
        ) : (
          <>알림이 없습니다</>
        )}
      </div>
    </div>
  );
}
