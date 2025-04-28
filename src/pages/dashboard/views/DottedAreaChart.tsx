import { congestionDatas } from "@/mocks/handlers/dashboard/conjestionDatas";
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

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload;
  label?: string | number;
};

type CursorProps = {
  points?: { x: number; y: number }[];
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray02 rounded-md p-2 shadow-sm">
        <p className="text-[18px] text-gray10 font-semibold">{label}시</p>
        <p className="text-[16px] text-mint07 font-semibold">
          평균 {payload[0].value}명
        </p>
      </div>
    );
  }
  return null;
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

export default function DottedAreaChart({ dayData }: Props) {
  // 모든 요일 데이터 중 가장 큰 value 찾기
  const allValues = Object.values(congestionDatas)
    .flat()
    .map(d => d.value);

  const maxValue = Math.max(...allValues);

  return (
    <ResponsiveContainer width={612} height={394}>
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
        <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
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
