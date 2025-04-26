import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";
import DottedAreaChart from "@/pages/dashboard/views/DottedAreaChart";

export default function Congestion() {
  return (
    <div className="flex flex-col">
      <DashBoardTitle title="혼잡도 분석" />
      <div className="relative w-[660px] h-[510px] bg-gray02 rounded-[50px] px-6">
        <div className="absolute bottom-6 w-[612px] h-[394px] bg-gray01 rounded-[40px] flex justify-center">
          <DottedAreaChart />
        </div>
      </div>
    </div>
  );
}
