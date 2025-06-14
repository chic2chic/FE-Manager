/**
 * @Description
 * 이미지가 업로드되지 않은 상태를 시각적으로 안내하는 컴포넌트입니다.
 */

type Props = {
  width: number;
  height: number;
};

const NoImageComp = ({ width, height }: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-center p-6 border-dashed border-2 border-gray05 rounded-lg"
      style={{ width, height }}
    >
      <p className="text-gray08 text-[20px] font-medium mb-2">
        이미지를 업로드해주세요
      </p>
      <p className="text-gray06 text-[14px]">
        팝업에 사용될 이미지를 선택하세요
      </p>
    </div>
  );
};

export default NoImageComp;
