import NoDataComp from "@/components/common/NoDataComp";
import { useConversionApi } from "@/hooks/api/useDashboardApi";
import { ConversionRateChart } from "@/pages/dashboardPage/views/ConversionRateChart";
import DashBoardTitle from "@/pages/dashboardPage/views/DashBoardTitle";

export default function DashBoardConversionRate() {
  const { data } = useConversionApi();
  const isLowDataExist = data && data.low.length > 0;
  const isHighDataExist = data && data.high.length > 0;

  return (
    <div className="flex flex-col" data-testid="dashboard-conversionRate">
      <DashBoardTitle title="구매전환율" />
      <div className="flex justify-between">
        <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6 flex justify-center">
          <div className="mt-7 flex text-gray09 font-medium text-[28px]">
            하위 상품 TOP 6
          </div>
          <div
            className={`absolute bottom-6 w-[612px] h-[394px] ${isLowDataExist ? "bg-gray01" : ""} rounded-[40px] flex justify-center`}
          >
            {isLowDataExist ? (
              <ConversionRateChart
                data={data.low}
                barColor="#FFDCEA"
                lineColor="#9F9FF8"
                tooltipColorClass={{
                  interested: "text-purple07",
                  purchased: "text-main03",
                  rate: "text-blue07",
                }}
                legendColors={{
                  interested: "#9F9FF8",
                  purchased: "#FFB4D1",
                }}
              />
            ) : (
              <div className="absolute bottom-6 w-[612px] h-[394px]">
                <NoDataComp />
              </div>
            )}
          </div>
        </div>
        <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6 flex justify-center">
          <div className="mt-7 flex text-gray09 font-medium text-[28px]">
            상위 상품 TOP 6
          </div>
          <div
            className={`absolute bottom-6 w-[612px] h-[394px] ${isHighDataExist ? "bg-gray01" : ""} rounded-[40px] flex justify-center`}
          >
            {isHighDataExist ? (
              <ConversionRateChart
                data={data.high}
                barColor="#C5EFE8"
                lineColor="#78B0FF"
                tooltipColorClass={{
                  interested: "text-blue07",
                  purchased: "text-mint07",
                  rate: "text-main04",
                }}
                legendColors={{
                  interested: "#78B0FF",
                  purchased: "#C5EFE8",
                }}
              />
            ) : (
              <div className="absolute bottom-6 w-[612px] h-[394px]">
                <NoDataComp />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
