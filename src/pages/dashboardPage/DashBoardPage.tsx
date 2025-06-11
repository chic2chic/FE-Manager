import DashBoardCongestion from "@/pages/dashboardPage/views/DashBoardCongestion";
import DashBoardCustomerTransaction from "@/pages/dashboardPage/views/DashBoardCustomerTransaction";
import DashBoardReservation from "@/pages/dashboardPage/views/DashBoardReservation";
import DashBoardConversionRate from "@/pages/dashboardPage/views/DashBoardConversionRate";
import BestProduct from "@/pages/dashboardPage/views/BestItem";
import DashBoardVisitor from "@/pages/dashboardPage/views/DashBoardVisitor";
import DashBoardQuestionnaire from "@/pages/dashboardPage/views/DashBoardQuestionnaire";

export default function DashBoardPage() {
  return (
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px] pt-[50px] pb-[86px]">
      <BestProduct />
      <div className="flex w-[1360px] justify-between">
        <DashBoardCongestion />
        <DashBoardVisitor />
      </div>
      <div className="flex w-[1360px] justify-between">
        <DashBoardReservation />
        <DashBoardCustomerTransaction />
      </div>
      <DashBoardQuestionnaire />
      <DashBoardConversionRate />
    </div>
  );
}
