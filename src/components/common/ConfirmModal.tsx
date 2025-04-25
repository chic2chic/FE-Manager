/**
 * @Description
 * 취소와 확인(삭제) 등 두 가지 버튼을 포함한 모달입니다
 * 팝업 리스트 페이지와 상품 조회 페이지에서 사용됩니다
 */

import popiLogo from "@/assets/webps/common/popi-logo.webp";
import xGray from "@/assets/webps/common/x-gray05.webp";

type Props = {
  isOpen: boolean;
  content: string;
  image: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  isOpen,
  content,
  image,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center bg-gray10/50">
      <div className="relative bg-white w-[500px] h-[360px] rounded-[20px]">
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
          onClick={onCancel}
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
        <div className="justify-center mt-9 flex gap-[66px]">
          <button
            onClick={onCancel}
            className="rounded-full cursor-pointer px-5 py-[10px] text-[20px] border border-gray05 text-gray09 hover:bg-gray02 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full cursor-pointer px-5 py-[10px] text-[20px] bg-main07 text-gray01 hover:opacity-90 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
