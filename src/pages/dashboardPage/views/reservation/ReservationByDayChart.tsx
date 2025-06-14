import CustomTooltip from "@/pages/dashboardPage/views/@common/CustomTooltip";
import { ReservationChartResponse } from "@/types/api/ApiResponseType";
import { reservationColorMapper } from "@/utils/ReservationColorMapper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

type Props = {
  data: ReservationChartResponse[];
};

const ReservationByDayChart = ({ data }: Props) => {
  const coloredData = reservationColorMapper(data);
  // max값 기준 y축 눈금 100 단위로 만들기
  const maxValue = Math.max(...data.map(d => d.reservedCount)); // value 중 가장 큰 수
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
          domain={[0, roundedMax]}
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
        <Bar dataKey="reservedCount" radius={10} barSize={35}>
          {coloredData.map(data => (
            <Cell key={data.day} fill={data.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReservationByDayChart;
