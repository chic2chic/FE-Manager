import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import speaker from "@/assets/webps/common/speaker.webp";

type Props = {
  resetErrorBoundary: () => void;
};

export default function CustomErrorFallback({ resetErrorBoundary }: Props) {
  const { reset } = useQueryErrorResetBoundary();

  const handleClickReset = () => {
    reset();
    resetErrorBoundary();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="mt-40"
        src={speaker}
        alt="speaker"
        width={136}
        height={136}
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        앗, 뭔가 잘못됐어요
      </h1>
      <p className="mt-2 text-gray-600 mb-6 text-center">
        요청을 처리하는 중 문제가 발생했어요. <br />
        네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.
      </p>
      <button
        onClick={handleClickReset}
        className="mt-4 px-6 py-2 bg-main06 font-medium text-[18px] text-gray01 rounded-full hover:bg-main05 transition"
      >
        다시 시도하기
      </button>
    </div>
  );
}
