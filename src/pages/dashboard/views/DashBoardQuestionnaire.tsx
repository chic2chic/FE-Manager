import { DropdownFilter } from "@/components/common/DropdownFilter";
import DashBoardTitle from "./DashBoardTitle";
import { useState } from "react";
import { Questions } from "@/constants/popUpCreate/Questions";
import { QuestionnaireDatas } from "@/mocks/handlers/dashboard/Questionnaire";
import { QuestionnaireType } from "@/types/QuestionnaireType";

const options = ["1번 문항", "2번 문항", "3번 문항", "4번 문항"];

const findQuestionNumber = (selected: string) => {
  const regex = /[0-9]+/;
  return Number(selected.match(regex));
};

const findQuestionTotal = (questionnaireData: QuestionnaireType) => {
  const totalRespondents = questionnaireData.contents.reduce((sum, content) => {
    return sum + content.numOfRespondents;
  }, 0);
  return totalRespondents;
};

export default function DashBoardQuestionnaire() {
  const [selectedQuestion, setSelectedQuestion] = useState<string>(options[0]);

  const handleQuestion = (selected: string) => {
    setSelectedQuestion(selected);
  };

  const matchQuestion = (selected: string): string => {
    const questionNumber = findQuestionNumber(selected);
    const target = Questions.find(q => q.questionNumber === questionNumber);
    return `Q${target?.questionNumber}. ${target?.title}`;
  };

  const matchQA = (selected: string): QuestionnaireType & { total: number } => {
    const questionNumber = findQuestionNumber(selected);
    const found = QuestionnaireDatas.find(
      q => q.questionNumber === questionNumber,
    );

    if (!found) {
      throw new Error(
        "API 요청 결과와 QuestionNumber가 매칭되지 않습니다. 요청 Response를 다시 확인해주세요",
      );
    }

    const total = findQuestionTotal(found);

    return { ...found, total };
  };

  const matched = matchQA(selectedQuestion);

  return (
    <div className="flex flex-col">
      <div className="flex gap-[20px]">
        <DashBoardTitle title="설문지 분석" />
        <DropdownFilter
          value={selectedQuestion}
          options={options}
          onChange={handleQuestion}
        />
      </div>
      <div className="w-[1360px] h-[662px] bg-gray02 rounded-[50px] px-[60px] py-[45px]">
        <p className="font-semibold text-[36px]">
          {matchQuestion(selectedQuestion)}
        </p>
        <div className="flex">
          <div className="w-[1240px] h-[490px] bg-gray01 mt-[40px] rounded-[40px] px-[40px] py-[30px] flex">
            <div className="flex flex-col gap-[20px]">
              {matched.contents.map((content, idx) => {
                return (
                  <div key={idx}>
                    <div className="rounded-[20px] bg-gray02 text-[20px] flex items-center h-[72px] w-[458px]">
                      <span className="mr-4 w-[64px] h-full flex items-center justify-center rounded-l-[20px] bg-blue-100 text-[32px]">
                        {idx + 1}
                      </span>
                      <p className="text-[20px] ml-[30px]">{content.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <p>전체 응시자 수 : {matched.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
