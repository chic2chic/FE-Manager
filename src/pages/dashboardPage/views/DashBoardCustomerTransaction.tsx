import { useAvgPurchaseApi } from "@/hooks/api/useDashboardApi";
import { CountCard } from "@/pages/dashboardPage/views/CountCard";
import DashBoardTitle from "@/pages/dashboardPage/views/DashBoardTitle";
import NoDataComp from "@/components/common/NoDataComp";
import Skeleton from "@/components/common/Skeleton";
import QueryComponent from "@/components/common/QueryComponent";

export default function DashBoardCustomerTransaction() {
  const { data, isLoading, isError } = useAvgPurchaseApi();

  return (
    <div className="w-[414px] flex-col" data-testid="dashboard-transaction">
      <DashBoardTitle title="1인 평균 구매액" />
      <div className="flex h-[394px] flex-col justify-between">
        {/* 팝업 기간 내 */}
        <QueryComponent
          data={data?.totalAverageAmount}
          isLoading={isLoading}
          isError={isError}
          loadingFallback={
            <div className="h-[180px] rounded-[40px] bg-gray02 flex justify-center items-center overflow-hidden">
              <Skeleton />
            </div>
          }
          emptyFallback={
            <div className="h-[180px] rounded-[40px] bg-gray02 flex justify-center items-center">
              <NoDataComp />
            </div>
          }
        >
          {amount => (
            <CountCard
              title="팝업 기간 내"
              bgCSS="bg-mint02"
              value={amount}
              valueCSS="text-mint08 text-[56px]"
              unit="원"
              unitCSS="text-mint08 text-[40px]"
            />
          )}
        </QueryComponent>

        {/* TODAY */}
        <QueryComponent
          data={data?.todayAverageAmount}
          isLoading={isLoading}
          isError={isError}
          loadingFallback={
            <div className="h-[180px] rounded-[40px] bg-gray02 flex justify-center items-center overflow-hidden">
              <Skeleton />
            </div>
          }
          emptyFallback={
            <div className="h-[180px] rounded-[40px] bg-gray02 flex justify-center items-center">
              <NoDataComp />
            </div>
          }
        >
          {amount => (
            <CountCard
              title="TODAY"
              bgCSS="bg-blue02"
              value={amount}
              valueCSS="text-blue07 text-[56px]"
              unit="원"
              unitCSS="text-blue07 text-[40px]"
            />
          )}
        </QueryComponent>
      </div>
    </div>
  );
}
