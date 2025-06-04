import NoticeItem from "@/components/noticeModal/views/NoticeItem";
import { useStockNotificationListApi } from "@/hooks/api/useStockNotificationListApi";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import { useEffect, useRef } from "react";

type Props = {
  onClose: () => void;
};

export default function NoticeModal({ onClose }: Props) {
  const popUpName = usePopUpReadStore.getState().name;
  const modalRef = useRef<HTMLDivElement>(null);
  const { notifications } = useNotificationStore(state => state);
  const { notifications: initialNotis } = useStockNotificationListApi();
  const setNotifications = useNotificationStore(
    state => state.setNotifications,
  );

  useEffect(() => {
    if (initialNotis && initialNotis.length > 0) {
      const mapped = initialNotis.map(item => ({
        id: String(item.notificationId),
        message: `${item.name}의 재고가 최소 수량(${item.minStock}) 이하입니다.`,
        read: false,
      }));

      setNotifications(mapped);
    }
  }, [initialNotis]);

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
      className={`pt-1 px-5 w-[360px] max-h-[544px] absolute top-[46px] right-[-18px] z-[130px] bg-white rounded-[20px] shadow-[0_0_10px_2px_rgba(0,0,0,0.15)] 
        ${notifications && notifications.length > 0 ? "overflow-y-auto" : "overflow-y-hidden"}`}
    >
      <div className="relative flex flex-col items-center">
        {notifications && notifications.length > 0 ? (
          notifications.map(item => (
            <NoticeItem
              key={item.notificationId}
              popularity={item.popularity}
              popUp={popUpName}
              name={item.name}
              minStock={item.minStock}
              notifiedAt={item.notifiedAt}
            />
          ))
        ) : (
          <p className="py-20 text-[18px] text-gray10 font-medium">
            <span className="text-main06">알림</span>이 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
