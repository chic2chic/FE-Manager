/**
 * @Description
 * rechart 라이브러리를 활용한 그래프에서 사용되는 Dot UI입니다.
 */

import { DotProps } from "recharts";

type Props = DotProps & {
  fillColor: string;
};

const CustomBlurDot = ({ cx, cy, fillColor }: Props) => {
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
};

export default CustomBlurDot;
