import CustomInput from "@/components/common/CustomInput";
import { useSelectedItemStore } from "@/stores/useSelectedItemStore";
import React from "react";
import NoImageComp from "@/components/common/NoImageComp";

type Props = {
  name: string;
  price: number;
  stock: number;
  minStock: number;
  location: string;
  handleName: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePrice: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStock: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMinStock: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocation: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  imageFile: File | null;
  handleImageFile: (_file: File) => void;
  isPatchMode: boolean;
};

export default function ItemCreateInputs({
  name,
  price,
  stock,
  minStock,
  location,
  handleName,
  handlePrice,
  handleStock,
  handleMinStock,
  handleLocation,
  imageFile,
  handleImageFile,
  isPatchMode,
}: Props) {
  const { selectedItem, updateField } = useSelectedItemStore();

  const handlePatchMinStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField("minStock", Number(e.target.value));
  };

  return (
    <div className="absolute left-[50%] mt-[40px] transform -translate-x-1/2 flex justify-center items-center gap-[53px]">
      <div className="relative w-[400px] h-[400px]">
        {/* 이미지 */}
        {imageFile || (isPatchMode && selectedItem?.imageUrl) ? (
          <img
            src={
              isPatchMode && selectedItem?.imageUrl
                ? selectedItem.imageUrl
                : imageFile
                  ? URL.createObjectURL(imageFile)
                  : ""
            }
            alt="상품 이미지"
            width={400}
            className="w-full h-full object-cover rounded-[20px]"
          />
        ) : (
          <NoImageComp width={400} height={400} />
        )}

        {!isPatchMode && (
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleImageFile(file);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        )}
        {isPatchMode && (
          <div className="absolute inset-0 rounded-[20px] bg-gray10/30 flex items-center justify-center" />
        )}
      </div>
      <div className="flex flex-col gap-[30px]">
        <CustomInput
          value={isPatchMode && selectedItem ? selectedItem.name : name}
          title="상품명"
          placeholder="상품명을 입력해주세요"
          onChange={handleName}
          isPatchMode={isPatchMode}
        />
        <CustomInput
          value={isPatchMode && selectedItem ? selectedItem.price : price}
          isOnlyNumber={true}
          title="가격"
          placeholder="가격을 입력해주세요"
          onChange={handlePrice}
          isPatchMode={isPatchMode}
        />
        <CustomInput
          value={isPatchMode && selectedItem ? selectedItem.stock : stock}
          isOnlyNumber={true}
          title="수량"
          placeholder="상품 수량을 입력해주세요"
          onChange={handleStock}
          isPatchMode={isPatchMode}
        />
        <CustomInput
          value={isPatchMode && selectedItem ? selectedItem.minStock : minStock}
          title="발주 기준 수량"
          placeholder="상품 발주 기준 수량을 입력해주세요"
          onChange={isPatchMode ? handlePatchMinStock : handleMinStock}
          maxValue={isPatchMode && selectedItem ? selectedItem.stock : stock}
        />
        <CustomInput
          value={isPatchMode && selectedItem ? selectedItem.location : location}
          title="로케이션"
          placeholder="상품 로케이션을 입력해주세요"
          onChange={handleLocation}
          isPatchMode={isPatchMode}
        />
      </div>
    </div>
  );
}
