type Props = {
  bgCSS: string;
  title: string;
  valueCSS: string;
  value: string;
  unitCSS: string;
  unit: string;
};

// 예약자 수, 입장자 수, 1인 평균 구매액 count card
export function CountCard({
  bgCSS,
  title,
  valueCSS,
  value,
  unitCSS,
  unit,
}: Props) {
  return (
    <div
      className={`${bgCSS} rounded-[40px] h-[180px] flex flex-col justify-center items-center`}
    >
      <p className="text-[24px] text-gray10 font-semibold leading-[29px] mb-2">
        {title}
      </p>
      <p
        className={`text-[64px] ${valueCSS} font-regular tracking-[-1.8px] leading-[74px]`}
      >
        {value.toLocaleString()}
        <span className={`ml-[3px] mb-1 ${unitCSS}`}>{unit}</span>
      </p>
    </div>
  );
}
