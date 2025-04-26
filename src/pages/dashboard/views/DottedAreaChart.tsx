import {
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  DotProps,
  YAxis,
} from "recharts";

const congestionData: { [key: string]: { time: number; value: number }[] } = {
  월: [
    { time: 6, value: 5 },
    { time: 8, value: 10 },
    { time: 10, value: 14 },
    { time: 12, value: 20 },
    { time: 14, value: 25 },
    { time: 16, value: 22 },
    { time: 18, value: 32 },
    { time: 20, value: 26 },
    { time: 22, value: 18 },
    { time: 24, value: 5 },
  ],
  화: [
    { time: 6, value: 3 },
    { time: 8, value: 7 },
    { time: 10, value: 13 },
    { time: 12, value: 19 },
    { time: 14, value: 23 },
    { time: 16, value: 20 },
    { time: 18, value: 28 },
    { time: 20, value: 22 },
    { time: 22, value: 16 },
    { time: 24, value: 4 },
  ],
  수: [
    { time: 6, value: 4 },
    { time: 8, value: 9 },
    { time: 10, value: 15 },
    { time: 12, value: 21 },
    { time: 14, value: 26 },
    { time: 16, value: 24 },
    { time: 18, value: 34 },
    { time: 20, value: 28 },
    { time: 22, value: 20 },
    { time: 24, value: 6 },
  ],

  목: [
    { time: 6, value: 2 },
    { time: 8, value: 5 },
    { time: 10, value: 9 },
    { time: 12, value: 15 },
    { time: 14, value: 18 },
    { time: 16, value: 16 },
    { time: 18, value: 22 },
    { time: 20, value: 18 },
    { time: 22, value: 12 },
    { time: 24, value: 3 },
  ],
  금: [
    { time: 6, value: 1 },
    { time: 8, value: 3 },
    { time: 10, value: 7 },
    { time: 12, value: 12 },
    { time: 14, value: 15 },
    { time: 16, value: 14 },
    { time: 18, value: 20 },
    { time: 20, value: 16 },
    { time: 22, value: 10 },
    { time: 24, value: 2 },
  ],
  토: [
    { time: 6, value: 6 },
    { time: 8, value: 12 },
    { time: 10, value: 17 },
    { time: 12, value: 22 },
    { time: 14, value: 28 },
    { time: 16, value: 25 },
    { time: 18, value: 36 },
    { time: 20, value: 30 },
    { time: 22, value: 22 },
    { time: 24, value: 7 },
  ],
  일: [
    { time: 6, value: 8 },
    { time: 8, value: 14 },
    { time: 10, value: 18 },
    { time: 12, value: 24 },
    { time: 14, value: 30 },
    { time: 16, value: 27 },
    { time: 18, value: 38 },
    { time: 20, value: 32 },
    { time: 22, value: 24 },
    { time: 24, value: 8 },
  ],
};

type Props = {
  selectedDay: string;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload;
  label?: string | number;
};

type TooltipPayload = {
  value: number;
  name: string;
  dataKey: string;
}[];

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
      y1={20} // 그래프 중간부터
      y2={340} // 그래프 아래 끝까지
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

export default function DottedAreaChart({ selectedDay }: Props) {
  const data = congestionData[selectedDay] || congestionData["월"];

  // 모든 요일 데이터 중 가장 큰 value 찾기
  const allValues = Object.values(congestionData)
    .flat()
    .map(d => d.value);
  const maxValue = Math.max(...allValues);

  return (
    <ResponsiveContainer width={612} height={394}>
      <AreaChart
        data={data}
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
