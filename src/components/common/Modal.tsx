/**
 * @Description
 * 모달 공통 컴포넌트입니다
 * onCancel이 없으면 버튼이 한 개만 있는 alert 모달이고,
 * onCancel까지 있으면 버튼이 두 개 있는 confirm 모달이 됩니다.
 */

import { useEffect } from "react";
import popiLogo from "@/assets/webps/common/popi-logo.webp";
import xGray from "@/assets/webps/common/x-gray05.webp";

type Props = {
  isOpen: boolean;
  setIsOpen: (_open: boolean) => void;
  content: string;
  image: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export default function Modal({
  isOpen,
  setIsOpen,
  content,
  image,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: Props) {
  const handleClose = () => {
    if (onCancel) {
      onCancel(); // Confirm 모달일 경우 취소만
    } else {
      onConfirm(); // Alert 모달일 경우 확인 동작
    }
    setIsOpen(false);
  };

  // 모달 open일 때 바깥 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.body.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`; // scrollbar 너비만큼 패딩 설정하여 화면 흔들림 방지
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-110 flex items-center justify-center bg-gray10/50"
      onClick={handleClose}
    >
      <div
        className="relative bg-white w-[500px] h-[360px] rounded-[20px]"
        onClick={e => e.stopPropagation()}
      >
        {/* logo */}
        <img
          src={popiLogo}
          alt="logo"
          width={102}
          height={41}
          className="mt-9 mx-auto"
        />

        {/* x button */}
        <img
          src={xGray}
          alt="x button"
          width={16}
          height={16}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={handleClose}
        />

        {/* image */}
        <img
          src={image}
          alt="image"
          width={90}
          height={90}
          className="mx-auto mt-6"
        />

        {/* 내용 */}
        <p className="mt-2 text-[24px] text-center text-gray10">{content}</p>

        {/* 버튼 2개 */}
        <div className="justify-center absolute bottom-[46px] left-1/2 -translate-x-1/2 flex gap-[66px] w-full">
          {onCancel && (
            <button
              onClick={onCancel}
              className="rounded-full cursor-pointer px-5 py-[10px] text-[20px] border border-gray05 text-gray09 hover:bg-gray02 transition"
            >
              {cancelText || "취소"}
            </button>
          )}

          <button
            onClick={onConfirm}
            className="rounded-full cursor-pointer px-5 py-[10px] text-[20px] bg-main07 text-gray01 hover:opacity-90 transition"
          >
            {confirmText || "확인"}
          </button>
        </div>
      </div>
    </div>
  );
}
