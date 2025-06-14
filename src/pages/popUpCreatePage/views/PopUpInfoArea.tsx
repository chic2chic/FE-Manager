import useCalendar from "@/hooks/useCalendar";
import { useDaumPostcode } from "@/hooks/useDaumPostcode";
import React, { useEffect, useRef } from "react";
import PopUpLabel from "./PopUpLabel";
import PopUpInput from "./PopUpInput";
import {
  PopUpCreateRequest,
  PopUpWithChoicesRequest,
} from "@/types/api/ApiRequestType";
import { FormatDateTimeToString, FormatDateToString } from "@/utils/FormatDay";
import { getTimeValue } from "@/utils/FormatTimestamp";
import useClickOutside from "@/hooks/useClickOutside";
import { addDays } from "date-fns";
import NoImageComp from "@/components/ui/NoImageComp";

type Props = {
  formData: PopUpWithChoicesRequest;
  updatePopupField: <K extends keyof PopUpCreateRequest>(
    _field: K,
    _value: PopUpCreateRequest[K],
  ) => void;
  previewImage: string;
  handleUploadImage: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PopUpInfoArea({
  formData,
  updatePopupField,
  previewImage,
  handleUploadImage,
}: Props) {
  const { popupCreateRequest } = formData;
  const { addressInfo, PostCode } = useDaumPostcode();

  // 오늘 날짜 설정
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // 캘린더 초기화
  const startCalender = useCalendar();
  const endCalender = useCalendar();
  const reservStartCalender = useCalendar();
  const reservEndCalender = useCalendar();

  // 초기화 - 모든 날짜 설정
  useEffect(() => {
    // 초기값 설정 - 처음 렌더링시에만 실행
    if (!popupCreateRequest.popupStartDate) {
      startCalender.setSelectedDate(today);

      updatePopupField("popupStartDate", FormatDateToString(today));
    }

    if (!popupCreateRequest.popupEndDate) {
      endCalender.setSelectedDate(tomorrow);

      updatePopupField("popupEndDate", FormatDateToString(tomorrow));
    }

    if (!popupCreateRequest.reservationOpenDateTime) {
      // 예약 시작일은 기본적으로 팝업 시작일과 동일하게 설정
      reservStartCalender.setSelectedDate(today);
      updatePopupField(
        "reservationOpenDateTime",
        FormatDateTimeToString(today, 0),
      );
    }

    if (!popupCreateRequest.reservationCloseDateTime) {
      // 예약 종료일은 기본적으로 팝업 종료일과 동일하게 설정
      reservEndCalender.setSelectedDate(tomorrow);
      updatePopupField(
        "reservationCloseDateTime",
        FormatDateTimeToString(tomorrow, 0),
      );
    }
  }, []);

  const calenderRefs = {
    start: useRef<HTMLDivElement>(null),
    end: useRef<HTMLDivElement>(null),
    reservStart: useRef<HTMLDivElement>(null),
    reservEnd: useRef<HTMLDivElement>(null),
  };

  // 팝업 시작일이 변경될 때
  useEffect(() => {
    updatePopupField(
      "popupStartDate",
      FormatDateToString(startCalender.selectedDate),
    );

    // 1. 종료일이 시작일보다 이전이면 시작일+1로 설정
    if (endCalender.selectedDate <= startCalender.selectedDate) {
      const newEndDate = addDays(startCalender.selectedDate, 1);
      endCalender.setSelectedDate(newEndDate);

      updatePopupField("popupEndDate", FormatDateToString(newEndDate));
    }

    // 2. 예약 시작일이 팝업 시작일보다 이전이면 팝업 시작일로 설정
    if (reservStartCalender.selectedDate < startCalender.selectedDate) {
      reservStartCalender.setSelectedDate(startCalender.selectedDate);
      updatePopupField(
        "reservationOpenDateTime",
        FormatDateTimeToString(
          startCalender.selectedDate,
          getTimeValue(popupCreateRequest.reservationOpenDateTime) || 0,
        ),
      );
    }

    // 3. 예약 종료일이 유효한지 확인 (예약 시작일+1 ~ 팝업 종료일 사이)
    validateReservEndDate();
  }, [startCalender.selectedDate]);

  // 팝업 종료일이 변경될 때
  useEffect(() => {
    updatePopupField(
      "popupEndDate",
      FormatDateToString(endCalender.selectedDate),
    );

    // 예약 종료일이 팝업 종료일보다 이후면 팝업 종료일로 설정
    if (reservEndCalender.selectedDate > endCalender.selectedDate) {
      reservEndCalender.setSelectedDate(endCalender.selectedDate);
      updatePopupField(
        "reservationCloseDateTime",
        FormatDateTimeToString(
          endCalender.selectedDate,
          getTimeValue(popupCreateRequest.reservationCloseDateTime) || 0,
        ),
      );
    }
  }, [endCalender.selectedDate]);

  // 예약 시작일이 변경될 때
  useEffect(() => {
    updatePopupField(
      "reservationOpenDateTime",
      FormatDateTimeToString(
        reservStartCalender.selectedDate,
        getTimeValue(popupCreateRequest.reservationOpenDateTime) || 0,
      ),
    );

    // 예약 종료일이 유효한지 확인 (예약 시작일+1 ~ 팝업 종료일 사이)
    validateReservEndDate();
  }, [reservStartCalender.selectedDate]);

  // 예약 종료일이 변경될 때
  useEffect(() => {
    updatePopupField(
      "reservationCloseDateTime",
      FormatDateTimeToString(
        reservEndCalender.selectedDate,
        getTimeValue(popupCreateRequest.reservationCloseDateTime) || 0,
      ),
    );
  }, [reservEndCalender.selectedDate]);

  // 예약 종료일 유효성 검사 및 업데이트 함수
  const validateReservEndDate = () => {
    // 예약 종료일은 (예약 시작일+1)과 팝업 종료일 사이에 있어야 함
    const minDate = addDays(reservStartCalender.selectedDate, 1);
    const maxDate = endCalender.selectedDate;

    // 현재 예약 종료일이 최소 날짜보다 이전이면 최소 날짜로 설정
    if (reservEndCalender.selectedDate < minDate) {
      // 만약 최소 날짜가 최대 날짜보다 이후라면 최대 날짜로 설정
      const newReservEndDate = minDate <= maxDate ? minDate : maxDate;

      reservEndCalender.setSelectedDate(newReservEndDate);
      updatePopupField(
        "reservationCloseDateTime",
        FormatDateTimeToString(
          newReservEndDate,
          getTimeValue(popupCreateRequest.reservationCloseDateTime) || 0,
        ),
      );
    }
    // 현재 예약 종료일이 최대 날짜보다 이후라면 최대 날짜로 설정
    else if (reservEndCalender.selectedDate > maxDate) {
      reservEndCalender.setSelectedDate(maxDate);
      updatePopupField(
        "reservationCloseDateTime",
        FormatDateTimeToString(
          maxDate,
          getTimeValue(popupCreateRequest.reservationCloseDateTime) || 0,
        ),
      );
    }
  };

  // 주소 정보 업데이트
  useEffect(() => {
    updatePopupField("roadAddress", addressInfo.address);
    updatePopupField("latitude", Number(addressInfo.latitude));
    updatePopupField("longitude", Number(addressInfo.longitude));
  }, [addressInfo, updatePopupField]);

  // 캘린더 외부 클릭 감지
  const refs = [
    calenderRefs.start,
    calenderRefs.end,
    calenderRefs.reservStart,
    calenderRefs.reservEnd,
  ];

  const isOpenStates = [
    startCalender.isOpen,
    endCalender.isOpen,
    reservStartCalender.isOpen,
    reservEndCalender.isOpen,
  ];

  const closeHandlers = [
    () => startCalender.setIsOpen(false),
    () => endCalender.setIsOpen(false),
    () => reservStartCalender.setIsOpen(false),
    () => reservEndCalender.setIsOpen(false),
  ];

  useClickOutside(refs, isOpenStates, index => closeHandlers[index]());

  return (
    <div className="flex justify-center gap-[50px] mt-[60px]">
      {/* 이미지 업로드 영역 */}
      <div className={`relative w-[312px] h-[440px]`}>
        {previewImage ? (
          <img
            src={previewImage}
            alt="팝업 이미지"
            data-testid="popup-create-preview-img"
            className="w-full h-full object-cover rounded-[20px]"
          />
        ) : (
          <NoImageComp width={312} height={440} />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleUploadImage}
          data-testid="popup-create-img-btn"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>

      {/* 팝업 정보 입력 영역 */}
      <div className="flex flex-col gap-[32px]">
        {/* 팝업명 */}
        <div className="flex gap-[30px] items-center">
          <PopUpLabel label="팝업명" />
          <PopUpInput
            placeholder="팝업명을 입력해주세요"
            cssOption="w-[480px]"
            onChange={e => updatePopupField("name", e.target.value)}
            data-testid="popup-create-input-name"
          />
        </div>

        {/* 팝업 기간 */}
        <div className="flex gap-[30px] items-center relative">
          <PopUpLabel label="팝업 기간" />
          <div className="relative" ref={calenderRefs.start}>
            {startCalender.foldCalender()}
            {startCalender.isOpen &&
              startCalender.calender({
                cssOption: "absolute top-[60px] left-0 bg-gray01 z-20",
                startDate: today, // 오늘 이후만 선택 가능
              })}
          </div>
          <span>-</span>
          <div className="relative" ref={calenderRefs.end}>
            {endCalender.foldCalender()}
            {endCalender.isOpen &&
              endCalender.calender({
                cssOption: "absolute top-[60px] left-0 bg-gray01 z-20",
                startDate: addDays(startCalender.selectedDate, 1), // 시작일+1 이후만 선택 가능
              })}
          </div>
        </div>

        {/* 운영 시간 */}
        <div className="flex gap-[30px] items-center">
          <PopUpLabel label="운영 시간" />
          <PopUpInput
            placeholder="open"
            cssOption="text-center w-[90px]"
            isOnlyNumber={true}
            isTimeFormat={true}
            maxTime={Number(popupCreateRequest.runCloseTime) || 24}
            onChange={e =>
              updatePopupField("runOpenTime", `${e.target.value}:00:00`)
            }
            data-testid="popup-create-run-open-time"
          />
          <span>-</span>
          <PopUpInput
            placeholder="close"
            cssOption="text-center w-[90px]"
            isOnlyNumber={true}
            isTimeFormat={true}
            minTime={Number(popupCreateRequest.runOpenTime) || 0}
            onChange={e =>
              updatePopupField("runCloseTime", `${e.target.value}:00:00`)
            }
            data-testid="popup-create-run-close-time"
          />
        </div>

        {/* 예약 기간 */}
        <div className="flex gap-[30px] items-baseline">
          <PopUpLabel label="예약 기간" />
          <div className="flex flex-col gap-[28px]">
            {/* 예약 시작 - 팝업 시작일부터 팝업 종료일까지 선택 가능 */}
            <div
              className="flex gap-[18px] relative"
              ref={calenderRefs.reservStart}
            >
              {reservStartCalender.foldCalender()}
              {reservStartCalender.isOpen &&
                reservStartCalender.calender({
                  cssOption: "absolute top-[60px] left-0 bg-gray01 z-20",
                  startDate: startCalender.selectedDate, // 팝업 시작일 이후만 선택 가능
                  endDate: endCalender.selectedDate, // 팝업 종료일까지만 선택 가능
                })}
              <PopUpInput
                placeholder="open"
                cssOption="text-center w-[90px]"
                isOnlyNumber={true}
                isTimeFormat={true}
                onChange={e =>
                  updatePopupField(
                    "reservationOpenDateTime",
                    FormatDateTimeToString(
                      reservStartCalender.selectedDate,
                      Number(e.target.value),
                    ),
                  )
                }
                data-testid="popup-create-reserv-open"
              />
            </div>

            {/* 예약 종료 - 예약 시작일+1부터 팝업 종료일까지만 선택 가능 */}
            <div
              className="flex gap-[18px] relative"
              ref={calenderRefs.reservEnd}
            >
              {reservEndCalender.foldCalender()}
              {reservEndCalender.isOpen &&
                reservEndCalender.calender({
                  cssOption: "absolute top-[60px] left-0 bg-gray01 z-20",
                  startDate: addDays(reservStartCalender.selectedDate, 1), // 예약 시작일+1부터만 선택 가능
                  endDate: endCalender.selectedDate, // 팝업 종료일까지만 선택 가능
                })}
              <PopUpInput
                placeholder="close"
                cssOption="text-center w-[90px]"
                isOnlyNumber={true}
                isTimeFormat={true}
                onChange={e =>
                  updatePopupField(
                    "reservationCloseDateTime",
                    FormatDateTimeToString(
                      reservEndCalender.selectedDate,
                      Number(e.target.value),
                    ),
                  )
                }
                data-testid="popup-create-reserv-close"
              />
            </div>
          </div>
        </div>

        {/* 수용 인원 관련 입력 */}
        <div className="flex gap-[30px] items-center">
          <PopUpLabel label="시간별 수용 인원" />
          <PopUpInput
            placeholder="수용 인원을 입력해주세요"
            cssOption="text-center w-[242px]"
            isOnlyNumber={true}
            isLimit={true}
            minTime={1}
            maxTime={popupCreateRequest.totalCapacity || 1000}
            onChange={e =>
              updatePopupField("timeCapacity", Number(e.target.value))
            }
            data-testid="popup-create-time-capacity"
          />
        </div>
        <div className="flex gap-[30px] items-center">
          <PopUpLabel label="총 수용 인원" />
          <PopUpInput
            placeholder="총 수용 인원을 입력해주세요"
            cssOption="text-center w-[242px]"
            isOnlyNumber={true}
            isLimit={true}
            minTime={popupCreateRequest.timeCapacity || 1}
            maxTime={1000}
            onChange={e =>
              updatePopupField("totalCapacity", Number(e.target.value))
            }
            data-testid="popup-create-total-capacity"
          />
        </div>

        {/* 주소 관련 입력 */}
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
            data-testid="popup-create-detail-address"
          />
        </div>
      </div>
    </div>
  );
}
