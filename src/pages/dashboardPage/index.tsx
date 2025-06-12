import DashBoardCustomerTransaction from "@/pages/dashboardPage/views/DashBoardCustomerTransaction";
import DashBoardReservation from "@/pages/dashboardPage/views/DashBoardReservation";
import DashBoardConversionRate from "@/pages/dashboardPage/views/DashBoardConversionRate";
import DashBoardQuestionnaire from "@/pages/dashboardPage/views/DashBoardQuestionnaire";
import BestItem from "@/pages/dashboardPage/views/bestItem";
import Congestion from "@/pages/dashboardPage/views/congestion";
import Visitor from "@/pages/dashboardPage/views/visitor";

const DashBoardPage = () => {
  return (
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px] pt-[50px] pb-[86px]">
      <BestItem />
      <div className="flex w-[1360px] justify-between">
        <Congestion />
        <Visitor />
      </div>
      <div className="flex w-[1360px] justify-between">
        <DashBoardReservation />
        <DashBoardCustomerTransaction />
      </div>
      <DashBoardQuestionnaire />
      <DashBoardConversionRate />
    </div>
  );
};

export default DashBoardPage;
