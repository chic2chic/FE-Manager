import DashBoardTitle from "@/pages/dashboardPage/views/DashBoardTitle";
import { useBestItemsApi } from "@/hooks/api/useDashboardApi";
import NoDataCompt from "@/components/common/NoDataComp";
import Skeleton from "@/components/common/Skeleton";
import { useState } from "react";

type BestItemImageProps = {
  src: string;
  alt: string;
};

type BestItemCardProps = {
  item: {
    itemId: number;
    imagePath: string;
    title: string;
    price: number;
    stock: number;
  };
  index: number;
};

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

// 이미지 (Skeleton UI 포함)
const BestItemImage = ({ src, alt }: BestItemImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-[334px] h-[334px] mt-9 mb-3">
      {!isLoaded && (
        <div className="w-full h-full rounded-[20px] overflow-hidden">
          <Skeleton />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

// Card UI
const BestItemCard = ({ item, index }: BestItemCardProps) => {
  return (
    <div
      key={item.itemId}
      className={`
                relative flex flex-col items-center justify-center
                w-[400px] h-[512px] rounded-[50px] px-[33px] pb-9
                ${cardBgClass[index + 1]}
              `}
      data-testid={`dashboard-bestItems-${index}`}
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
      <div className="mb-2">
        <BestItemImage src={item.imagePath} alt={item.title} />
      </div>

      {/* 상품 정보 */}
      <div className="text-center">
        <div className="truncate max-w-[320px] text-[24px] mb-[6px] text-gray10 font-semibold leading-[132%] tracking-[-0.48px] font-pretendard">
          {item.title}
        </div>
        <div className="truncate max-w-[320px] text-[20px] text-gray11 font-medium leading-[132%] tracking-[-0.36px] font-pretendard">
          {item.price.toLocaleString("ko-KR")} 원<br />
          남은재고 : {item.stock}
        </div>
      </div>
    </div>
  );
};

export default function BestItem() {
  const { data, isLoading } = useBestItemsApi();

  return (
    <div data-testid="dashboard-bestItems">
      {/* Title */}
      <div className="flex items-start gap-6">
        <DashBoardTitle title="실시간 인기상품" />
      </div>

      {/* 인기 상품 카드 */}
      {isLoading ? (
        // Skeleton UI
        <div className="flex justify-center gap-[60px] mt-2">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className="w-[400px] h-[512px] rounded-[50px] overflow-hidden"
            >
              <Skeleton />
            </div>
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="flex justify-center gap-[60px] mt-2">
          {data.map((item, index) => (
            <BestItemCard key={item.itemId} item={item} index={index} />
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
