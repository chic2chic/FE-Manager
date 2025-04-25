import CustomButton from "@/components/common/CustomButton";
import React, { useState } from "react";
import ItemAddInputs from "./views/ItemAddInputs";
import TestImage from "@/assets/webps/onBoarding/test.png";

export default function ItemAddPage() {
  const [itemTitle, setItemTitle] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemLocation, setItemLocation] = useState<string>("");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.target.value);
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(Number(e.target.value));
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemPrice(Number(e.target.value));
  };

  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemLocation(e.target.value);
  };

  const handleSave = () => {
    return itemTitle && itemQuantity && itemPrice && itemLocation;
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-[14px] mt-[46px] mr-[80px] justify-end">
        <CustomButton
          label="취소"
          cssOption="bg-gray03 text-gray08 text-[20px] w-[76px] h-[46px] hover:opacity-50"
          onClick={handleSave}
        />
        <CustomButton
          label="등록"
          cssOption="bg-gray10 text-gray01 text-[20px] w-[76px] h-[46px] hover:opacity-50"
          onClick={handleSave}
        />
      </div>
      <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center gap-[53px]">
        <div className="relative w-[400px] h-[400px]">
          <img
            src={TestImage}
            alt="상품 이미지"
            width={400}
            className="w-full h-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={() => {}}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>
        <ItemAddInputs
          handleTitle={handleTitle}
          handleQuantity={handleQuantity}
          handlePrice={handlePrice}
          handleLocation={handleLocation}
        />
      </div>
    </div>
  );
}
