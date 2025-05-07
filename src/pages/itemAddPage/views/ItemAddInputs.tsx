import CustomInput from "@/components/common/CustomInput";
import React from "react";

type Props = {
  title: string;
  quantity: number;
  price: number;
  location: string;
  handleTitle: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleQuantity: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePrice: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocation: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ItemAddInputs({
  title,
  quantity,
  price,
  location,
  handleTitle,
  handleQuantity,
  handlePrice,
  handleLocation,
}: Props) {
  return (
    <div className="flex flex-col gap-[30px]">
      <CustomInput
        value={title}
        title="상품명"
        placeholder="상품명을 입력해주세요"
        onChange={handleTitle}
      />
      <CustomInput
        value={price}
        isOnlyNumber={true}
        title="가격"
        placeholder="가격을 입력해주세요"
        onChange={handlePrice}
      />
      <CustomInput
        value={quantity}
        isOnlyNumber={true}
        title="수량"
        placeholder="상품 수량을 입력해주세요"
        onChange={handleQuantity}
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
