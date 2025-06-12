/**
 * @Description
 * 대시보드에서 사용되는 Title UI입니다.
 */

type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return (
    <div className="flex gap-[18px] items-start mb-10">
      <div className="flex gap-[6px] items-end">
        <div className="w-3 h-[38px] bg-blue07 rounded-[10px]" />
        <div className="w-3 h-[29px] bg-purple07 rounded-[10px]" />
        <div className="w-3 h-[22px] bg-mint07 rounded-[10px]" />
      </div>
      <span className="text-gray10 font-bold text-[32px]">{title}</span>
    </div>
  );
};

export default Title;
