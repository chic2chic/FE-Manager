import CustomTooltip from "@/components/common/CustomTooltip";
import { CongestionDatas } from "@/mocks/handlers/dashboard/ConjestionDatas";
import { CongestionData } from "@/types/CongestionType";

import {
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  DotProps,
  YAxis,
} from "recharts";

type Props = {
  dayData: CongestionData[];
};

type TooltipPayload = {
  value: number;
  name: string;
  dataKey: string;
}[];

export type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload;
  label?: string | number;
};

type CursorProps = {
  points?: { x: number; y: number }[];
};

const CustomCursor = ({ points }: CursorProps) => {
  const x = points?.[0]?.x;
  if (x === undefined) return null;

  return (
    <line
      x1={x}
      x2={x}
      y1={20}
      y2={340}
      stroke="#dadada"
      strokeWidth={1}
      strokeDasharray="3 6"
    />
  );
};

const BlurDot = ({ cx, cy }: DotProps) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={7}
      fill="#96E2D6"
      style={{
        filter: "blur(3px)",
      }}
    />
  );
};

export default function CongestionChart({ dayData }: Props) {
  // y축 최댓값: 모든 요일 데이터 중 가장 큰 value
  const allValues = Object.values(CongestionDatas)
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
          cursor={<CustomCursor />}
        />
        <Area
          type="linear"
          dataKey="value"
          stroke="#96E2D6"
          strokeWidth={1}
          fill="url(#colorMint)"
          dot={<BlurDot />}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
