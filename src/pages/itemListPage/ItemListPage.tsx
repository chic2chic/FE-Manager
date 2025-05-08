import { useEffect, useState } from "react";
import itemImage from "@/assets/webps/itemList/item-img.webp";
import { ItemType } from "@/types/ItemType";
import Modal from "@/components/common/Modal";
import { useNavigate } from "react-router-dom";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";

type Display = {
  name: string;
  items: ItemType[];
};

export default function ItemListPage() {
  const [displayList, setDisplayList] = useState<Display[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const navigate = useNavigate();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleOpenDeleteModal = (item: ItemType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handlerConfirm = () => {
    setIsModalOpen(false);
    setIsDeleteConfirmOpen(true);
  };

  useEffect(() => {
    fetch("/items")
      .then(res => res.json())
      .then(data => {
        console.log("items fetch data:", data);
        setDisplayList(data);
      })
      .catch(err => new Error(err));
  }, []);

  return (
    <div className="py-8">
      {/* 상단 버튼 */}
      <div className="flex justify-end gap-3 mb-10 px-10">
        <button className="cursor-pointer px-4 py-2 bg-gray01 border border-gray10 text-gray10 rounded-full text-[20px] font-semibold hover:bg-gray10 hover:text-gray01 transition-colors duration-300">
          전체 상품 등록
        </button>
        <button
          onClick={() => navigate("/items/create")}
          className="cursor-pointer px-4 py-2 bg-gray01 border border-gray10 text-gray10 rounded-full text-[20px] font-semibold hover:bg-gray10 hover:text-gray01 transition-colors duration-300"
        >
          상품 등록
        </button>
      </div>

      {/* 매대별 리스트 */}
      {displayList.map(display => (
        <div key={display.name} className="mb-12">
          {/* 매대명 + 구분선 */}
          <div className="flex items-center gap-4 mb-4 pl-[161px] pr-[180px]">
            <div className="w-15 h-15 flex items-center justify-center rounded-full bg-main01 text-gray10 text-[36px] font-semibold">
              {display.name}
            </div>

            <div className="flex-1 h-px bg-gray05" />
          </div>

          {/* 상품 카드 리스트 */}
          <div
            className="grid grid-cols-4 gap-6 gap-y-14 "
            style={{ paddingLeft: "272px", paddingRight: "180px" }}
          >
            {display.items.map(item => (
              <div key={item.id} className="flex flex-col items-center">
                {/* 상품 이미지 */}
                <img
                  src={itemImage}
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
        </div>
      ))}

      {/* 삭제 확인 모달 */}
      {selectedItem && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          content={`"${selectedItem.name} 상품을 삭제하시겠어요?`}
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
