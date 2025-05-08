import leftArrowImg from "@/assets/webps/popUpCreate/left-arrow.webp";
import TestImage from "@/assets/webps/onBoarding/test.png";
import PopUpInput from "./views/PopUpInput";
import PopUpLabel from "./views/PopUpLabel";
import React, { useEffect, useRef, useState } from "react";
import useCalendar from "@/hooks/useCalendar";
import { useDaumPostcode } from "@/hooks/useDaumPostcode";
import { usePopUpCreateStore } from "@/stores/usePopUpCreateStore";
import Modal from "@/components/common/Modal";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";
import { useNavigate } from "react-router-dom";
import PopUpQuestionnaire from "./views/PopUpQuestionnaire";
import { formatDateTimeToString, formatDateToString } from "@/utils/FormatDay";
import { getTimeValue } from "@/utils/FormatTimestamp";
import { usePopUpCreate } from "@/hooks/usePopUpCreate";

export default function PopUpCreatePage() {
  const startCalender = useCalendar();
  const endCalender = useCalendar();
  const reservStartCalender = useCalendar();
  const reservEndCalender = useCalendar();

  const { addressInfo, PostCode } = useDaumPostcode();

  const startCalendarRef = useRef<HTMLDivElement>(null);
  const endCalendarRef = useRef<HTMLDivElement>(null);
  const reservStartCalendarRef = useRef<HTMLDivElement>(null);
  const reservEndCalendarRef = useRef<HTMLDivElement>(null);

  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(TestImage);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const { formData, updatePopupField, isValidate, resetForm } =
    usePopUpCreateStore();
  const { popUpCreate } = usePopUpCreate();

  const navigate = useNavigate();

  const handleCancel = () => {
    setIsAlertModalOpen(true);
  };

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

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleSaveConfirmBtn = () => {
    setIsSaveModalOpen(false);
    navigate("/popup-list");
  };

  useEffect(() => {
    updatePopupField(
      "popupStartDate",
      formatDateToString(startCalender.selectedDate),
    );
  }, [startCalender.selectedDate, updatePopupField]);

  useEffect(() => {
    updatePopupField(
      "popupEndDate",
      formatDateToString(endCalender.selectedDate),
    );
  }, [endCalender.selectedDate, updatePopupField]);

  useEffect(() => {
    updatePopupField(
      "reservationOpenDateTime",
      formatDateTimeToString(reservStartCalender.selectedDate || new Date(), 0),
    );
  }, [reservStartCalender.selectedDate, updatePopupField]);

  useEffect(() => {
    updatePopupField(
      "reservationCloseDateTime",
      formatDateTimeToString(reservEndCalender.selectedDate || new Date(), 0),
    );
  }, [reservEndCalender.selectedDate, updatePopupField]);

  useEffect(() => {
    updatePopupField("roadAddress", addressInfo.address);
    updatePopupField("latitude", addressInfo.latitude);
    updatePopupField("longitude", addressInfo.latitude);
  }, [addressInfo, updatePopupField]);

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickOutsideStart =
        startCalendarRef.current &&
        !startCalendarRef.current.contains(event.target as Node);
      const isClickOutsideEnd =
        endCalendarRef.current &&
        !endCalendarRef.current.contains(event.target as Node);
      const isClickOutsideReservStart =
        reservStartCalendarRef.current &&
        !reservStartCalendarRef.current.contains(event.target as Node);
      const isClickOutsideReservEnd =
        reservEndCalendarRef.current &&
        !reservEndCalendarRef.current.contains(event.target as Node);

      if (isClickOutsideStart && startCalender.isOpen) {
        startCalender.setIsOpen(false);
      }
      if (isClickOutsideEnd && endCalender.isOpen) {
        endCalender.setIsOpen(false);
      }
      if (isClickOutsideReservStart && reservStartCalender.isOpen) {
        reservStartCalender.setIsOpen(false);
      }
      if (isClickOutsideReservEnd && reservEndCalender.isOpen) {
        reservEndCalender.setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    startCalender.isOpen,
    endCalender.isOpen,
    reservStartCalender.isOpen,
    reservEndCalender.isOpen,
  ]);

  return (
    <div className="flex flex-col py-[32px]">
      <img
        src={leftArrowImg}
        width={36}
        height={36}
        className="ml-[40px] cursor-pointer"
        onClick={handleCancel}
      />
      <div className="flex justify-center gap-[30px] mt-[60px]">
        <div className="relative w-[312px] h-[440px]">
          <img
            src={previewImage}
            alt="상품 이미지"
            width={400}
            className="w-full h-full object-cover rounded-[20px]"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>
        <div className="flex flex-col gap-[32px]">
          <div className="flex gap-[30px] items-center">
            <PopUpLabel label="팝업명" />
            <PopUpInput
              placeholder="팝업명을 입력해주세요"
              cssOption="w-[480px]"
              onChange={e => updatePopupField("name", e.target.value)}
            />
          </div>
          <div className="flex gap-[30px] items-center relative">
            <PopUpLabel label="팝업 기간" />
            <div className="relative" ref={startCalendarRef}>
              {startCalender.foldCalender()}
              {startCalender.isOpen &&
                startCalender.calender({
                  cssOption: "absolute top-[60px] left-0 bg-gray01 z-20",
                  startDate: new Date(),
                  endDate: endCalender.selectedDate,
                })}
            </div>
            <span>-</span>
            <div className="relative" ref={endCalendarRef}>
              {endCalender.foldCalender()}
              {endCalender.isOpen &&
                endCalender.calender({
                  cssOption: "absolute top-[60px] left-0 bg-gray01 z-20",
                  startDate: startCalender.selectedDate,
                })}
            </div>
          </div>
          <div className="flex gap-[30px] items-center">
            <PopUpLabel label="운영 시간" />
            <PopUpInput
              placeholder="open"
              cssOption="text-center w-[90px]"
              isOnlyNumber={true}
              isTimeFormat={true}
              maxTime={Number(formData.popupCreateRequest.runOpenTime) || 24}
              onChange={e => updatePopupField("runOpenTime", e.target.value)}
            />
            <span>-</span>
            <PopUpInput
              placeholder="close"
              cssOption="text-center w-[90px]"
              isOnlyNumber={true}
              isTimeFormat={true}
              minTime={Number(formData.popupCreateRequest.runCloseTime) || 0}
              onChange={e => updatePopupField("runCloseTime", e.target.value)}
            />
          </div>
          <div className="flex gap-[30px] items-baseline">
            <PopUpLabel label="예약 기간" />
            <div className="flex flex-col gap-[28px]">
              <div
                className="flex gap-[18px] relative"
                ref={reservStartCalendarRef}
              >
                {reservStartCalender.foldCalender()}
                {reservStartCalender.isOpen &&
                  reservStartCalender.calender({
                    cssOption: "absolute top-[60px] left-0 bg-gray01 z-20",
                    startDate: startCalender.selectedDate,
                    endDate:
                      endCalender.selectedDate > reservEndCalender.selectedDate
                        ? reservEndCalender.selectedDate
                        : endCalender.selectedDate,
                  })}
                <PopUpInput
                  placeholder="open"
                  cssOption="text-center w-[90px]"
                  isOnlyNumber={true}
                  isTimeFormat={true}
                  maxTime={
                    reservStartCalender.selectedDate.getTime() ===
                    reservEndCalender.selectedDate.getTime()
                      ? getTimeValue(
                          formData.popupCreateRequest.reservationCloseDateTime,
                        ) || 24
                      : 24
                  }
                  onChange={e =>
                    updatePopupField(
                      "reservationOpenDateTime",
                      formatDateTimeToString(
                        reservStartCalender.selectedDate || new Date(),
                        Number(e.target.value),
                      ),
                    )
                  }
                />
              </div>
              <div
                className="flex gap-[18px] relative"
                ref={reservEndCalendarRef}
              >
                {reservEndCalender.foldCalender()}
                {reservEndCalender.isOpen &&
                  reservEndCalender.calender({
                    cssOption: "absolute top-[60px] left-0 bg-gray01 z-20",
                    startDate: reservStartCalender.selectedDate,
                    endDate: endCalender.selectedDate,
                  })}
                <PopUpInput
                  placeholder="close"
                  cssOption="text-center w-[90px]"
                  isOnlyNumber={true}
                  isTimeFormat={true}
                  minTime={
                    reservStartCalender.selectedDate.getTime() ===
                    reservEndCalender.selectedDate.getTime()
                      ? getTimeValue(
                          formData.popupCreateRequest.reservationOpenDateTime,
                        ) || 0
                      : 0
                  }
                  onChange={e =>
                    updatePopupField(
                      "reservationCloseDateTime",
                      formatDateTimeToString(
                        reservStartCalender.selectedDate || new Date(),
                        Number(e.target.value),
                      ),
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex gap-[30px] items-center">
            <PopUpLabel label="시간별 수용 인원" />
            <PopUpInput
              placeholder="수용 인원을 입력해주세요"
              cssOption="text-center w-[242px]"
              isOnlyNumber={true}
              isLimit={true}
              minTime={1}
              maxTime={formData.popupCreateRequest.totalCapacity || 1000}
              onChange={e =>
                updatePopupField("totalCapacity", Number(e.target.value))
              }
            />
          </div>
          <div className="flex gap-[30px] items-center">
            <PopUpLabel label="총 수용 인원" />
            <PopUpInput
              placeholder="총 수용 인원을 입력해주세요"
              cssOption="text-center w-[242px]"
              isOnlyNumber={true}
              isLimit={true}
              minTime={formData.popupCreateRequest.timeCapacity || 1}
              maxTime={1000}
              onChange={e =>
                updatePopupField("timeCapacity", Number(e.target.value))
              }
            />
          </div>
          <div className="flex gap-[30px] items-center">
            <PopUpLabel label="위치" />
            <PostCode />
          </div>
          <div className="flex gap-[30px] items-center">
            <PopUpLabel label="상세 주소" />
            <PopUpInput
              placeholder="상세 주소를 입력해주세요"
              cssOption="w-[480px]"
              onChange={e => updatePopupField("detailAddress", e.target.value)}
            />
          </div>
        </div>
      </div>
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
}
