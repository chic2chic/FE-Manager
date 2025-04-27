import RightArrowImg from "@/assets/webps/onBoarding/right-arrow.webp";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import QuestionnaireForm from "./QuestionnaireForm";
import { Questions } from "@/constants/popUpCreate/Questions";

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
            {Questions.map(question => {
              return (
                <>
                  <QuestionnaireForm
                    key={question.questionNumber}
                    number={question.questionNumber}
                    title={question.title}
                  />
                  {question.questionNumber !== 4 && (
                    <div className="w-3/4 border flex my-0 mx-auto border-gray05" />
                  )}
                </>
              );
            })}
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
