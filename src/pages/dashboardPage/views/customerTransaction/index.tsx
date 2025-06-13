import { useAvgPurchaseApi } from "@/hooks/api/useDashboardApi";
import CountCard from "@/pages/dashboardPage/views/@common/CountCard";
import Title from "@/pages/dashboardPage/views/@common/Title";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import Skeleton from "@/components/ui/Skeleton";
import QueryComponent from "@/components/common/QueryComponent";

const CustomerTransaction = () => {
  const { data, isLoading, isError } = useAvgPurchaseApi();

  const cardConfigs = [
    {
      key: "total",
      title: "팝업 기간 내",
      value: data?.totalAverageAmount,
      bgCSS: "bg-mint02",
      valueCSS: "text-mint08 text-[56px]",
      unitCSS: "text-mint08 text-[40px]",
    },
    {
      key: "today",
      title: "TODAY",
      value: data?.todayAverageAmount,
      bgCSS: "bg-blue02",
      valueCSS: "text-blue07 text-[56px]",
      unitCSS: "text-blue07 text-[40px]",
    },
  ];

  return (
    <div className="w-[414px] flex-col" data-testid="dashboard-transaction">
      <Title title="1인 평균 구매액" />
      <div className="flex h-[394px] flex-col justify-between">
        {cardConfigs.map(config => (
          <QueryComponent
            key={config.key}
            data={config.value}
            isLoading={isLoading}
            isError={isError}
            loadingFallback={<Skeleton height="h-[180px]" />}
            emptyFallback={<NoDataComp height="h-[180px]" />}
          >
            {value => (
              <CountCard
                title={config.title}
                bgCSS={config.bgCSS}
                value={value}
                valueCSS={config.valueCSS}
                unit="원"
                unitCSS={config.unitCSS}
              />
            )}
          </QueryComponent>
        ))}
      </div>
    </div>
  );
};

export default CustomerTransaction;
