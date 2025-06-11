import DashBoardCustomerTransaction from "@/pages/dashboardPage/views/DashBoardCustomerTransaction";
import DashBoardReservation from "@/pages/dashboardPage/views/DashBoardReservation";
import DashBoardConversionRate from "@/pages/dashboardPage/views/DashBoardConversionRate";
import DashBoardVisitor from "@/pages/dashboardPage/views/DashBoardVisitor";
import DashBoardQuestionnaire from "@/pages/dashboardPage/views/DashBoardQuestionnaire";
import BestItem from "@/pages/dashboardPage/views/bestItem";
import Congestion from "@/pages/dashboardPage/views/congestion";

const DashBoardPage = () => {
  return (
    <div className="w-[1360px] mx-auto flex flex-col gap-[70px] pt-[50px] pb-[86px]">
      <BestItem />
      <div className="flex w-[1360px] justify-between">
        <Congestion />
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
};

export default DashBoardPage;
