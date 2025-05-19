import { useAvgPurchaseApi } from "@/hooks/api/useDashboardApi";
import { CountCard } from "@/pages/dashboardPage/views/CountCard";
import DashBoardTitle from "@/pages/dashboardPage/views/DashBoardTitle";

export default function DashBoardCustomerTransaction() {
  const { data } = useAvgPurchaseApi();

  return (
    <div className="w-[414px] flex-col">
      <DashBoardTitle title="1인 평균 구매액" />
      <div className="flex h-[394px] flex-col justify-between">
        {data && (
          <>
            <CountCard
              title="팝업 기간 내"
              bgCSS="bg-mint02"
              value={data.totalPrice}
              valueCSS="text-mint08 text-[56px]"
              unit="원"
              unitCSS="text-mint08 text-[40px]"
            />
            <CountCard
              title="TODAY"
              bgCSS="bg-blue02"
              value={data.todayPrice}
              valueCSS="text-blue07 text-[56px]"
              unit="원"
              unitCSS="text-blue07 text-[40px]"
            />
          </>
        )}
      </div>
    </div>
  );
}
