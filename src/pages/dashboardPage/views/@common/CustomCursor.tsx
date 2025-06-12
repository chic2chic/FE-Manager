/**
 * @Description
 * rechart 라이브러리를 활용한 그래프에서 사용되는 커서 UI입니다.
 */

type Props = {
  points?: { x: number; y: number }[];
  strokeColor?: string;
  y1?: number;
  y2?: number;
};

const CustomCursor = ({
  points,
  strokeColor = "#dadada",
  y1 = 60,
  y2 = 340,
}: Props) => {
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
};

export default CustomCursor;
