import type { TooltipProps } from "recharts";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { mapGenderData, mapAgeData } from "@/utils/VisitorColorMapper";
import {
  VisitorGenderData,
  VisitorAgeData,
} from "@/mocks/handlers/dashboard/VisitorDatas";
import DashBoardTitle from "@/pages/dashboard/views/DashBoardTitle";
import CustomTooltip from "@/components/common/CustomTooltip";

const SIZE = 180;
const RADIUS = 80;

export default function DashBoardVisitor() {
  const genderData = mapGenderData(VisitorGenderData);
  const ageData = mapAgeData(VisitorAgeData);

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
                    id={d.fillId}
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
                cursor={{ fill: "transparent" }}
                content={(props: TooltipProps<number, string>) => {
                  const targetPayload = props.payload?.[0]?.payload;
                  return (
                    <CustomTooltip
                      active={props.active}
                      payload={[
                        {
                          value: targetPayload?.value,
                          name: targetPayload?.name,
                          dataKey: props.payload?.[0]?.dataKey as string,
                        },
                      ]}
                      label={targetPayload?.name}
                      unitSuffix="명"
                      highlightColor={targetPayload?.rawFill}
                    />
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
                {genderData.map((d, idx) => (
                  <Cell key={idx} fill={`url(#${d.fillId})`} />
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
                    id={d.fillId}
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
                  const targetPayload = props.payload?.[0]?.payload;
                  return (
                    <CustomTooltip
                      active={props.active}
                      payload={[
                        {
                          value: targetPayload?.value,
                          name: targetPayload?.name,
                          dataKey: props.payload?.[0]?.dataKey as string,
                        },
                      ]}
                      label={targetPayload?.name}
                      unitSuffix="명"
                      highlightColor={targetPayload?.rawFill}
                    />
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
                {ageData.map((d, idx) => (
                  <Cell key={idx} fill={`url(#${d.fillId})`} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
