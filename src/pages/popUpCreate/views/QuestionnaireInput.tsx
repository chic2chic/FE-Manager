import MinusBtn from "@/assets/webps/popUpCreate/minus.webp";
import { motion } from "framer-motion";

type Props = {
  handleSub: () => void;
  answerCnt: number;
};

export default function QuestionnaireInput({ handleSub, answerCnt }: Props) {
  return (
    <div className="flex items-center gap-[12px]">
      <input
        className="pl-[30px] py-[23px] text-[20px] rounded-[20px] border border-gray05 w-[458px] placeholder:font-semibold placeholder:tracking-[-2%] placeholder:text-gray05 placeholder:text-[20px] transition-all duration-200 focus:border-gray09 focus:outline-none"
        placeholder="답변 내용을 입력하세요"
      />
      <button
        className={`${answerCnt > 2 ? "block" : "hidden"}`}
        onClick={handleSub}
        disabled={answerCnt > 2 ? false : true}
      >
        <motion.img
          src={MinusBtn}
          alt="마이너스 버튼"
          width={32}
          height={32}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </button>
    </div>
  );
}
