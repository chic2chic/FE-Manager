import DashBoardTitle from "@/pages/dashboardPage/views/DashBoardTitle";
import checkCalendar from "@/assets/webps/dashboard/check-calendar.webp";
import { CountCard } from "@/pages/dashboardPage/views/CountCard";
import ReservationByDayChart from "@/pages/dashboardPage/views/ReservationByDayChart";
import {
  useTodayEntrantsApi,
  useTodayReservationsApi,
} from "@/hooks/api/useDashboardApi";
import NoDataCompt from "@/components/common/NoDataComp";

export default function DashBoardReservation() {
  const { data: entrantsData } = useTodayEntrantsApi();
  const { data: reservationsData } = useTodayReservationsApi();

  console.log(reservationsData);

  return (
    <div className="w-[906px] flex-col">
      <DashBoardTitle title="예약 분석" />
      {entrantsData && reservationsData && (
        <div className="w-[1360px] h-[394px] flex gap-10">
          <div className="w-[314px] flex flex-col justify-between">
            <CountCard
              title="예약자 수"
              bgCSS="bg-main01"
              value={reservationsData.reservedCount}
              valueCSS="text-main04 text-[64px]"
              unit="명"
              unitCSS="text-main04 text-[40px]"
            />
            <CountCard
              title="입장자 수"
              bgCSS="bg-purple02"
              value={entrantsData.entrantCount}
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
            {reservationsData && reservationsData.chart.length > 0 ? (
              <ReservationByDayChart data={reservationsData.chart} />
            ) : (
              <div className="w-[552px] h-[394px] -translate-x-6 pt-[22px] pb-[30px]">
                <NoDataCompt />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
