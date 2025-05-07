import leftArrowImg from "@/assets/webps/popUpCreate/left-arrow.webp";
import TestImage from "@/assets/webps/onBoarding/test.png";
import PopUpInput from "./views/PopUpInput";
import PopUpLabel from "./views/PopUpLabel";
import { useEffect, useRef, useState } from "react";
import useCalendar from "@/hooks/useCalendar";
import { useDaumPostcode } from "@/hooks/useDaumPostcode";
import { usePopUpCreateStore } from "@/stores/usePopUpCreateStore";
import Modal from "@/components/common/Modal";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";
import { useNavigate } from "react-router-dom";
import PopUpQuestionnaire from "./views/PopUpQuestionnaire";

export default function PopUpCreate() {
  const startCalender = useCalendar();
  const endCalender = useCalendar();
  const reservStartCalender = useCalendar();
  const reservEndCalender = useCalendar();

  const { addressInfo, PostCode } = useDaumPostcode();

  const startCalendarRef = useRef<HTMLDivElement>(null);
  const endCalendarRef = useRef<HTMLDivElement>(null);
  const reservStartCalendarRef = useRef<HTMLDivElement>(null);
  const reservEndCalendarRef = useRef<HTMLDivElement>(null);

  const { formData, updateField } = usePopUpCreateStore();

  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsAlertModalOpen(true);
  };

  // TODO : 저장 기능 구현 -> React Query로 API 호출
  const handleSave = () => {
    setIsSaveModalOpen(true);
  };

  const handleSaveConfirmBtn = () => {
    setIsSaveModalOpen(false);
    navigate("/popup-list");
  };

  useEffect(() => {
    updateField("popUpStartDate", startCalender.selectedDate);
  }, [startCalender.selectedDate, updateField]);

  useEffect(() => {
    updateField("popUpEndDate", endCalender.selectedDate);
  }, [endCalender.selectedDate, updateField]);

  useEffect(() => {
    updateField("reservStartDate", reservStartCalender.selectedDate);
  }, [reservStartCalender.selectedDate, updateField]);

  useEffect(() => {
    updateField("reservEndDate", reservEndCalender.selectedDate);
  }, [reservEndCalender.selectedDate, updateField]);

  useEffect(() => {
    updateField("address", addressInfo);
  }, [addressInfo, updateField]);

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
            src={TestImage}
            alt="상품 이미지"
            width={400}
            className="w-full h-full object-cover rounded-[20px]"
          />
          <input
            type="file"
            accept="image/*"
            onChange={() => {}}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>
        <div className="flex flex-col gap-[32px]">
          <div className="flex gap-[30px] items-center">
            <PopUpLabel label="팝업명" />
            <PopUpInput
              placeholder="팝업명을 입력해주세요"
              cssOption="w-[480px]"
              onChange={e => updateField("popUpTitle", e.target.value)}
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
              maxTime={formData.popUpEndTime || 24}
              onChange={e =>
                updateField("popUpOpenTime", Number(e.target.value))
              }
            />
            <span>-</span>
            <PopUpInput
              placeholder="close"
              cssOption="text-center w-[90px]"
              isOnlyNumber={true}
              isTimeFormat={true}
              minTime={formData.popUpOpenTime || 0}
              onChange={e =>
                updateField("popUpEndTime", Number(e.target.value))
              }
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
                      ? formData.reservEndTime || 24
                      : 24
                  }
                  onChange={e =>
                    updateField("reservOpenTime", Number(e.target.value))
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
                      ? formData.reservOpenTime || 0
                      : 0
                  }
                  onChange={e =>
                    updateField("reservEndTime", Number(e.target.value))
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
              maxTime={formData.entireMaxNum || 1000}
              onChange={e => updateField("timeMaxNum", Number(e.target.value))}
            />
          </div>
          <div className="flex gap-[30px] items-center">
            <PopUpLabel label="총 수용 인원" />
            <PopUpInput
              placeholder="총 수용 인원을 입력해주세요"
              cssOption="text-center w-[242px]"
              isOnlyNumber={true}
              isLimit={true}
              minTime={formData.timeMaxNum || 1}
              maxTime={1000}
              onChange={e =>
                updateField("entireMaxNum", Number(e.target.value))
              }
            />
          </div>
          <div className="flex gap-[30px] items-center">
            <PopUpLabel label="위치" />
            <PostCode />
          </div>
        </div>
      </div>
      <PopUpQuestionnaire handleSave={handleSave} />
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
