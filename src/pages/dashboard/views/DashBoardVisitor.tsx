import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";
import VisitorPieChart, { SegmentDatum } from "./VisitorPieChart";
import { mapGenderData, mapAgeData } from "@/utils/VisitorColorMapper";
import {
  VisitorGenderData,
  VisitorAgeData,
} from "@/mocks/handlers/dashboard/VisitorDatas";

export default function DashBoardVisitor() {
  const genderData: SegmentDatum[] = mapGenderData(VisitorGenderData);
  const ageData: SegmentDatum[] = mapAgeData(VisitorAgeData);

  return (
    <div className="flex flex-col w-[660px] mx-auto">
      <DashBoardTitle title="팝업스토어 방문자 분석" />

      <div className="relative bg-gray02 rounded-[50px] pt-[92px] pb-[24px] px-[24px] h-[510px]">
        {/* 레이블 */}
        <div className="absolute top-[32px] left-[156px] text-[28px] text-gray09 font-pretendard font-semibold">
          성별
        </div>
        <div className="absolute top-[32px] right-[156px] text-[28px] text-gray09 font-pretendard font-semibold">
          나이
        </div>

        <div className="w-full h-full bg-gray01 rounded-[40px] p-[24px] flex gap-[100px] justify-center items-center">
          <VisitorPieChart
            data={genderData}
            gradIdPrefix="genderGrad"
            innerRadius={40}
          />
          <VisitorPieChart data={ageData} gradIdPrefix="ageGrad" />
        </div>
      </div>
    </div>
  );
}
