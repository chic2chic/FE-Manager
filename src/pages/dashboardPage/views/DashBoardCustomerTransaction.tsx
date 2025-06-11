import { useAvgPurchaseApi } from "@/hooks/api/useDashboardApi";
import { CountCard } from "@/pages/dashboardPage/views/CountCard";
import DashBoardTitle from "@/pages/dashboardPage/views/DashBoardTitle";
import NoDataCompt from "@/components/common/NoDataComp";

export default function DashBoardCustomerTransaction() {
  const { data } = useAvgPurchaseApi();

  return (
    <div className="w-[414px] flex-col" data-testid="dashboard-transaction">
      <DashBoardTitle title="1인 평균 구매액" />
      <div className="flex h-[394px] flex-col justify-between">
        {data ? (
          <>
            <CountCard
              title="팝업 기간 내"
              bgCSS="bg-mint02"
              value={data.totalAverageAmount}
              valueCSS="text-mint08 text-[56px]"
              unit="원"
              unitCSS="text-mint08 text-[40px]"
            />
            <CountCard
              title="TODAY"
              bgCSS="bg-blue02"
              value={data.todayAverageAmount}
              valueCSS="text-blue07 text-[56px]"
              unit="원"
              unitCSS="text-blue07 text-[40px]"
            />
          </>
        ) : (
          <div className="flex justify-center h-[394px] bg-gray02 rounded-[50px]">
            <NoDataCompt />
          </div>
        )}
      </div>
    </div>
  );
}
