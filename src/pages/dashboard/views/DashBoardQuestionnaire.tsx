import { DropdownFilter } from "@/components/common/DropdownFilter";
import DashBoardTitle from "./DashBoardTitle";
import { useState } from "react";
import { Questions } from "@/constants/popUpCreate/Questions";
import { QuestionnaireDatas } from "@/mocks/handlers/dashboard/Questionnaire";
import { QuestionnaireType } from "@/types/QuestionnaireType";
import { Cell, Pie, PieChart, Tooltip, TooltipProps } from "recharts";
import CustomTooltip from "@/components/common/CustomTooltip";

const options = ["1번 문항", "2번 문항", "3번 문항", "4번 문항"];
const SIZE = 300;
const RADIUS = 150;
const colorSet = ["#ff7caf", "#cacafb", "#a2c9ff", "#c5efe8", "#ffd0a1"];

// "1번 문항" 과 같은 텍스트에서 번호를 추출하여 선택된 QuestionNumber를 리턴합니다.
const findQuestionNumber = (selected: string) => {
  const regex = /[0-9]+/;
  return Number(selected.match(regex));
};

// 각 문항마다 전체 응시자 수를 계산합니다.
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

  // 클라이언트에서 관리하는 상수 데이터를 재사용합니다. (DB에서 title을 저장하지 않도록 하기 위함)
  const matchQuestion = (selected: string): string => {
    const questionNumber = findQuestionNumber(selected);
    const target = Questions.find(q => q.questionNumber === questionNumber);
    return `Q${target?.questionNumber}. ${target?.title}`;
  };

  // API로부터 호출하여 받아온 데이터에서 questionNumber에 맞는 답변 데이터를 추출하여 반환합니다.
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
          <div className="w-[1240px] h-[490px] bg-gray01 mt-[40px] rounded-[40px] px-[40px] py-[30px] flex justify-between">
            {/** 왼쪽 - 설문 답변 리스트 */}
            <div className="flex flex-col gap-[20px] w-[458px]">
              {matched.contents.map((content, idx) => {
                return (
                  <div key={idx}>
                    <div className="rounded-[20px] bg-gray02 text-[20px] flex items-center h-[72px] w-full">
                      <span className="mr-4 w-[64px] h-full flex items-center justify-center rounded-l-[20px] text-[32px] bg-blue02">
                        {idx + 1}
                      </span>
                      <p className="text-[20px] ml-[30px]">{content.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/** 오른쪽 - 파이 차트 */}
            <div className="flex flex-col items-end h-full">
              <p className="text-[20px] font-medium text-gray08">
                전체 응시자 수: {matched.total}명
              </p>
              <div className="flex justify-center gap-[80px] items-center">
                <PieChart width={SIZE} height={SIZE}>
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    content={(props: TooltipProps<number, string>) => {
                      if (
                        !props.active ||
                        !props.payload ||
                        props.payload.length === 0
                      )
                        return null;

                      const targetPayload = props.payload[0].payload;
                      return (
                        <CustomTooltip
                          active={props.active}
                          payload={[
                            {
                              value: targetPayload.numOfRespondents,
                              name: targetPayload.title,
                              dataKey: "numOfRespondents",
                            },
                          ]}
                          label={targetPayload.title}
                          unitSuffix="명"
                          highlightColor={
                            colorSet[
                              props.payload[0].dataKey === "numOfRespondents"
                                ? matched.contents.findIndex(
                                    c => c.title === targetPayload.title,
                                  ) % colorSet.length
                                : 0
                            ]
                          }
                        />
                      );
                    }}
                  />

                  <Pie
                    data={matched.contents}
                    innerRadius={0}
                    outerRadius={RADIUS}
                    dataKey="numOfRespondents"
                    nameKey="title"
                    cx="50%"
                    cy="50%"
                    paddingAngle={0}
                  >
                    {matched.contents.map((_, idx) => (
                      <Cell key={idx} fill={colorSet[idx % colorSet.length]} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 h-[100px]">
                  {matched.contents.map((_, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span
                        className="w-[38px] h-[18px] rounded-[8px]"
                        style={{
                          backgroundColor: colorSet[idx % colorSet.length],
                        }}
                      />
                      <span>{idx + 1}번</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
