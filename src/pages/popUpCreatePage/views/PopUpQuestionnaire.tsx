import WideArrowImg from "@/assets/webps/popUpCreate/wide-arrow.webp";
import { motion, AnimatePresence } from "framer-motion";
import { Questions } from "@/constants/popUpCreate/Questions";
import { useState } from "react";
import QuestionnaireForm from "@/pages/popUpCreatePage/views/QuestionnaireForm";

type Props = {
  handleSave: () => void;
  alertMessage: string;
};

export default function PopUpQuestionnaire({
  handleSave,
  alertMessage,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-[50px] gap-[80px] flex flex-col">
      {/** <QuestionnaireForm/> 안에 실제 설문지 내용이 들어갑니다. */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.5 },
                opacity: { duration: 0.3, delay: 0.2 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.5 },
                opacity: { duration: 0.3 },
              },
            }}
            className="bg-white overflow-hidden gap-[64px] flex flex-col"
          >
            {Questions.map(question => {
              return (
                <>
                  <QuestionnaireForm
                    key={question.questionNumber}
                    number={question.questionNumber}
                    title={question.title}
                  />
                  {question.questionNumber !== 4 && (
                    <div className="w-3/4 h-px flex my-0 mx-auto bg-gray04" />
                  )}
                </>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      {/** 설문지 화살표 버튼입니다. */}
      <motion.div
        className="cursor-pointer flex flex-col items-center gap-[12px] pt-6 pb-16 px-6 mx-auto bg-gray01 rounded-lg justify-center w-[250px]"
        onClick={toggleOpen}
        data-testid="popup-create-wideBtn"
      >
        <p className="font-semibold text-[28px]">설문지 작성</p>
        <img
          src={WideArrowImg}
          className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
          width={102}
          height={41}
        />
      </motion.div>
      <div
        className="text-center font-medium text-main07 text-[20px]"
        data-testid="popup-create-alert-message"
      >
        {alertMessage}
      </div>
      {isOpen && (
        <button
          data-testid="popup-create-save-btn"
          className="rounded-full my-0 mx-auto bg-gray10 text-gray01 py-[16px] px-[42px] cursor-pointer text-[24px] font-medium tracking-[0.2px] mb-30 hover:opacity-80"
          onClick={handleSave}
        >
          저장하기
        </button>
      )}
    </div>
  );
}
