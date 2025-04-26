import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";
import DottedAreaChart from "@/pages/dashboard/views/DottedAreaChart";
import { useState } from "react";

const days = ["월", "화", "수", "목", "금", "토", "일"];

export default function Congestion() {
  const [selectedDay, setSelectedDay] = useState("월");

  return (
    <div className="flex flex-col">
      <DashBoardTitle title="혼잡도 분석" />
      <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6">
        {/* 요일 버튼 */}
        <div className="mt-5 flex justify-center gap-6 mb-4">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`cursor-pointer w-[54px] h-[54px] text-gray09 rounded-full flex items-center justify-center font-medium text-[24px]
                ${selectedDay === day && "bg-white border-mint07 border-2 rounded-full"}
              `}
            >
              {day}
            </button>
          ))}
        </div>

        {/* 혼잡도 그래프 */}
        <div className="absolute bottom-6 w-[612px] h-[394px] bg-gray01 rounded-[40px] flex justify-center">
          <DottedAreaChart selectedDay={selectedDay} />
        </div>
      </div>
    </div>
  );
}
