import { useNavigate } from "react-router-dom";
import ItemDisplay from "./views/ItemDisplay";
import { useItemListApi } from "@/hooks/api/useItemListApi";
import ItemCreateExcelModal from "./views/ItemCreateExcelModal";
import { useState } from "react";

export default function ItemListPage() {
  const { data } = useItemListApi();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="py-8">
      <div className="flex justify-end gap-3 mb-10 px-10">
        <button
          className="cursor-pointer px-4 py-2 bg-gray01 border border-gray10 text-gray10 rounded-full text-[20px] font-semibold hover:bg-gray10 hover:text-gray01 transition-colors duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          전체 상품 등록
        </button>
        <button
          onClick={() => navigate("/items/create")}
          className="cursor-pointer px-4 py-2 bg-gray01 border border-gray10 text-gray10 rounded-full text-[20px] font-semibold hover:bg-gray10 hover:text-gray01 transition-colors duration-300"
        >
          상품 등록
        </button>
      </div>
      {isModalOpen && (
        <ItemCreateExcelModal closeModal={() => setIsModalOpen(false)} />
      )}

      {data &&
        Object.entries(data).map(([k, v]) => (
          <div key={k}>
            <ItemDisplay displayName={k} items={v} />
          </div>
        ))}
    </div>
  );
}
