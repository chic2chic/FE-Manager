import CustomTooltip from "@/components/common/CustomTooltip";
import { Colors } from "@/constants/dashboard/Colors";
import { ReservationChartDatas } from "@/mocks/handlers/dashboard/ReservationDatas";
import { ReservationChartType } from "@/types/ReservationType";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

// ⭐️ value 기준 오름차순으로 color 매칭시키기 ⭐️
// 1. value 기준 오름차순 정렬
const sortedData = [...ReservationChartDatas].sort(
  (a: ReservationChartType, b: ReservationChartType) => a.value - b.value,
);

// 2. 요일 -> 색상 매칭
const dayToColorMap = new Map(
  sortedData.map((entry, index) => [entry.day, Colors[index]]),
);

// 3. 원래 data에 색상 입히기
const coloredData = ReservationChartDatas.map(
  (entry: ReservationChartType) => ({
    ...entry,
    fill: dayToColorMap.get(entry.day),
  }),
);

export default function ReservationByDay() {
  // max값 기준 y축 눈금 100 단위로 만들기
  const maxValue = Math.max(...ReservationChartDatas.map(d => d.value)); // value 중 가장 큰 수
  const roundedMax = Math.ceil(maxValue / 100) * 100; // 100 단위 올림
  const ticks = [];

  for (let i = 0; i <= roundedMax; i += 100) {
    ticks.push(i); // 0 100 200 300 400
  }

  return (
    <ResponsiveContainer width={473} height={250}>
      <BarChart data={coloredData}>
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
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={<CustomTooltip unitPrefix="평균" unitSuffix="명" />}
        />
        <Bar dataKey="value" radius={10} barSize={35}>
          {coloredData.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
