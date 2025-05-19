import { QuestionnaireListResponse } from "@/types/api/ApiResponseType";
import { http, HttpResponse } from "msw";

export const QuestionnaireDatas: QuestionnaireListResponse = {
  totalCount: 6840, // 전체 selectedCount의 총합
  surveys: [
    {
      surveyNumber: 1,
      contents: [
        { title: "포토 카드", selectedCount: 0, ratio: 0 },
        { title: "앨범 (CD)", selectedCount: 0, ratio: 0 },
        { title: "디지털 음원", selectedCount: 0, ratio: 0 },
      ],
    },
    {
      surveyNumber: 2,
      contents: [
        { title: "콘서트", selectedCount: 0, ratio: 0 },
        { title: "팬미팅", selectedCount: 0, ratio: 0 },
        { title: "사인회", selectedCount: 0, ratio: 0 },
        { title: "팬티켓팅", selectedCount: 0, ratio: 0 },
        { title: "음악방송", selectedCount: 0, ratio: 0 },
      ],
    },
    {
      surveyNumber: 3,
      contents: [
        { title: "티셔츠", selectedCount: 300, ratio: 24 },
        { title: "모자", selectedCount: 250, ratio: 20 },
        { title: "키링", selectedCount: 420, ratio: 34 },
      ],
    },
    {
      surveyNumber: 4,
      contents: [
        { title: "SNS 활동", selectedCount: 680, ratio: 54 },
        { title: "유튜브 컨텐츠", selectedCount: 590, ratio: 47 },
      ],
    },
    {
      surveyNumber: 5,
      contents: [
        { title: "리얼리티 프로그램", selectedCount: 480, ratio: 38 },
        { title: "예능 프로그램", selectedCount: 520, ratio: 42 },
        { title: "라디오 출연", selectedCount: 210, ratio: 17 },
      ],
    },
  ],
};

export const QuestionnaireHandlers = [
  http.get("/popups/:popupId/dashboard/surveys", () => {
    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: QuestionnaireDatas,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  }),
];
