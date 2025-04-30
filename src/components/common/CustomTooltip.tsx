/**
 * @Description
 * rechart 라이브러리를 활용한 그래프에서 사용되는 툴팁입니다
 */

type Props = {
  active?: boolean;
  payload?: {
    value: number;
    name: string;
    dataKey: string;
    payload?: { fill?: string };
  }[];
  label?: string | number;
  labelSuffix?: string;
  unitSuffix?: string;
  highlightColor?: string;
  unitPrefix?: string;
};

export default function CustomTooltip({
  active,
  payload,
  label,
  labelSuffix,
  unitPrefix,
  highlightColor,
  unitSuffix,
}: Props) {
  if (active && payload && payload.length) {
    const dynamicColor =
      highlightColor ?? payload?.[0]?.payload?.fill ?? "#000";

    return (
      <div className="bg-white border border-gray02 rounded-md p-3 shadow-sm">
        <p className="text-[18px] text-gray09 font-semibold mb-1">
          {label}
          {labelSuffix}
        </p>
        <p className="text-[17px] text-gray07 font-semibold">
          {unitPrefix}
          <span style={{ color: dynamicColor }}> {payload[0].value}</span>
          {unitSuffix}
        </p>
      </div>
    );
  }
  return null;
}
