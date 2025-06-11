/**
 * @Description
 * 커스텀 스타일을 적용할 수 있는 버튼 공통 컴포넌트입니다.
 */

type Props = {
  label: string;
  cssOption: string;
  onClick: () => void;
};

const CustomButton = ({ label, cssOption, onClick }: Props) => {
  return (
    <button
      className={`rounded-full px-[20px] py-[10px] text-center cursor-pointer ${cssOption}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
