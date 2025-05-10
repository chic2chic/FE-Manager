import CustomBlurDot from "@/components/common/CustomBlurDot";
import CustomCursor from "@/components/common/CustomCursor";
import CustomTooltip from "@/components/common/CustomTooltip";
import { congestionList } from "@/mocks/handlers/dashboard/CongestionRead.handlers";
import { GetCongestionTimeValue } from "@/types/api/ApiResponseType";

import {
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

type Props = {
  dayData: GetCongestionTimeValue[];
};

export default function CongestionChart({ dayData }: Props) {
  // y축 최댓값: 모든 요일 데이터 중 가장 큰 value
  const allValues = Object.values(congestionList)
    .flat()
    .map(d => d.value);

  const maxValue = Math.max(...allValues);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={dayData}
        margin={{ top: 70, right: 40, left: 40, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorMint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D5F3EF" stopOpacity={1} />
            <stop offset="100%" stopColor="#D5F3EF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis domain={[0, maxValue]} hide={true} />
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#939494", fontSize: 20 }}
        />
        <Tooltip
          content={
            <CustomTooltip
              labelSuffix="시"
              unitPrefix="평균"
              highlightColor="#71DDCB"
              unitSuffix="명"
            />
          }
          cursor={<CustomCursor y1={20} y2={340} />}
        />
        <Area
          type="linear"
          dataKey="value"
          stroke="#96E2D6"
          strokeWidth={1}
          fill="url(#colorMint)"
          dot={<CustomBlurDot fillColor="#96E2D6" />}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
