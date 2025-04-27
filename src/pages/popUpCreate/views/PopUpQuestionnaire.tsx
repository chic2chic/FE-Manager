import RightArrowImg from "@/assets/webps/onBoarding/right-arrow.webp";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import QuestionnaireForm from "./QuestionnaireForm";

export default function PopUpQuestionnaire() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-[50px]">
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
            <QuestionnaireForm number={1} title="좋아하는 굿즈 타입은?" />
            <div className="w-3/4 border flex my-0 mx-auto border-gray05" />
            <QuestionnaireForm
              number={2}
              title="어떤 경로로 팝업스토어 오픈 소식을 접하셨나요?"
            />
            <div className="w-3/4 border flex my-0 mx-auto border-gray05" />
            <QuestionnaireForm
              number={3}
              title="이번 팝업스토어에 방문한 가장 큰 이유는 무엇인가요?"
            />
            <div className="w-3/4 border flex my-0 mx-auto border-gray05" />
            <QuestionnaireForm
              number={4}
              title="구매 시 중요하게 고려하는 요소는 무엇인가요?"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="cursor-pointer flex flex-col items-center gap-2 p-3 bg-gray01 rounded-lg justify-center"
        onClick={toggleOpen}
      >
        <p className="font-medium">설문지 작성</p>
        <img
          src={RightArrowImg}
          className={`${isOpen ? "rotate-270" : "rotate-90"} bg-black`}
          width={32}
        />
      </motion.div>
    </div>
  );
}
