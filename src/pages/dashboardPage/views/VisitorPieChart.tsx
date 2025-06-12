import React from "react";
import { PieChart, Pie, Cell, Tooltip, TooltipProps } from "recharts";
import CustomTooltip from "@/pages/dashboardPage/views/@common/CustomTooltip";

export type SegmentDatum = {
  name: string;
  count: number;
  rawFill: string;
  ratio: number;
};

type TooltipPayloadItem = {
  value: number;
  name: string;
  dataKey: string;
  payload?: {
    fill?: string;
    rawFill?: string;
  };
};

type TooltipPayload = TooltipPayloadItem[];

const SIZE = 180;
const RADIUS = 80;

type Props = {
  data: SegmentDatum[];
  gradIdPrefix: string;
  innerRadius?: number;
};

export default function VisitorPieChart({
  data,
  gradIdPrefix,
  innerRadius,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      {/* 범례 */}
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
      <div
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
          e.preventDefault()
        }
      >
        <PieChart width={SIZE} height={SIZE}>
          {/* 그라디언트 정의 */}
          <defs>
            {data.map((d, i) => (
              <radialGradient
                key={i}
                id={`${gradIdPrefix}${i}`}
                gradientUnits="userSpaceOnUse"
                cx="50%"
                cy="50%"
                r={RADIUS}
              >
                <stop offset="0%" stopColor={d.rawFill} stopOpacity={1} />
                <stop offset="100%" stopColor={d.rawFill} stopOpacity={0.4} />
              </radialGradient>
            ))}
          </defs>

          {/* 툴팁 설정 */}
          <Tooltip
            content={(props: TooltipProps<number, string>) => {
              const { active, payload } = props;
              if (!active || !payload?.length) return null;

              const tooltipData = payload as TooltipPayload;
              const segmentInfo = tooltipData[0].payload as SegmentDatum;

              return (
                <CustomTooltip
                  active={active}
                  payload={tooltipData}
                  label={segmentInfo.name}
                  labelSuffix=""
                  unitSuffix="명"
                  highlightColor={segmentInfo.rawFill}
                />
              );
            }}
          />

          {/* 파이 차트 */}
          <Pie
            data={data}
            innerRadius={innerRadius}
            outerRadius={RADIUS}
            dataKey="count"
            cx="50%"
            cy="50%"
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={`url(#${gradIdPrefix}${idx})`} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}
