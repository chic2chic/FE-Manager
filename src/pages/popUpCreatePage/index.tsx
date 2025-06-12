import leftArrowImg from "@/assets/webps/popUpCreate/left-arrow.webp";
import React, { useEffect, useState } from "react";
import { usePopUpCreateStore } from "@/stores/usePopUpCreateStore";
import Modal from "@/components/common/Modal";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";
import { useNavigate } from "react-router-dom";
import PopUpQuestionnaire from "./views/PopUpQuestionnaire";
import { usePopUpCreate } from "@/hooks/usePopUpCreate";
import PopUpInfoArea from "./views/PopUpInfoArea";

const PopUpCreatePage = () => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const { formData, updatePopupField, isValidate, resetForm } =
    usePopUpCreateStore();
  const { popUpCreate } = usePopUpCreate();

  const navigate = useNavigate();

  // 뒤로가기 버튼 클릭시, 확인 모달 띄움
  const handleCancel = () => {
    setIsAlertModalOpen(true);
  };

  // 저장 버튼 클릭시 팝업 생성 API 호출
  const handleSave = async () => {
    const { isValid, message } = isValidate();

    if (!isValid) {
      setAlertMessage(message);
      return;
    }

    if (!imageFile) {
      setAlertMessage("이미지를 업로드해주세요");
      return;
    }

    await popUpCreate(imageFile)
      .then(() => setIsSaveModalOpen(true))
      .catch(() => setAlertMessage("등록 오류가 발생했습니다."));
  };

  // 사용자가 이미지를 업로드하면, 프리뷰 이미지를 세팅함
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  // 저장하기 버튼 클릭 이후 뜬 확인 모달을 클릭하면 메인 페이지로 네비게이션
  const handleSaveConfirmBtn = () => {
    setIsSaveModalOpen(false);
    navigate("/dashboard");
  };

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  return (
    <div className="flex flex-col py-[32px]">
      <img
        src={leftArrowImg}
        width={36}
        height={36}
        className="ml-[40px] cursor-pointer"
        onClick={handleCancel}
      />
      <PopUpInfoArea
        formData={formData}
        updatePopupField={updatePopupField}
        previewImage={previewImage}
        handleUploadImage={handleUploadImage}
      />
      <PopUpQuestionnaire handleSave={handleSave} alertMessage={alertMessage} />
      <Modal
        isOpen={isAlertModalOpen}
        setIsOpen={setIsAlertModalOpen}
        content="팝업 등록을 취소하시겠어요?"
        image={bin}
        confirmText="취소하기"
        cancelText="돌아가기"
        onConfirm={() => navigate("/popup-list")}
        onCancel={() => setIsAlertModalOpen(false)}
      />
      <Modal
        isOpen={isSaveModalOpen}
        setIsOpen={setIsSaveModalOpen}
        content="팝업이 등록되었습니다"
        image={check}
        confirmText="확인"
        onConfirm={handleSaveConfirmBtn}
      />
    </div>
  );
};

export default PopUpCreatePage;
