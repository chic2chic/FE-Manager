import { useState } from "react";
import QuestionnaireInput from "./QuestionnaireInput";
import PlusImg from "@/assets/webps/popUpCreate/plus.webp";

type Props = {
  number: number;
  title: string;
};

export default function QuestionnaireForm({ number, title }: Props) {
  const [answerCnt, setAnswerCnt] = useState<number>(2);
  const handleSub = () => {
    setAnswerCnt(Math.max(2, answerCnt - 1));
  };

  return (
    <div className="flex items-baseline ml-[220px] gap-[52px]">
      <span className="text-[52px] font-bold">Q{number}.</span>
      <div className="flex flex-col items-baseline gap-[18px]">
        <p className="font-semibold text-[32px] tracking-[-2%]">{title}</p>
        {Array.from({ length: answerCnt }).map((_, index) => (
          <QuestionnaireInput
            key={index}
            handleSub={handleSub}
            answerCnt={answerCnt}
          />
        ))}
        <button
          className="pl-[30px] py-[23px] text-[20px] rounded-[20px] border border-gray05 w-[458px] placeholder:font-semibold placeholder:tracking-[-2%] placeholder:text-gray05 placeholder:text-[20px] bg-gray02 border-none"
          onClick={() => setAnswerCnt(prev => Math.min(5, prev + 1))}
        >
          <p className="flex items-center gap-[10px] text-gray09">
            <img src={PlusImg} alt="플러스" width={20} />
            <span className="font-semibold text-[20px] tracking-[-2%]">
              답변 문항 추가
            </span>
          </p>
        </button>
      </div>
    </div>
  );
}
