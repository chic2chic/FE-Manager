import { PieChartSegment } from "@/pages/dashboardPage/views/visitor/VisitorPieChart";

type Props = {
  data: PieChartSegment[];
};

// 범례
const VisitorPieLegend = ({ data }: Props) => (
  <div className="grid grid-cols-2 gap-2 mb-[27px] h-[60px]">
    {data.map((d, i) => (
      <div key={i} className="flex items-center gap-2">
        <span
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: d.rawFill }}
        />
        <span className="text-gray09 text-[18px] font-pretendard">
          {d.name}
        </span>
      </div>
    ))}
  </div>
);

export default VisitorPieLegend;
