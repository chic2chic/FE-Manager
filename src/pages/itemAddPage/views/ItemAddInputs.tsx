import CustomInput from "@/components/common/CustomInput";
import React from "react";

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
};

export default function ItemAddInputs({
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
}: Props) {
  return (
    <div className="flex flex-col gap-[30px]">
      <CustomInput
        value={name}
        title="상품명"
        placeholder="상품명을 입력해주세요"
        onChange={handleName}
      />
      <CustomInput
        value={price}
        isOnlyNumber={true}
        title="가격"
        placeholder="가격을 입력해주세요"
        onChange={handlePrice}
      />
      <CustomInput
        value={stock}
        isOnlyNumber={true}
        title="수량"
        placeholder="상품 수량을 입력해주세요"
        onChange={handleStock}
      />
      <CustomInput
        value={minStock}
        title="발주 기준 수량"
        placeholder="상품 발주 기준 수량을 입력해주세요"
        onChange={handleMinStock}
      />
      <CustomInput
        value={location}
        title="로케이션"
        placeholder="상품 로케이션을 입력해주세요"
        onChange={handleLocation}
      />
    </div>
  );
}
