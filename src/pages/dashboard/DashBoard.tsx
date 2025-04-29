import DashBoardCongestion from "@/pages/dashboard/views/DashBoardCongestion";
import DashBoardVisitorAnalysis from "./views/DashBoardVisitor";

export default function DashBoard() {
  return (
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px]">
      <div className="flex gap-[70px]">
        <DashBoardCongestion />
        <DashBoardVisitorAnalysis />
      </div>
    </div>
  );
}
