/**
 * @Description
 * rechart 라이브러리를 활용한 그래프에서 사용되는 툴팁 UI입니다.
 */

import { PieChartSegment } from "@/pages/dashboardPage/views/visitor/VisitorPieChart";

type Props = {
  active?: boolean;
  payload?: {
    value: number;
    name: string;
    dataKey: string;
    payload?: {
      fill?: string;
      rawFill?: string;
    };
  }[];
  label?: string | number;
  labelSuffix?: string;
  unitSuffix?: string;
  highlightColor?: string;
  unitPrefix?: string;
};

const CustomTooltip = ({
  active,
  payload,
  label,
  labelSuffix,
  unitPrefix,
  highlightColor,
  unitSuffix,
}: Props) => {
  if (active && payload && payload.length) {
    const dynamicColor =
      highlightColor ??
      payload[0].payload?.fill ??
      payload[0].payload?.rawFill ??
      "#000";

    const value = payload[0].value;
    const segmentPayload = payload[0].payload as PieChartSegment;
    const ratio = segmentPayload?.ratio;

    return (
      <div className="bg-white border border-gray02 rounded-md p-3 shadow-sm">
        <p className="text-[18px] text-gray09 font-semibold mb-1">
          {label}
          {labelSuffix}
        </p>
        <p className="text-[17px] text-gray07 font-semibold">
          {unitPrefix}
          <span style={{ color: dynamicColor }}> {value}</span>
          {unitSuffix}
          {ratio !== undefined && (
            <span style={{ color: dynamicColor }}> ({ratio}%)</span>
          )}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
