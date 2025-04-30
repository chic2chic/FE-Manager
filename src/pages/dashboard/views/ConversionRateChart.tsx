import CustomBlurDot from "@/components/common/CustomBlurDot";
import CustomCursor from "@/components/common/CustomCursor";
import { ConversionRateType } from "@/types/ConversionRateType";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  YAxis,
  TooltipProps,
} from "recharts";

type Props = {
  data: ConversionRateType[];
  barColor: string;
  lineColor: string;
  tooltipColorClass: {
    interested: string;
    purchased: string;
    rate: string;
  };
  purchasedColor: string;
};

export const ConversionRateChart = ({
  data,
  barColor,
  lineColor,
  tooltipColorClass,
  purchasedColor,
}: Props) => {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length < 2) return null;

    const interested =
      payload.find(p => p.dataKey === "interested")?.value ?? 0;
    const purchased = payload.find(p => p.dataKey === "purchased")?.value ?? 0;
    const conversionRate = payload[0]?.payload?.conversionRate ?? 0;

    return (
      <div className="bg-white border border-gray02 rounded-md p-3 shadow-sm">
        <p className="text-[18px] text-gray09 font-semibold mb-2">{label}</p>
        <p className={`text-[17px] text-gray07 font-semibold`}>
          관심자 수:
          <span className={`${tooltipColorClass.interested}`}>
            {" "}
            {interested}
          </span>
          명
        </p>
        <p className={`text-[17px] text-gray07 font-semibold`}>
          구매자 수:
          <span className={`${tooltipColorClass.purchased}`}> {purchased}</span>
          명
        </p>
        <p className={`text-[17px] text-gray07 font-semibold`}>
          구매전환율:
          <span className={`${tooltipColorClass.rate}`}> {conversionRate}</span>
          %
        </p>
      </div>
    );
  };

  const CustomLegend = () => (
    <div className="flex justify-end gap-4 pb-5 pr-4">
      <div className="flex items-center gap-2">
        <span className={`w-[12px] h-[12px] rounded-full bg-${lineColor}`} />
        <span className="text-[16px] text-gray08 font-medium">관심자 수</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`w-[12px] h-[12px] rounded-full bg-${purchasedColor}`}
        />
        <span className="text-[16px] text-gray08 font-medium">구매자 수</span>
      </div>
    </div>
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        barSize={32}
        margin={{ top: 20, right: 36, left: 36, bottom: 26 }}
      >
        <XAxis
          dataKey="name"
          tick={{
            fill: "#59595A",
            fontSize: 16,
            fontWeight: 600,
            width: 80,
          }}
          axisLine={false}
          tickLine={false}
          interval={0}
        />
        <YAxis hide padding={{ bottom: 10 }} />
        <Tooltip
          cursor={<CustomCursor y1={60} />}
          content={<CustomTooltip />}
        />
        <Legend content={<CustomLegend />} verticalAlign="top" align="right" />{" "}
        <Bar dataKey="purchased" fill={barColor} radius={10} name="구매자 수" />
        <Line
          dataKey="interested"
          stroke={lineColor}
          strokeWidth={1}
          dot={<CustomBlurDot fillColor={lineColor} />}
          activeDot={false}
          name="관심자 수"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
