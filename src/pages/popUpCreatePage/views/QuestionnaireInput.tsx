import React from "react";

type Props = {
  idx: number;
  value: string;
  handleSub: (_idx: number) => void;
  handleAnswer: (_idx: number, _e: React.ChangeEvent<HTMLInputElement>) => void;
  canDelete: boolean;
  questionNumber: number;
};

/**
 * 답변은 최소 2개부터 최대 5개까지 가능합니다.
 * 핸들러 함수를 props로 전달받아서 상위 컴포넌트의 상태를 변경시킵니다.
 * @param idx 답변 번호 (배열 인덱스)
 * @param value 관리자가 입력한 답변 내용
 * @param handleSub 삭제하기 버튼 클릭시 동작하며, 배열[idx] 요소를 삭제합니다.
 * @param handleAnswer 관리자가 답변을 등록할 때 동작하며, 상위 컴포넌트의 answer를 변경시킵니다.
 * @param canDelete 답변의 최소 / 최대 범위를 추적하며 canDelete를 이용하여 버튼을 disabled 시킵니다.
 * @returns
 */

export default function QuestionnaireInput({
  idx,
  value,
  handleSub,
  handleAnswer,
  canDelete,
  questionNumber,
}: Props) {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={value}
        onChange={e => handleAnswer(idx, e)}
        placeholder={`답변 옵션 ${idx + 1}`}
        className="pl-[30px] py-[23px] text-[20px] rounded-[20px] border border-gray05 w-[458px]"
        data-testid={`questionnaire-input-${idx}`}
      />
      {canDelete && (
        <button
          onClick={() => handleSub(idx)}
          className="absolute right-[20px] text-gray07 hover:text-red-500"
          data-testid={`questionnaire-input-${questionNumber}-${idx}`}
        >
          ✕
        </button>
      )}
    </div>
  );
}
