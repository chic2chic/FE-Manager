import DashBoardCongestion from "@/pages/dashboard/views/DashBoardCongestion";
import DashBoardVisitor from "@/pages/dashboard/views/DashBoardVisitor";

export default function DashBoard() {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px] pt-[50px] pb-[86px]">
=======
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px]">
>>>>>>> 252774d ([LCR-56] fix: 수정)
=======
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px] pt-[50px] pb-[86px]">
>>>>>>> b3739d8 ([LCR-60] fix: 대시보드 이번주 인기상품 UI 필터,드롭다운 분리)
      <div className="flex gap-[70px]">
        <DashBoardCongestion />
        <DashBoardVisitor />
      </div>
    </div>
  );
}