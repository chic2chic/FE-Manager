import { useEffect, useState } from "react";
import itemImage from "@/assets/webps/itemList/item-img.webp";
import Modal from "@/components/common/Modal";
import { useNavigate } from "react-router-dom";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";
import { ItemListType, ItemType } from "@/types/api/ApiResponseType";

export default function ItemListPage() {
  const [itemList, setItemList] = useState<ItemListType>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const navigate = useNavigate();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const keys = Object.keys(itemList).values();

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
        setItemList(data);
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
      {Object.entries(itemList).map(([k, products]) => (
        <div key={k} className="mb-12">
          {products.map(item => (
            <div key={item.itemId}>{k}</div>
          ))}
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
