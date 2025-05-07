import { DotProps } from "recharts";

type Props = DotProps & {
  fillColor: string;
};

export default function CustomBlurDot({ cx, cy, fillColor }: Props) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={7}
      fill={fillColor}
      style={{
        filter: "blur(3px)",
      }}
    />
  );
}
