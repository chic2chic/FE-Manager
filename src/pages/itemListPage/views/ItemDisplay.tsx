import Modal from "@/components/common/Modal";
import { ItemType } from "@/types/ItemType";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";
import { useState } from "react";

type Props = {
  displayName: string;
  items: ItemType[];
};

export default function ItemDisplay({ displayName, items }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleOpenDeleteModal = (item: ItemType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handlerConfirm = () => {
    setIsModalOpen(false);
    setIsDeleteConfirmOpen(true);
  };

  return (
    <div key={displayName} className="mb-12">
      <div className="flex items-center gap-4 mb-4 pl-[161px] pr-[180px]">
        <div className="w-15 h-15 flex items-center justify-center rounded-full bg-main01 text-gray10 text-[36px] font-semibold">
          {displayName}
        </div>
        <div className="flex-1 h-px bg-gray05" />
      </div>

      {/* 상품 카드 리스트 */}
      <div
        className="grid grid-cols-4 gap-6 gap-y-14 "
        style={{ paddingLeft: "272px", paddingRight: "180px" }}
      >
        {items.map(item => (
          <div key={item.itemId} className="flex flex-col items-center">
            {/* 상품 이미지 */}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-53 h-53 object-cover mb-3"
            />

            {/* 상품명 + 버튼 */}
            <p className="font-bold text-[20px] mb-1">{item.name}</p>
            <p className="text-[16px] text-gray08 mb-1">
              {item.price.toLocaleString()}원
            </p>
            <p className="text-[16px] text-gray08 mb-2">
              남은재고 : {item.stock}
            </p>
            <div className="flex gap-2">
              <div className="flex justify-center gap-4 mt-2">
                <button className="text-[18px] px-4 py-1 cursor-pointer bg-gray10 text-gray01 rounded-full hover:opacity-90">
                  수정
                </button>
                <button
                  className="text-[18px] px-4 py-1 cursor-pointer border border-gray10 rounded-full hover:bg-gray10 hover:text-gray01 transition-colors duration-300"
                  onClick={() => handleOpenDeleteModal(item)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 삭제 확인 모달 */}
      {selectedItem && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          content={`${selectedItem.name} 상품을 삭제하시겠어요?`}
          image={bin}
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handlerConfirm}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {/* 삭제 완료 모달 */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        setIsOpen={setIsDeleteConfirmOpen}
        content="상품이 삭제되었습니다."
        image={check}
        confirmText="확인"
        onConfirm={() => setIsDeleteConfirmOpen(false)}
      />
    </div>
  );
}
