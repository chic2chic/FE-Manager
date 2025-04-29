import DashBoardCongestion from "@/pages/dashboard/views/DashBoardCongestion";
import DashBoardVisitorAnalysis from "./views/DashBoardVisitor";

export default function DashBoard() {
  return (
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px]">
      {/* (선택) 다른 섹션이 있다면 여기 */}

      {/*  이 wrapper가 flex-row 역할을 합니다.  */}
      <div className="flex gap-[70px]">
        <DashBoardCongestion />
        <DashBoardVisitorAnalysis />
      </div>
    </div>
  );
}
