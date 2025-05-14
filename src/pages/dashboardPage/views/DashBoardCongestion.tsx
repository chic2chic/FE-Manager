import { useEffect, useState } from "react";
import { Days } from "@/constants/dashboard/Days";
import { FormatDay } from "@/utils/FormatDay";
import DashBoardTitle from "@/pages/dashboardPage/views/DashBoardTitle";
import CongestionChart from "@/pages/dashboardPage/views/CongestionChart";
import { useCongestionApi } from "@/hooks/api/useDashboardApi";
import { DayOfWeek } from "@/types/CongestionType";
import NoDataCompt from "@/components/common/NoDataComp";

export default function DashBoardCongestion() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(Days[0]);
  const { data, isLoading } = useCongestionApi();

  useEffect(() => {
    if (data && !selectedDay) {
      const today = new Date().getDay();
      setSelectedDay(Days[today === 0 ? 6 : today - 1]);
    }
  }, [data, selectedDay]);

  const dayData = selectedDay && data ? data[selectedDay] || [] : [];

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
              {FormatDay(day)}
            </button>
          ))}
        </div>
        {data && dayData.length > 0 ? (
          <div className="absolute bottom-6 w-[612px] h-[394px] bg-gray01 rounded-[40px] flex justify-center">
            {isLoading || !selectedDay ? (
              <span className="text-gray06 text-[18px]">로딩 중...</span>
            ) : (
              <CongestionChart dayData={data?.[selectedDay] ?? []} />
            )}
          </div>
        ) : (
          <div className="flex justify-center absolute bottom-6 w-[612px] h-[394px]">
            <NoDataCompt />
          </div>
        )}
        {/* 혼잡도 그래프 */}
      </div>
    </div>
  );
}
