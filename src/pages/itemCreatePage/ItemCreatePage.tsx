import CustomButton from "@/components/common/CustomButton";
import React, { useState } from "react";
import TestImage from "@/assets/webps/onBoarding/test.png";
import Modal from "@/components/common/Modal";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";
import { useNavigate } from "react-router-dom";
import { useItemCreate } from "@/hooks/useItemCreate";
import ItemCreateInputs from "@/pages/itemCreatePage/views/ItemCreateInputs";

export default function ItemAddPage() {
  const [itemPopUpId] = useState<number>(1); // 추후 zustand로 전역 상태 관리
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemStock, setItemStock] = useState<number>(0);
  const [itemMinStock, setItemMinStock] = useState<number>(0);
  const [itemLocation, setItemLocation] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { createItem } = useItemCreate();

  const handleCancel = () => {
    setIsAlertModalOpen(true);
  };

  const handleSave = () => {
    setIsSaveModalOpen(true);
    return (
      itemPopUpId &&
      itemName &&
      itemPrice &&
      itemStock &&
      itemMinStock &&
      itemLocation &&
      imageFile
    );
  };

  const handleSaveConfirmBtn = async () => {
    // createItem 호출
    // createItem 안에다 위 state들 넘겨주면 생성됨
    if (!imageFile) return alert("이미지를 선택해주세요.");
    await createItem({
      imageFile,
      data: {
        popupId: itemPopUpId,
        name: itemName,
        price: itemPrice,
        stock: itemStock,
        minStock: itemMinStock,
        location: itemLocation,
        imageUrl: import.meta.env.VITE_TEST_IMAGE_URL,
      },
    });
    setIsSaveModalOpen(false);
    navigate("/items");
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemPrice(Number(e.target.value));
  };

  const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemStock(Number(e.target.value));
  };

  const handleMinStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemMinStock(Number(e.target.value));
  };

  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemLocation(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-[14px] mt-[46px] mr-[80px] justify-end">
        <CustomButton
          label="취소"
          cssOption="bg-gray01 border border-gray05 text-gray09 text-[20px] hover:bg-gray02 transition"
          onClick={handleCancel}
        />
        <CustomButton
          label="등록"
          cssOption="bg-gray10 text-gray01 text-[20px] hover:opacity-50"
          onClick={handleSave}
        />
      </div>
      <div className="absolute left-[50%] mt-40 transform -translate-x-1/2 flex justify-center items-center gap-[53px]">
        <div className="relative w-[400px] h-[400px]">
          <img
            src={imageFile ? URL.createObjectURL(imageFile) : TestImage}
            alt="상품 이미지"
            width={400}
            className="w-full h-full object-cover rounded-[20px]"
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) setImageFile(file);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>
        <ItemCreateInputs
          name={itemName}
          price={itemPrice}
          stock={itemStock}
          minStock={itemMinStock}
          location={itemLocation}
          handleName={handleName}
          handlePrice={handlePrice}
          handleStock={handleStock}
          handleMinStock={handleMinStock}
          handleLocation={handleLocation}
        />
      </div>
      <Modal
        isOpen={isAlertModalOpen}
        setIsOpen={setIsAlertModalOpen}
        content="상품 등록을 취소하시겠어요?"
        image={bin}
        confirmText="취소하기"
        cancelText="돌아가기"
        onConfirm={() => navigate("/items")}
        onCancel={() => setIsAlertModalOpen(false)}
      />

      <Modal
        isOpen={isSaveModalOpen}
        setIsOpen={setIsSaveModalOpen}
        content="상품이 등록되었습니다"
        image={check}
        confirmText="확인"
        onConfirm={handleSaveConfirmBtn}
      />
    </div>
  );
}
