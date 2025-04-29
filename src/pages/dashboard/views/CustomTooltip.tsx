type Props = {
  active?: boolean;
  payload?: {
    value: number;
    name: string;
    dataKey: string;
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
  labelSuffix = "",
  unitPrefix = "",
  highlightColor = "#54d8c2",
  unitSuffix = "",
}: Props) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray02 rounded-md p-2 shadow-sm">
        <p className="text-[18px] text-gray09 font-semibold">
          {label}
          {labelSuffix}
        </p>
        <p className="text-[17px] text-gray07 font-semibold">
          {unitPrefix}
          <span style={{ color: highlightColor }}> {payload[0].value}</span>
          {unitSuffix}
        </p>
      </div>
    );
  }
  return null;
}
