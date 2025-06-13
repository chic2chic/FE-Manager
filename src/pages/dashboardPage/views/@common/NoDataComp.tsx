/**
 * @Description
 * GET 메서드로 받아온 data가 없을 때 사용되는 UI입니다.
 */

import sad from "@/assets/webps/dashboard/sad.webp";

type Props = {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
};

const NoDataComp = ({
  width = "w-full",
  height = "h-full",
  rounded = "rounded-[40px]",
  className = "",
}: Props) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${width} ${height} ${rounded} ${className}`}
    >
      <div className="mb-4">
        <img src={sad} width={40} />
      </div>
      <h3 className="text-[24px] font-semibold text-gray09 mb-2">
        조회된 데이터가 없습니다
      </h3>
      <p className="text-[18px] text-gray07">아직 데이터가 없어요</p>
    </div>
  );
};

export default NoDataComp;
