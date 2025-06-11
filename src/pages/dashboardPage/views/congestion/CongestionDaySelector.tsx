import { Days } from "@/constants/dashboard/Days";
import { FormatDay } from "@/utils/FormatDay";
import { DayOfWeek } from "@/types/CongestionType";

type Props = {
  selectedDay: DayOfWeek;
  onChange: (_day: DayOfWeek) => void;
};

const CongestionDaySelector = ({ selectedDay, onChange }: Props) => {
  return (
    <div className="mt-5 flex justify-center gap-6 mb-4">
      {Days.map(day => (
        <button
          key={day}
          onClick={() => onChange(day)}
          className={`cursor-pointer w-[54px] h-[54px] text-gray09 rounded-full flex items-center justify-center font-medium text-[24px]
            ${selectedDay === day && "bg-white border-mint07 border-2 rounded-full"}
          `}
        >
          {FormatDay(day)}
        </button>
      ))}
    </div>
  );
};

export default CongestionDaySelector;
