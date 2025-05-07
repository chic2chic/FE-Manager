import {
  LowConversionDatas,
  TopConversionDatas,
} from "@/mocks/handlers/dashboard/ConversionRateDatas";
import { ConversionRateChart } from "@/pages/dashboard/views/ConversionRateChart";
import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";

export default function DashBoardConversionRate() {
  return (
    <div className="flex flex-col">
      <DashBoardTitle title="구매전환율" />
      <div className="flex justify-between">
        <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6 flex justify-center">
          <div className="mt-7 flex text-gray09 font-medium text-[28px]">
            하위 상품 TOP 6
          </div>
          <div className="absolute bottom-6 w-[612px] h-[394px] bg-gray01 rounded-[40px] flex justify-center">
            <ConversionRateChart
              data={LowConversionDatas}
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
          </div>
        </div>
        <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6 flex justify-center">
          <div className="mt-7 flex text-gray09 font-medium text-[28px]">
            상위 상품 TOP 6
          </div>
          <div className="absolute bottom-6 w-[612px] h-[394px] bg-gray01 rounded-[40px] flex justify-center">
            <ConversionRateChart
              data={TopConversionDatas}
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
          </div>
        </div>
      </div>
    </div>
  );
}
