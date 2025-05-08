import React, { useEffect, useState } from "react";
import PlusImg from "@/assets/webps/popUpCreate/plus.webp";
import { usePopUpCreateStore } from "@/stores/usePopUpCreateStore";
import { motion } from "framer-motion";
import QuestionnaireInput from "@/pages/popUpCreatePage/views/QuestionnaireInput";

type Props = {
  number: number;
  title: string;
};

/**
 * @param number 질문지 번호
 * @param title 질문지 내용
 */

export default function QuestionnaireForm({ number, title }: Props) {
  const { formData, updateChoiceOptions } = usePopUpCreateStore();
  const existingAnswers =
    formData.choiceCreateRequestList[number - 1].optionList; // 배열형태로 넘어오기 때문에 -1로 인덱싱 필요
  const [answers, setAnswers] = useState<string[]>(
    existingAnswers || Array(2).fill(""),
  );

  const handleSub = (idx: number) => {
    if (answers.length <= 2) return;

    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers.splice(idx, 1);
      return newAnswers;
    });
  };

  const handleAddAnswer = () => {
    if (answers.length >= 5) return;

    setAnswers(prev => [...prev, ""]);
  };

  const handleAnswer = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAnswers(prev => {
      const update = [...prev];
      update[idx] = e.target.value;
      return update;
    });
  };

  useEffect(() => {
    updateChoiceOptions(number - 1, answers);
  }, [answers, number, updateChoiceOptions]);

  return (
    <div className="flex items-start ml-[220px] gap-[52px]">
      <span className="text-[52px] font-bold text-gray10">Q{number}.</span>
      <div className="flex flex-col items-baseline gap-[18px] mt-[14px]">
        <p className="font-semibold text-[32px] tracking-[-2%]">{title}</p>
        {answers.map((answer, idx) => (
          <QuestionnaireInput
            key={idx}
            idx={idx}
            value={answer}
            handleSub={handleSub}
            handleAnswer={handleAnswer}
            canDelete={answers.length > 2}
          />
        ))}
        {answers.length < 5 && (
          <motion.button
            className="pl-[30px] py-[23px] text-[20px] rounded-[20px] border border-gray05 w-[458px] placeholder:font-semibold placeholder:tracking-[-2%] placeholder:text-gray05 placeholder:text-[20px] bg-gray02 border-none cursor-pointer"
            onClick={handleAddAnswer}
            disabled={answers.length >= 5}
          >
            <p className="flex items-center gap-[10px] text-gray09">
              <img src={PlusImg} alt="플러스" width={20} />
              <span className="font-semibold text-[20px] tracking-[-2%]">
                답변 문항 추가
              </span>
            </p>
          </motion.button>
        )}
      </div>
    </div>
  );
}
