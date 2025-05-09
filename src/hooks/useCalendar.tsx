import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  subDays,
} from "date-fns";
import CalenderImg from "@/assets/webps/common/calender.webp";
import RightArrowImg from "@/assets/webps/common/right-arrow-gray09.webp";

export default function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (cloneDay: Date) => {
    setSelectedDate(cloneDay);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const header = () => {
    return (
      <div className="flex justify-between items-center mb-4 text-gray09">
        <button
          className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full transition-colors"
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        >
          <img
            src={RightArrowImg}
            className="rotate-180"
            width={16}
            height={16}
          />
        </button>
        <div className="font-medium">{format(currentDate, "yyyy년 MM월")}</div>
        <button
          className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-full transition-colors"
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        >
          <img src={RightArrowImg} width={16} height={16} />
        </button>
      </div>
    );
  };

  const daysOfWeek = () => {
    const days = [];
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className={`font-semibold text-center py-2 text-[15px] text-gray09`}
        >
          {weekDays[i]}
        </div>,
      );
    }

    return <div className="grid grid-cols-7 mb-1">{days}</div>;
  };

  const cells = (customStartDate?: Date, customEndDate?: Date) => {
    const startDateLimit = customStartDate ? subDays(customStartDate, 1) : null;
    const endDateLimit = customEndDate || null;

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDay = startOfWeek(monthStart);
    const endDay = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDay;

    while (day <= endDay) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        // startDate와 endDate 모두 체크
        const isBeforeStartDate = startDateLimit
          ? day <= startDateLimit
          : false;
        const isAfterEndDate = endDateLimit ? day > endDateLimit : false;
        const isDisabled = isBeforeStartDate || isAfterEndDate;

        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day.toString()}
            className={`
              w-8 h-8 mx-auto flex items-center justify-center text-[14px] font-medium rounded-full
              ${!isDisabled ? "cursor-pointer hover:bg-mint03 transition" : "cursor-default"}
              ${!isCurrentMonth ? "text-gray05" : "text-gray09"}
              ${isSelected ? "bg-mint05 text-gray10 font-semibold" : ""}
              ${isToday && !isSelected ? "border border-mint07" : ""}
              ${isDisabled ? "opacity-40" : ""}
            `}
            onClick={() => !isDisabled && handleClick(cloneDay)}
          >
            {format(day, "d")}
          </div>,
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1 mb-1">
          {days}
        </div>,
      );
      days = [];
    }

    return <div className="p-1">{rows}</div>;
  };

  const foldCalender = () => {
    return (
      <div
        onClick={() => setIsOpen(true)}
        className="flex gap-[12px] rounded-full border border-gray05 px-[24px] py-[14px] items-center justify-centetransition-colors cursor-pointer"
      >
        <span className="text-gray09">
          {selectedDate
            ? `${selectedDate.getFullYear()} . ${selectedDate.getMonth() + 1} . ${selectedDate.getDate()}`
            : "날짜를 선택해주세요"}
        </span>
        <img src={CalenderImg} width={16} height={16} />
      </div>
    );
  };

  const calender = ({
    cssOption,
    startDate,
    endDate,
  }: {
    cssOption?: string;
    startDate?: Date;
    endDate?: Date;
  }) => {
    return (
      <div
        className={`p-4 border border-gray05 rounded-lg shadow-lg bg-white w-[350px] ${cssOption}`}
      >
        {header()}
        {daysOfWeek()}
        {cells(startDate, endDate)}
      </div>
    );
  };
  return {
    isOpen,
    selectedDate,
    setSelectedDate,
    setIsOpen,
    foldCalender,
    calender,
    handleClose,
  };
}
