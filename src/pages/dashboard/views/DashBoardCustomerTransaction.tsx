import { CustomerTransactionDatas } from "@/mocks/handlers/dashboard/CustomerTransactionDatas";
import { CountCard } from "@/pages/dashboard/views/CountCard";
import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";

export default function DashBoardCustomerTransaction() {
  return (
    <div className="w-[414px] flex-col">
      <DashBoardTitle title="1인 평균 구매액" />
      <div className="flex h-[394px] flex-col justify-between">
        <CountCard
          title="팝업 기간 내"
          bgCSS="bg-mint02"
          value={CustomerTransactionDatas.totalPrice.toLocaleString()}
          valueCSS="text-mint08 text-[56px]"
          unit="원"
          unitCSS="text-mint08 text-[40px]"
        />
        <CountCard
          title="TODAY"
          bgCSS="bg-blue02"
          value={CustomerTransactionDatas.todayPrice.toLocaleString()}
          valueCSS="text-blue07 text-[56px]"
          unit="원"
          unitCSS="text-blue07 text-[40px]"
        />
      </div>
    </div>
  );
}
