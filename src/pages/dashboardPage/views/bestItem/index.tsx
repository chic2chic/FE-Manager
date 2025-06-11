import { useBestItemsApi } from "@/hooks/api/useDashboardApi";
import Skeleton from "@/components/ui/Skeleton";
import QueryComponent from "@/components/common/QueryComponent";
import NoDataComp from "@/pages/dashboardPage/views/@common/NoDataComp";
import BestItemCard from "@/pages/dashboardPage/views/bestItem/BestItemCard";
import Title from "@/pages/dashboardPage/views/@common/Title";

const BestItem = () => {
  const { data: bestItemData, isLoading, isError } = useBestItemsApi();

  return (
    <div data-testid="dashboard-bestItems">
      {/* Title */}
      <div className="flex items-start gap-6">
        <Title title="실시간 인기상품" />
      </div>

      {/* Top 3 카드 */}
      <QueryComponent
        data={bestItemData}
        isLoading={isLoading}
        isError={isError}
        loadingFallback={
          <div className="flex justify-center gap-[60px] mt-2">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="w-[400px] h-[512px] rounded-[50px] overflow-hidden"
              >
                <Skeleton />
              </div>
            ))}
          </div>
        }
        emptyFallback={
          <div className="flex justify-center gap-[60px] mt-2 h-[512px] bg-gray02 rounded-[50px]">
            <NoDataComp />
          </div>
        }
      >
        {data => (
          <div className="flex justify-center gap-[60px] mt-2">
            {data.map((item, index) => (
              <BestItemCard key={item.itemId} item={item} index={index} />
            ))}
          </div>
        )}
      </QueryComponent>
    </div>
  );
};

export default BestItem;
