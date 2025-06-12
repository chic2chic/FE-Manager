import Title from "@/pages/dashboardPage/views/@common/Title";
import checkCalendar from "@/assets/webps/dashboard/check-calendar.webp";
import ReservationByDayChart from "@/pages/dashboardPage/views/ReservationByDayChart";
import {
  useTodayEntrantsApi,
  useTodayReservationsApi,
} from "@/hooks/api/useDashboardApi";
import Skeleton from "@/components/ui/Skeleton";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import QueryComponent from "@/components/common/QueryComponent";
import CountCard from "@/pages/dashboardPage/views/@common/CountCard";

export default function DashBoardReservation() {
  const entrants = useTodayEntrantsApi();
  const reservations = useTodayReservationsApi();

  return (
    <div className="w-[906px] flex-col" data-testid="dashboard-reservation">
      <Title title="예약 분석" />
      <div className="w-[906px] h-[394px] flex justify-between">
        {/* CountCard 2개 */}
        <div className="w-[314px] flex flex-col justify-between">
          {/* 예약자 수 */}
          <QueryComponent
            data={reservations.data}
            isLoading={reservations.isLoading}
            isError={reservations.isError}
            loadingFallback={
              <div className="rounded-[40px] w-[314px] h-[180px] flex justify-center items-center overflow-hidden">
                <Skeleton />
              </div>
            }
            emptyFallback={
              <div className="bg-gray02 rounded-[40px] w-[314px] h-[180px] flex justify-center items-center">
                <NoDataComp />
              </div>
            }
          >
            {data => (
              <CountCard
                title="예약자 수"
                bgCSS="bg-main01"
                value={data.reservedCount}
                valueCSS="text-main04 text-[64px]"
                unit="명"
                unitCSS="text-main04 text-[40px]"
              />
            )}
          </QueryComponent>

          {/* 입장자 수 */}
          <QueryComponent
            data={entrants.data}
            isLoading={entrants.isLoading}
            isError={entrants.isError}
            loadingFallback={
              <div className="rounded-[40px] w-[314px] h-[180px] flex justify-center items-center overflow-hidden">
                <Skeleton />
              </div>
            }
            emptyFallback={
              <div className="bg-gray02 rounded-[40px] w-[314px] h-[180px] flex justify-center items-center">
                <NoDataComp />
              </div>
            }
          >
            {data => (
              <CountCard
                title="입장자 수"
                bgCSS="bg-purple02"
                value={data.entrantCount}
                valueCSS="text-purple06 text-[64px]"
                unit="명"
                unitCSS="text-purple06 text-[40px]"
              />
            )}
          </QueryComponent>
        </div>

        {/* 요일별 예약자 수 */}
        <div className="flex flex-col justify-between w-[552px] h-[394px] bg-gray02 rounded-[50px] px-[30px] pt-[22px] pb-[30px]">
          <div className="flex ml-[92px] gap-[10px] items-center">
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

          <QueryComponent
            data={reservations.data?.chart ?? []}
            isLoading={reservations.isLoading}
            isError={reservations.isError}
            loadingFallback={
              <div className="w-full h-full rounded-[20px] flex justify-center items-center overflow-hidden">
                <Skeleton />
              </div>
            }
            emptyFallback={
              <div className="w-full h-full flex justify-center items-center">
                <NoDataComp />
              </div>
            }
          >
            {chartData => <ReservationByDayChart data={chartData} />}
          </QueryComponent>
        </div>
      </div>
    </div>
  );
}
