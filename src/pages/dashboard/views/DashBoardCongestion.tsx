import { useState } from "react";
import { Days } from "@/constants/dashboard/Days";
import { formatDay } from "@/utils/FormatDay";
import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";
import DottedAreaChart from "@/pages/dashboard/views/DottedAreaChart";
import { CongestionDatas } from "@/mocks/handlers/dashboard/ConjestionDatas";

export default function DashBoardCongestion() {
  const today = new Date().getDay(); // 0(일) - 6(토)
  const [selectedDay, setSelectedDay] = useState(Days[today - 1]); // default: 오늘 요일이 기본으로 보임.

  return (
    <div className="flex flex-col">
      <DashBoardTitle title="혼잡도 분석" />
      <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6">
        {/* 요일 버튼 */}
        <div className="mt-5 flex justify-center gap-6 mb-4">
          {Days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`cursor-pointer w-[54px] h-[54px] text-gray09 rounded-full flex items-center justify-center font-medium text-[24px]
                ${selectedDay === day && "bg-white border-mint07 border-2 rounded-full"}
              `}
            >
              {formatDay(day)}
            </button>
          ))}
        </div>

        {/* 혼잡도 그래프 */}
        <div className="absolute bottom-6 w-[612px] h-[394px] bg-gray01 rounded-[40px] flex justify-center">
          <DottedAreaChart dayData={CongestionDatas[selectedDay]} />
        </div>
      </div>
    </div>
  );
}
