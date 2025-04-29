import { CustomTooltipProps } from "@/pages/dashboard/views/DottedAreaChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const data = [
  { day: "월", value: 220 },
  { day: "화", value: 210 },
  { day: "수", value: 90 },
  { day: "목", value: 130 },
  { day: "금", value: 300 },
  { day: "토", value: 370 },
  { day: "일", value: 310 },
];

const colors = [
  "#FF98C0", // 가장 작은 값
  "#FFB4D1",
  "#D9D9FC",
  "#D3E5FF",
  "#C5EFE8",
  "#B3D2FF",
  "#BCBCFA", // 가장 큰 값
];

export default function ReservationByDay() {
  const maxValue = Math.max(...data.map(d => d.value));
  const roundedMax = Math.ceil(maxValue / 100) * 100;
  const ticks = [];

  for (let i = 0; i <= roundedMax; i += 100) {
    ticks.push(i);
  }

  // value 기준 오름차순 정렬
  const sortedData = [...data].sort((a, b) => a.value - b.value);

  // 정렬 순서대로 색상 매칭
  const coloredData = data.map(entry => {
    const sortedIndex = sortedData.findIndex(
      sorted => sorted.day === entry.day,
    );
    return {
      ...entry,
      fill: colors[sortedIndex],
    };
  });

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray02 rounded-md p-2 shadow-sm">
          <p className="text-[18px] text-gray09 font-semibold">{label}</p>
          <p className="text-[17px] text-gray07 font-semibold">
            평균<span className="text-purple07"> {payload[0].value}</span>명
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width={473} height={250}>
      <BarChart data={data}>
        <XAxis
          dataKey="day"
          tick={{ fill: "#939494", fontSize: 20 }}
          axisLine={false}
          tickLine={false}
          padding={{ left: 20 }}
        />
        <YAxis
          domain={[0, ticks[-1]]}
          ticks={ticks}
          tick={{ fill: "#939494", fontSize: 16 }}
          axisLine={false}
          tickLine={false}
          tickMargin={0}
          padding={{ bottom: 5 }}
        />
        <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
        <Bar dataKey="value" radius={10} barSize={35}>
          {coloredData.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
