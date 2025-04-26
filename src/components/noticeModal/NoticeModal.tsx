import NoticeItem from "@/components/noticeModal/views/NoticeItem";
import { useEffect, useRef } from "react";

type Props = {
  onClose: () => void;
};

export default function NoticeModal({ onClose }: Props) {
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
        <NoticeItem
          type="hot"
          popup="BLACKPINK"
          title="팝업 포스터"
          stockThreshold={30}
          timestamp="25.04.23 13:47"
        />
      </div>
    </div>
  );
}
