import type { TooltipProps } from "recharts";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { mapGenderData, mapAgeData } from "@/utils/VisitorColorMapper";
import {
  VisitorGenderData,
  VisitorAgeData,
} from "@/mocks/handlers/dashboard/VisitorDatas";
import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";

type SegmentDatum = {
  name: string;
  value: number;
  rawFill: string;
};

export default function DashBoardVisitor() {
  const SIZE = 180;
  const RADIUS = 80;

  const genderData = mapGenderData(VisitorGenderData);
  const ageData    = mapAgeData(VisitorAgeData);

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
          {/* ───────── 성별 차트 ───────── */}
          <div className="flex flex-col items-center">
            {/* 범례 */}
            <div className="flex items-center gap-4 mb-[27px] h-[60px]">
              {genderData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: d.rawFill }}
                  />
                  <span className="text-gray09 text-[18px] font-pretendard">
                    {d.name}
                  </span>
                </div>
              ))}
            </div>

            <PieChart width={SIZE} height={SIZE}>
              <defs>
                {genderData.map((d, i) => (
                  <radialGradient
                    key={i}
                    id={`genderGrad${i}`}
                    gradientUnits="userSpaceOnUse"
                    cx="50%"
                    cy="50%"
                    r={RADIUS}
                  >
                    <stop offset="0%" stopColor={d.rawFill} stopOpacity={1} />
                    <stop
                      offset="100%"
                      stopColor={d.rawFill}
                      stopOpacity={0.4}
                    />
                  </radialGradient>
                ))}
              </defs>

              <Tooltip
                content={(props: TooltipProps<number, string>) => {
                  const { active, payload } = props;
                  if (!active || !payload || !payload.length) return null;
                  const { name, value, rawFill } =
                    payload[0].payload as SegmentDatum;

                  return (
                    <div className="bg-white border border-gray02 rounded-md p-2 shadow-sm">
                      {/* 1. 첫 줄: 카테고리 이름 */}
                      <p className="m-0 text-[18px] text-gray09 font-semibold mb-1">
                        {name}
                      </p>
                      {/* 2. 둘째 줄: 숫자만 컬러, 나머진 회색 */}
                      <p className="m-0 text-[17px] text-gray07 font-semibold">
                        <span style={{ color: rawFill }}>{value}</span>명
                      </p>
                    </div>
                  );
                }}
              />

              <Pie
                data={genderData}
                innerRadius={40}
                outerRadius={RADIUS}
                dataKey="value"
                cx="50%"
                cy="50%"
              >
                {genderData.map((_, idx) => (
                  <Cell key={idx} fill={`url(#genderGrad${idx})`} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* ───────── 나이 차트 ───────── */}
          <div className="flex flex-col items-center">
            {/* 범례 */}
            <div className="grid grid-cols-2 gap-2 mb-[27px] h-[60px]">
              {ageData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: d.rawFill }}
                  />
                  <span className="text-gray09 text-[18px] font-pretendard">
                    {d.name}
                  </span>
                </div>
              ))}
            </div>

            <PieChart width={SIZE} height={SIZE}>
              <defs>
                {ageData.map((d, i) => (
                  <radialGradient
                    key={i}
                    id={`ageGrad${i}`}
                    gradientUnits="userSpaceOnUse"
                    cx="50%"
                    cy="50%"
                    r={RADIUS}
                  >
                    <stop offset="0%" stopColor={d.rawFill} stopOpacity={1} />
                    <stop
                      offset="100%"
                      stopColor={d.rawFill}
                      stopOpacity={0.4}
                    />
                  </radialGradient>
                ))}
              </defs>

              <Tooltip
                content={(props: TooltipProps<number, string>) => {
                  const { active, payload } = props;
                  if (!active || !payload || !payload.length) return null;
                  const { name, value, rawFill } =
                    payload[0].payload as SegmentDatum;

                  return (
                    <div className="bg-white border border-gray02 rounded-md p-2 shadow-sm">
                      <p className="m-0 text-[18px] text-gray09 font-semibold mb-1">
                        {name}
                      </p>
                      <p className="m-0 text-[17px] text-gray07 font-semibold">
                        <span style={{ color: rawFill }}>{value}</span>명
                      </p>
                    </div>
                  );
                }}
              />

              <Pie
                data={ageData}
                outerRadius={RADIUS}
                dataKey="value"
                cx="50%"
                cy="50%"
              >
                {ageData.map((_, idx) => (
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
