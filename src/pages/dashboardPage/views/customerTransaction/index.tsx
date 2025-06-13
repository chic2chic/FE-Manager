import { useAvgPurchaseApi } from "@/hooks/api/useDashboardApi";
import CountCard from "@/pages/dashboardPage/views/@common/CountCard";
import Title from "@/pages/dashboardPage/views/@common/Title";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import Skeleton from "@/components/ui/Skeleton";
import QueryComponent from "@/components/common/QueryComponent";

const CustomerTransaction = () => {
  const { data, isLoading, isError } = useAvgPurchaseApi();

  return (
    <div className="w-[414px] flex-col" data-testid="dashboard-transaction">
      <Title title="1인 평균 구매액" />
      <div className="flex h-[394px] flex-col justify-between">
        {/* 팝업 기간 내 */}
        <QueryComponent
          data={data?.totalAverageAmount}
          isLoading={isLoading}
          isError={isError}
          loadingFallback={<Skeleton height="h-[180px]" />}
          emptyFallback={<NoDataComp height="h-[180px]" />}
        >
          {data => (
            <CountCard
              title="팝업 기간 내"
              bgCSS="bg-mint02"
              value={data}
              valueCSS="text-mint08 text-[56px]"
              unit="원"
              unitCSS="text-mint08 text-[40px]"
            />
          )}
        </QueryComponent>

        {/* TODAY */}
        <QueryComponent
          data={data?.totalAverageAmount}
          isLoading={isLoading}
          isError={isError}
          loadingFallback={<Skeleton height="h-[180px]" />}
          emptyFallback={<NoDataComp height="h-[180px]" />}
        >
          {data => (
            <CountCard
              title="TODAY"
              bgCSS="bg-blue02"
              value={data}
              valueCSS="text-blue07 text-[56px]"
              unit="원"
              unitCSS="text-blue07 text-[40px]"
            />
          )}
        </QueryComponent>
      </div>
    </div>
  );
};

export default CustomerTransaction;
