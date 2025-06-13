import { useNavigate } from "react-router-dom";
import { useItemListApi } from "@/hooks/api/useItemListApi";
import ItemDisplay from "./views/list/ItemDisplay";
import ItemCreateExcelModal from "./views/excel/ItemCreateExcelModal";
import { useState } from "react";
import ConditionalComponent from "@/components/common/ConditionalComponent";
import EmptyState from "./views/@common/EmptyState";
import Button from "./views/@common/Button";
import { ItemType } from "@/types/ItemType";

const ItemListPage = () => {
  const { data } = useItemListApi();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const renderItemDisplays = (data: Record<string, ItemType[]>) =>
    Object.entries(data).map(([k, v]) => (
      <div key={k}>
        <ItemDisplay displayName={k.toUpperCase()} items={v} />
      </div>
    ));

  return (
    <div className="py-8 flex flex-col min-h-[calc(100vh-200px)]">
      <div className="flex justify-end gap-3 mb-10 px-10">
        <Button
          size="lg"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          전체 상품 등록
        </Button>
        <Button
          id="item-create-button"
          size="lg"
          variant="primary"
          onClick={() => navigate("/items/create")}
        >
          상품 등록
        </Button>
      </div>

      {isModalOpen && (
        <ItemCreateExcelModal closeModal={() => setIsModalOpen(false)} />
      )}

      <ConditionalComponent when={data} fallback={<EmptyState />}>
        {data => renderItemDisplays(data)}
      </ConditionalComponent>
    </div>
  );
};

export default ItemListPage;
