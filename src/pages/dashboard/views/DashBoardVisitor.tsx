import {
    VisitorGenderData,
    VisitorAgeData,
  } from "@/mocks/handlers/dashboard/VisitorDatas";
  import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";
  import { PieChart, Pie, Cell } from "recharts";
  
  export default function DashBoardVisitor() {
    // 기본 색상 배열 - 그라데이션용
    const genderColors = ["#90C5FF", "#F48FB1"];
    const ageColors = ["#F48FB1", "#C5CCFF", "#90C5FF", "#B2EBF2"];
  
    // 차트 크기
    const SIZE = 180;
    // 그라데이션 반경 = outerRadius와 같게
    const RADIUS = 80;
  
    return (
      <div className="flex flex-col w-[660px] mx-auto">
        <DashBoardTitle title="팝업스토어 방문자 분석" />
  
        <div className="relative bg-gray02 rounded-[50px] pt-[92px] pb-[24px] px-[24px] h-[510px]">
          <div className="absolute top-[32px] left-[156px] text-[28px] text-gray09 font-pretendard font-semibold">
            성별
          </div>
          <div className="absolute top-[32px] right-[156px] text-[28px] text-gray09 font-pretendard font-semibold">
            나이
          </div>
  
          <div className="w-full h-full bg-gray01 rounded-[40px] p-[24px] flex gap-[100px] justify-center items-center">
            {/** === 성별 차트 === **/}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4 mb-[27px] h-[60px]">
                {VisitorGenderData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full ${
                        ["bg-blue04", "bg-main04"][i]
                      }`}
                    />
                    <span className="text-gray09 text-[18px] font-pretendard">
                      {d.name}
                    </span>
                  </div>
                ))}
              </div>
  
              <PieChart width={SIZE} height={SIZE}>
                <defs>
                  {genderColors.map((color, i) => (
                    <radialGradient
                      key={i}
                      id={`genderGrad${i}`}
                      gradientUnits="userSpaceOnUse"
                      cx="50%"
                      cy="50%"
                      r={RADIUS}
                    >
                      <stop offset={0} stopColor={color} stopOpacity={1} />
                      <stop offset={1} stopColor={color} stopOpacity={0.4} />
                    </radialGradient>
                  ))}
                </defs>
                <Pie
                  data={VisitorGenderData}
                  innerRadius={40}
                  outerRadius={RADIUS}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                >
                  {VisitorGenderData.map((_, idx) => (
                    <Cell key={idx} fill={`url(#genderGrad${idx})`} />
                  ))}
                </Pie>
              </PieChart>
            </div>
  
            {/** === 나이 차트 === **/}
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-2 gap-2 mb-[27px] h-[60px]">
                {VisitorAgeData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full ${
                        ["bg-main04", "bg-purple04", "bg-blue04", "bg-mint04"][i]
                      }`}
                    />
                    <span className="text-gray09 text-[18px] font-pretendard">
                      {d.name}
                    </span>
                  </div>
                ))}
              </div>
  
              <PieChart width={SIZE} height={SIZE}>
                <defs>
                  {ageColors.map((color, i) => (
                    <radialGradient
                      key={i}
                      id={`ageGrad${i}`}
                      gradientUnits="userSpaceOnUse"
                      cx="50%"
                      cy="50%"
                      r={RADIUS}
                    >
                      <stop offset={0} stopColor={color} stopOpacity={1} />
                      <stop offset={1} stopColor={color} stopOpacity={0.4} />
                    </radialGradient>
                  ))}
                </defs>
                <Pie
                  data={VisitorAgeData}
                  outerRadius={RADIUS}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                >
                  {VisitorAgeData.map((_, idx) => (
                    <Cell key={idx} fill={`url(#ageGrad${idx})`} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    );
  }
 