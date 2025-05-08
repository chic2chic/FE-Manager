import leftArrowImg from "@/assets/webps/popUpCreate/left-arrow.webp";
import TestImage from "@/assets/webps/onBoarding/test.png";
import { useEffect, useRef, useState } from "react";
import useCalendar from "@/hooks/useCalendar";
import { useDaumPostcode } from "@/hooks/useDaumPostcode";
import { usePopUpCreateStore } from "@/stores/usePopUpCreateStore";
import Modal from "@/components/common/Modal";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";
import { useNavigate } from "react-router-dom";
import PopUpLabel from "@/pages/popUpCreatePage/views/PopUpLabel";
import PopUpInput from "@/pages/popUpCreatePage/views/PopUpInput";
import PopUpQuestionnaire from "@/pages/popUpCreatePage/views/PopUpQuestionnaire";

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

  const { formData, updatePopupField, isValidate } = usePopUpCreateStore();

  const navigate = useNavigate();

  const handleCancel = () => {
    setIsAlertModalOpen(true);
  };

  // TODO : 저장 기능 구현 -> React Query로 API 호출
  const handleSave = () => {
    const validation = isValidate();
    if (validation.isValid) {
      setIsSaveModalOpen(true);
    } else {
      alert(validation.message);
    }
  };

  const handleSaveConfirmBtn = () => {
    setIsSaveModalOpen(false);
    navigate("/popup-list");
  };

  // 날짜와 시간 형식 변환 헬퍼 함수
  const formatDateToString = (date: Date): string => {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  };

  const formatTimeToString = (hours: number): string => {
    const paddedHours = String(Math.floor(hours)).padStart(2, "0");
    return `${paddedHours}:00:00`;
  };

  const formatDateTimeToString = (date: Date, hours: number): string => {
    const newDate = new Date(date);
    newDate.setHours(hours, 0, 0, 0);
    return newDate.toISOString(); // YYYY-MM-DDThh:mm:ss 형식
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
    // 예약 시작 날짜가 변경되면 날짜+시간 정보 업데이트
    if (formData.popupCreateRequest.runOpenTime) {
      updatePopupField(
        "reservationOpenDateTime",
        formatDateTimeToString(
          reservStartCalender.selectedDate,
          parseInt(formData.popupCreateRequest.runOpenTime),
        ),
      );
    }
  }, [
    reservStartCalender.selectedDate,
    formData.popupCreateRequest.runOpenTime,
    updatePopupField,
  ]);

  useEffect(() => {
    // 예약 종료 날짜가 변경되면 날짜+시간 정보 업데이트
    if (formData.popupCreateRequest.runCloseTime) {
      updatePopupField(
        "reservationCloseDateTime",
        formatDateTimeToString(
          reservEndCalender.selectedDate,
          parseInt(formData.popupCreateRequest.runCloseTime),
        ),
      );
    }
  }, [
    reservEndCalender.selectedDate,
    formData.popupCreateRequest.runCloseTime,
    updatePopupField,
  ]);

  useEffect(() => {
    updatePopupField("roadAddress", addressInfo.address);
    updatePopupField("latitude", addressInfo.latitude);
    updatePopupField("longitude", addressInfo.longitude);
  }, [addressInfo, updatePopupField]);

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

  // 시간 값 추출 (문자열 -> 숫자)
  const getTimeValue = (timeString: string): number => {
    if (!timeString || timeString === "00:00:00") return 0;
    return parseInt(timeString.split(":")[0]);
  };

  // 현재 운영 시간 값 가져오기
  const openTime = getTimeValue(formData.popupCreateRequest.runOpenTime);
  const closeTime = getTimeValue(formData.popupCreateRequest.runCloseTime);

  // 현재 예약 시간 값 가져오기
  const reservOpenTime = getTimeValue(formData.popupCreateRequest.runOpenTime);
  const reservCloseTime = getTimeValue(
    formData.popupCreateRequest.runCloseTime,
  );

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
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                // 이미지 URL 처리 로직 (실제 구현 필요)
                const imageUrl = URL.createObjectURL(e.target.files[0]);
                updatePopupField("imageUrl", imageUrl);
              }
            }}
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
              maxTime={closeTime || 24}
              onChange={e => {
                const timeValue = Number(e.target.value);
                updatePopupField("runOpenTime", formatTimeToString(timeValue));
              }}
            />
            <span>-</span>
            <PopUpInput
              placeholder="close"
              cssOption="text-center w-[90px]"
              isOnlyNumber={true}
              isTimeFormat={true}
              minTime={openTime || 0}
              onChange={e => {
                const timeValue = Number(e.target.value);
                updatePopupField("runCloseTime", formatTimeToString(timeValue));
              }}
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
                      ? reservCloseTime || 24
                      : 24
                  }
                  onChange={e => {
                    const timeValue = Number(e.target.value);
                    // 예약 시작 시간 업데이트 및 datetime 업데이트
                    updatePopupField(
                      "reservationOpenDateTime",
                      formatDateTimeToString(
                        reservStartCalender.selectedDate,
                        timeValue,
                      ),
                    );
                  }}
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
                      ? reservOpenTime || 0
                      : 0
                  }
                  onChange={e => {
                    const timeValue = Number(e.target.value);
                    // 예약 종료 시간 업데이트 및 datetime 업데이트
                    updatePopupField(
                      "reservationCloseDateTime",
                      formatDateTimeToString(
                        reservEndCalender.selectedDate,
                        timeValue,
                      ),
                    );
                  }}
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
                updatePopupField("timeCapacity", Number(e.target.value))
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
                updatePopupField("totalCapacity", Number(e.target.value))
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
