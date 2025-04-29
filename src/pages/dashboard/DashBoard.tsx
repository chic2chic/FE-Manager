import DashBoardCongestion from "@/pages/dashboard/views/DashBoardCongestion";
import DashBoardVisitor from "@/pages/dashboard/views/DashBoardVisitor";

export default function DashBoard() {
  return (
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px] pt-[50px] pb-[86px]">
      <div className="flex gap-[70px]">
        <DashBoardCongestion />
        <DashBoardVisitor />
      </div>
    </div>
  );
}