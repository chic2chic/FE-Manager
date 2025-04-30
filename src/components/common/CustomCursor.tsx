type Props = {
  points?: { x: number; y: number }[];
  strokeColor?: string;
  yRange?: { from: number; to: number };
};

export default function CustomCursor({
  points,
  strokeColor = "#dadada",
  yRange = { from: 60, to: 340 },
}: Props) {
  const x = points?.[0]?.x;
  if (x === undefined) return null;

  return (
    <line
      x1={x}
      x2={x}
      y1={yRange.from}
      y2={yRange.to}
      stroke={strokeColor}
      strokeWidth={1}
      strokeDasharray="3 6"
    />
  );
}
