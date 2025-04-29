import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";
import ReservationByDay from "@/pages/dashboard/views/ReservationByDay";
import checkCalendar from "@/assets/webps/dashboard/check-calendar.webp";
import { TodayReservationDatas } from "@/mocks/handlers/dashboard/ReservationDatas";
import { CountCard } from "@/pages/dashboard/views/CountCard";

export default function DashBoardReservation() {
  return (
    <div className="w-[906px] flex-col">
      <DashBoardTitle title="예약 분석" />
      <div className="w-[1360px] h-[394px] flex gap-10">
        <div className="w-[314px] flex flex-col justify-between">
          <CountCard
            title="예약자 수"
            bgCSS="bg-main01"
            value={TodayReservationDatas.reservedCount.toLocaleString()}
            valueCSS="text-main04 text-[64px]"
            unit="명"
            unitCSS="text-main04 text-[40px]"
          />
          <CountCard
            title="입장자 수"
            bgCSS="bg-purple02"
            value={TodayReservationDatas.enteredCount.toLocaleString()}
            valueCSS="text-purple06 text-[64px]"
            unit="명"
            unitCSS="text-purple06 text-[40px]"
          />
        </div>

        {/* 요일별 예약자 수 */}
        <div className="flex flex-col justify-between w-[552px] h-[394px] bg-gray02 rounded-[50px] px-[30px] pt-[22px] pb-[30px]">
          <div className="flex ml-[92px] gap-[10px] items-center left-[122px] top-[22px]">
            <img
              src={checkCalendar}
              alt="check calendar"
              width={60}
              height={60}
            />
            <span className="font-[500] text-gray10 text-[30px]">
              요일별 예약자 수
            </span>
          </div>
          <ReservationByDay />
        </div>
      </div>
    </div>
  );
}
