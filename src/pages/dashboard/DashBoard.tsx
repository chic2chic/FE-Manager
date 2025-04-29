import DashBoardCongestion from "@/pages/dashboard/views/DashBoardCongestion";
import DashBoardCustomerTransaction from "@/pages/dashboard/views/DashBoardCustomerTransaction";
import DashBoardReservation from "@/pages/dashboard/views/DashBoardReservation";

export default function DashBoard() {
  return (
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px] pt-[50px] pb-[86px]">
      <DashBoardCongestion />
      <div className="flex gap-10">
        <DashBoardReservation />
        <DashBoardCustomerTransaction />
      </div>
    </div>
  );
}
