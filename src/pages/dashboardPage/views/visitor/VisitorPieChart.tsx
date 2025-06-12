import React from "react";
import { PieChart, Pie, Cell, Tooltip, TooltipProps } from "recharts";
import CustomTooltip from "@/pages/dashboardPage/views/@common/CustomTooltip";
import VisitorPieLegend from "@/pages/dashboardPage/views/visitor/VisitorPieLegend";

export type PieChartSegment = {
  name: string;
  count: number;
  rawFill: string;
  ratio: number;
};

type PieTooltipItem = {
  value: number;
  name: string;
  dataKey: string;
  payload?: {
    fill?: string;
    rawFill?: string;
  };
};

type PieTooltip = PieTooltipItem[];

type RenderGradientsProps = {
  data: PieChartSegment[];
  prefix: string;
  radius?: number;
};

type Props = {
  data: PieChartSegment[];
  gradIdPrefix: string;
  innerRadius?: number;
  size?: number;
  radius?: number;
};

// 그라데이션
const renderGradients = ({
  data,
  prefix,
  radius = 80,
}: RenderGradientsProps) => (
  <defs>
    {data.map((d, i) => (
      <radialGradient
        key={i}
        id={`${prefix}${i}`}
        gradientUnits="userSpaceOnUse"
        cx="50%"
        cy="50%"
        r={radius}
      >
        <stop offset="0%" stopColor={d.rawFill} stopOpacity={1} />
        <stop offset="100%" stopColor={d.rawFill} stopOpacity={0.4} />
      </radialGradient>
    ))}
  </defs>
);

// 파이 그래프
const VisitorPieChart = ({
  data,
  gradIdPrefix,
  innerRadius,
  size = 180,
  radius = 80,
}: Props) => {
  return (
    <div className="flex flex-col items-center">
      {/* 범례 */}
      <VisitorPieLegend data={data} />
      <div
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
          e.preventDefault()
        }
      >
        <PieChart width={size} height={size}>
          {/* 그라데이션 */}
          {renderGradients({ data, prefix: gradIdPrefix, radius })}

          {/* 툴팁 */}
          <Tooltip
            content={(props: TooltipProps<number, string>) => {
              const { active, payload } = props;
              if (!active || !payload?.length) return null;

              const tooltipData = payload as PieTooltip;
              const segmentInfo = tooltipData[0].payload as PieChartSegment;

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

          {/* 파이 그래프 */}
          <Pie
            data={data}
            innerRadius={innerRadius}
            outerRadius={radius}
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
};

export default VisitorPieChart;
