import DashBoardCongestion from "@/pages/dashboard/views/DashBoardCongestion";
import DashBoardReservation from "@/pages/dashboard/views/DashBoardReservation";

export default function DashBoard() {
  return (
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px] pt-[50px] pb-[86px]">
      <DashBoardCongestion />
      <DashBoardReservation />
    </div>
  );
}
