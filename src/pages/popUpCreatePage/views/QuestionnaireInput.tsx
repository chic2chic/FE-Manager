import MinusBtn from "@/assets/webps/popUpCreate/minus.webp";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  idx: number;
  value: string;
  handleSub: (_idx: number) => void;
  handleAnswer: (_idx: number, _e: React.ChangeEvent<HTMLInputElement>) => void;
  canDelete: boolean;
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
}: Props) {
  return (
    <div className="flex items-center gap-[12px]">
      <input
        className="pl-[30px] py-[23px] text-[20px] rounded-[20px] border border-gray05 w-[458px] placeholder:font-semibold placeholder:tracking-[-2%] placeholder:text-gray05 placeholder:text-[20px] transition-all duration-200 focus:border-gray09 focus:outline-none"
        placeholder="답변 내용을 입력하세요"
        value={value}
        onChange={e => handleAnswer(idx, e)}
      />
      <button
        className={`${canDelete ? "block" : "hidden"} cursor-pointer hover:opacity-80`}
        onClick={() => handleSub(idx)}
        disabled={!canDelete}
      >
        <motion.img src={MinusBtn} alt="마이너스 버튼" width={32} height={32} />
      </button>
    </div>
  );
}
