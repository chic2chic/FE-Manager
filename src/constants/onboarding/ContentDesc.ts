import TestImage from "@/assets/webps/onBoarding/test.png";

export type OnBoardingContentType = {
  id: number;
  title: string;
  imagePath: string;
  desc: string[];
};

export const ContentDesc: OnBoardingContentType[] = [
  {
    id: 1,
    title: "팝업 스토어 관리 서비스",
    imagePath: TestImage,
    desc: [
      "K-pop 팝업 스토어, 이젠 직원 없이도 완벽하게!",
      "PoPI",
      "와 함께 스마트한 무인 매장 관리를 경험하세요!",
    ],
  },
  {
    id: 2,
    title: "혼잡도 분석을 받아보세요!",
    imagePath: TestImage,
    desc: [
      "실시간으로 매장에 있는 인원을 확인할 수 있어요",
      "PoPI",
      "의 혼잡도 분석으로 피크 타임을 미리 예측하세요!",
    ],
  },
  {
    id: 3,
    title: "체류시간 분석 리포트",
    imagePath: TestImage,
    desc: [
      "어떤 상품이 팬들의 시선을 가장 오래 사로잡나요? ",
      "카메라 기반 체류시간 분석으로 인기 상품을 발견하세요!",
    ],
  },
  {
    id: 4,
    title: "설문지를 작성해보세요!",
    imagePath: TestImage,
    desc: [
      "K-pop 팬들의 취향은 빠르게 변합니다.",
      "설문지를 작성하고 분석 리포트를 받아보세요!",
    ],
  },
];
