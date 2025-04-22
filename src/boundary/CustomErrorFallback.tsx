import { useQueryErrorResetBoundary } from "@tanstack/react-query";

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
    <div>
      <h1>요청이 만료되었습니다.</h1>
      <button onClick={handleClickReset}>재시도</button>
    </div>
  );
}
