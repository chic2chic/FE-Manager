import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";
import ReservationByDay from "@/pages/dashboard/views/ReservationByDay";
import checkCalendar from "@/assets/webps/dashboard/check-calendar.webp";

type Props = {
  title: string;
  value: number;
  bgColor: string;
  textColor: string;
};

// 예약자 수, 입장자 수 count card
function CountCard({ title, value, bgColor, textColor }: Props) {
  return (
    <div
      className={`${bgColor} rounded-[40px] w-[314px] h-[180px] flex flex-col justify-center items-center`}
    >
      <p className="text-[24px] text-gray10 font-semibold leading-[29px] mb-2">
        {title}
      </p>
      <p
        className={`text-[64px] ${textColor} font-regular tracking-[-1.8px] leading-[74px]`}
      >
        {value}
      </p>
    </div>
  );
}

export default function DashBoardReservation() {
  return (
    <div className="flex flex-col">
      <DashBoardTitle title="예약 분석" />
      <div className="w-[1360px] h-[394px] flex gap-10">
        <div className="w-[314px] flex flex-col justify-between">
          <CountCard
            title="예약자 수"
            value={240}
            bgColor="bg-purple02"
            textColor="text-purple07"
          />
          <CountCard
            title="입장자 수"
            value={180}
            bgColor="bg-blue02"
            textColor="text-blue08"
          />
        </div>
        <div className="flex flex-col justify-between w-[552px] h-[394px] bg-gray02 rounded-[50px] px-[30px] pt-[22px] pb-[30px]">
          <div className="flex ml-[92px] gap-[10px] items-center left-[122px] top-[22px]">
            <img
              src={checkCalendar}
              alt="check calendar"
              width={60}
              height={60}
            />
            <span className="font-[500] text-gray10 text-[30px]">
              요일별 예약자 수
            </span>
          </div>
          <ReservationByDay />
        </div>
      </div>
    </div>
  );
}
