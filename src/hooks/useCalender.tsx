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

export default function useCalender() {
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
      <div className="flex justify-between items-center mb-4 text-gray-600">
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-mint01 rounded-full transition-colors"
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
          className="w-8 h-8 flex items-center justify-center hover:bg-mint01 rounded-full transition-colors"
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
          className={`font-medium text-center py-2 text-sm ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-gray-500"}`}
        >
          {weekDays[i]}
        </div>,
      );
    }

    return <div className="grid grid-cols-7 mb-1">{days}</div>;
  };

  const cells = (customStartDate?: Date) => {
    const dateLimit = customStartDate ? subDays(customStartDate, 1) : null;
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
        const isDisabled = dateLimit ? day <= dateLimit : false;
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day.toString()}
            className={`
              w-8 h-8 mx-auto flex items-center justify-center text-sm rounded-full
              ${!isDisabled ? "cursor-pointer hover:bg-mint02" : "cursor-not-allowed"}
              ${!isCurrentMonth ? "text-gray-300" : i === 0 ? "text-red-300" : i === 6 ? "text-blue-300" : "text-gray-600"}
              ${isSelected ? "bg-mint07 text-white" : ""}
              ${isToday && !isSelected ? "border border-mint05" : ""}
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
        <span className="text-gray-700">
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
  }: {
    cssOption?: string;
    startDate?: Date;
  }) => {
    return (
      <div
        className={`p-4 border border-gray05 rounded-lg shadow-lg bg-white ${cssOption}`}
      >
        <p
          className="text-end w-full cursor-pointer text-gray-500 hover:text-gray-700 mb-2"
          onClick={() => setIsOpen(false)}
        >
          X
        </p>
        {header()}
        <div className="border-t border-gray05 pt-2">
          {daysOfWeek()}
          {cells(startDate)}
        </div>
      </div>
    );
  };
  return {
    isOpen,
    selectedDate,
    setIsOpen,
    foldCalender,
    calender,
    handleClose,
  };
}
