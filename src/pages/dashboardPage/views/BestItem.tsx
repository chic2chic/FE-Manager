import { useState } from "react";
import { GenderOptions, AgeOptions } from "@/constants/dashboard/PersonInfo";
import { DropdownFilter } from "@/components/common/DropdownFilter";
import itemImage from "@/assets/webps/itemList/item-img.webp";
import DashBoardTitle from "@/pages/dashboardPage/views/DashBoardTitle";
import { AgeOptionsType, GenderOptionsType } from "@/types/DashboardType";
import { useBestItemsApi } from "@/hooks/api/useDashboardApi";
import NoDataCompt from "@/components/common/NoDataComp";

const cardBgClass: Record<number, string> = {
  1: "bg-purple01",
  2: "bg-blue01",
  3: "bg-mint01",
};

const badgeBgClass: Record<number, string> = {
  1: "bg-purple07",
  2: "bg-blue07",
  3: "bg-mint07",
};

export default function BestItem() {
  const [gender, setGender] = useState<GenderOptionsType>("남성");
  const [age, setAge] = useState<AgeOptionsType>(10);
  const { data } = useBestItemsApi({ gender, age });

  const handleAgeChange = (value: string) => {
    const numericAge = parseInt(value.replace("대", ""));
    setAge(numericAge as AgeOptionsType);
  };

  return (
    <div>
      {/* 헤더 + 카테고리 */}
      <div className="flex items-start gap-6">
        <DashBoardTitle title="실시간 인기상품" />
        {/* 필터 버튼 바로 옆에 위치 */}
        <div className="flex gap-4 ">
          <DropdownFilter
            value={gender}
            options={GenderOptions}
            onChange={setGender}
          />
          <DropdownFilter
            value={`${age}대`}
            options={AgeOptions}
            onChange={handleAgeChange}
          />
        </div>
      </div>

      {/* 베스트 상품 리스트 */}
      {data && data.length > 0 ? (
        <div className="flex justify-center gap-[60px] mt-2">
          {data.map((item, index) => (
            <div
              key={item.itemId}
              className={`
                relative flex flex-col items-center justify-center
                w-[400px] rounded-[50px] px-[33px] pb-9
                ${cardBgClass[index + 1]}
              `}
            >
              {/* 순위 뱃지 */}
              <div
                className={`
                  absolute -top-[20px] -left-[20px]
                  w-[56px] h-[56px] rounded-full
                  text-white font-bold text-[30px]
                  flex items-center justify-center 
                  ${badgeBgClass[index + 1]}
                `}
              >
                {index + 1}
              </div>

              {/* 상품 이미지 */}
              <div className="mb-6">
                <img
                  src={itemImage}
                  alt={item.title}
                  className="w-[334px] h-[334px] object-cover mt-9 mb-4"
                />
              </div>

              {/* 상품 정보 */}
              <div className="text-center">
                <div className="text-[24px] mb-2 text-gray10 font-semibold leading-[132%] tracking-[-0.48px] font-pretendard">
                  {item.title}
                </div>
                <div className="text-[20px] text-gray08 font-medium leading-[132%] tracking-[-0.36px] mt-1 font-pretendard">
                  {item.price.toLocaleString()}원<br />
                  남은재고 : {item.stock}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-[60px] mt-2 h-[300px]">
          <NoDataCompt />
        </div>
      )}
    </div>
  );
}
