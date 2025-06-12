import React from "react";

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  minStock: number;
  stock: number;
  children?: React.ReactNode;
};

const ItemCard = ({
  imageUrl,
  name,
  price,
  minStock,
  stock,
  children,
}: Props) => {
  return (
    <div className="flex flex-col items-center">
      {/* 상품 이미지 */}
      <div className="relative w-[240px] h-[240px] mb-3 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* 상품명 */}
      <p className="font-bold text-[20px] mb-2 w-[280px] text-center break-keep">
        {name}
      </p>

      {/* 가격, 수량, 재고 */}
      <p className="text-[16px] text-gray08 mb-1">{price.toLocaleString()}원</p>
      <p className="text-[16px] text-gray08 mb-1">
        최소 발주 수량 : {minStock}
      </p>
      <p className="text-[16px] text-gray08 mb-2">남은재고 : {stock}</p>

      {/* 액션 버튼 */}
      {children}
    </div>
  );
};
export default ItemCard;
