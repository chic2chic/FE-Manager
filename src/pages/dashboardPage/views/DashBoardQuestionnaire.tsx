import { useState } from "react";
import { DropdownFilter } from "@/components/common/DropdownFilter";
import { Cell, Pie, PieChart, Tooltip, TooltipProps } from "recharts";
import DashBoardTitle from "@/pages/dashboardPage/views/DashBoardTitle";
import CustomTooltip from "@/components/common/CustomTooltip";
import { useQuestionnaireApi } from "@/hooks/api/useDashboardApi";
import { QuestionnaireResponse } from "@/types/api/ApiResponseType";

const options = ["1번 문항", "2번 문항", "3번 문항", "4번 문항"];
const SIZE = 300;
const RADIUS = 150;
const colorSet = ["#ff7caf", "#cacafb", "#a2c9ff", "#c5efe8", "#ffd0a1"];

// "1번 문항"에서 숫자만 추출 (ex. "1번 문항" → 1)
const findQuestionNumber = (selected: string) => {
  const regex = /[0-9]+/;
  return Number(selected.match(regex));
};

// 응답자 수 총합 계산
const findQuestionTotal = (questionnaireData: QuestionnaireResponse) => {
  return questionnaireData.contents.reduce(
    (sum, content) => sum + content.selectedCount,
    0,
  );
};

// 선택된 문항 번호에 해당하는 설문 데이터 반환
const matchQA = (
  selected: string,
  surveys: QuestionnaireResponse[],
): QuestionnaireResponse & { total: number } => {
  const questionNumber = findQuestionNumber(selected);
  const found = surveys.find(q => q.surveyNumber === questionNumber);

  if (!found) {
    throw new Error("설문 항목을 찾을 수 없습니다.");
  }

  const total = findQuestionTotal(found);
  return { ...found, total };
};

export default function DashBoardQuestionnaire() {
  const [selectedQuestion, setSelectedQuestion] = useState(options[0]);
  const { surveys, isLoading, isError } = useQuestionnaireApi();

  const handleQuestion = (selected: string) => {
    setSelectedQuestion(selected);
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !surveys) return <p>데이터를 불러오는 데 실패했습니다.</p>;

  const matched = matchQA(selectedQuestion, surveys);
  const questionNumber = findQuestionNumber(selectedQuestion);

  return (
    <div className="flex flex-col">
      <div className="relative flex gap-[20px]">
        <DashBoardTitle title="설문지 분석" />
        <div className="ml-2">
          <DropdownFilter
            value={selectedQuestion}
            options={options}
            onChange={handleQuestion}
          />
        </div>
      </div>
      <div className="w-[1360px] h-[662px] bg-gray02 rounded-[50px] px-[60px] py-[45px]">
        <p className="font-semibold text-[36px]">
          Q{questionNumber}. 문항 {questionNumber}
        </p>
        <div className="flex">
          <div className="w-[1240px] h-[490px] bg-gray01 mt-[40px] rounded-[40px] px-[40px] py-[30px] flex justify-between">
            {/* 왼쪽 - 답변 리스트 */}
            <div className="flex flex-col gap-[20px] w-[458px]">
              {matched.contents.map((content, idx) => (
                <div key={idx}>
                  <div className="rounded-[20px] bg-gray02 text-[20px] flex items-center h-[72px] w-full">
                    <span className="mr-4 w-[64px] h-full flex items-center justify-center rounded-l-[20px] text-[32px] bg-blue02">
                      {idx + 1}
                    </span>
                    <p className="text-[20px] ml-[30px]">{content.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 오른쪽 - 파이 차트 */}
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
                              value: targetPayload.selectedCount,
                              name: targetPayload.title,
                              dataKey: "selectedCount",
                            },
                          ]}
                          label={targetPayload.title}
                          unitSuffix="명"
                          highlightColor={
                            colorSet[
                              props.payload[0].dataKey === "selectedCount"
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
                    dataKey="selectedCount"
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
