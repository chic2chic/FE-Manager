type Props = {
  points?: { x: number; y: number }[];
  strokeColor?: string;
  y1?: number;
  y2?: number;
};

export default function CustomCursor({
  points,
  strokeColor = "#dadada",
  y1 = 60,
  y2 = 340,
}: Props) {
  const x = points?.[0]?.x;
  if (x === undefined) return null;

  return (
    <line
      x1={x}
      x2={x}
      y1={y1}
      y2={y2}
      stroke={strokeColor}
      strokeWidth={1}
      strokeDasharray="3 6"
    />
  );
}
