import {
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  DotProps,
} from "recharts";

const data = [
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
];

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

export default function DottedAreaChart() {
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
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#939494", fontSize: 20 }}
        />
        <Tooltip content={undefined} />
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
