import DashBoardTitle from "@/pages/dashboardPage/views/DashBoardTitle";
import { mapGenderData, mapAgeData } from "@/utils/VisitorColorMapper";
import VisitorPieChart from "@/pages/dashboardPage/views/VisitorPieChart";
import { useVisitorStatsApi } from "@/hooks/api/useDashboardApi";
import NoDataComp from "@/components/common/NoDataComp";
import { QueryComponent } from "@/components/common/QueryComponent";
import Skeleton from "@/components/common/Skeleton";

export default function DashBoardVisitor() {
  const { gender, age, isLoading, isError } = useVisitorStatsApi();
  const isEmpty = !gender || gender.length === 0 || !age || age.length === 0;

  return (
    <div className="flex flex-col w-[660px]" data-testid="dashboard-visitor">
      <DashBoardTitle title="팝업스토어 방문자 분석" />

      <div className="relative bg-gray02 w-[660px] h-[510px] rounded-[50px] pt-[92px] pb-[24px] px-[24px]">
        {/* 레이블 */}
        <div className="absolute top-[32px] left-[156px] text-[28px] text-gray09 font-pretendard font-semibold">
          성별
        </div>
        <div className="absolute top-[32px] right-[156px] text-[28px] text-gray09 font-pretendard font-semibold">
          나이
        </div>

        {/* 그래프 영역 */}
        <QueryComponent
          data={isEmpty ? undefined : { gender, age }}
          isLoading={isLoading}
          isError={isError}
          loadingFallback={
            <div className="absolute bottom-6 w-[612px] h-[394px] rounded-[40px] flex items-center justify-center overflow-hidden">
              <Skeleton />
            </div>
          }
          emptyFallback={
            <div className="absolute bottom-6 w-[612px] h-[394px] rounded-[40px] flex items-center justify-center overflow-hidden">
              <NoDataComp />
            </div>
          }
        >
          {({ gender, age }) => {
            const genderData = mapGenderData(gender);
            const ageData = mapAgeData(age);

            return (
              // 그래프
              <div className="absolute bottom-6 w-[612px] h-[394px] rounded-[40px] flex items-center justify-center overflow-hidden">
                <VisitorPieChart
                  data={genderData}
                  gradIdPrefix="genderGrad"
                  innerRadius={40}
                />
                <VisitorPieChart data={ageData} gradIdPrefix="ageGrad" />
              </div>
            );
          }}
        </QueryComponent>
      </div>
    </div>
  );
}
