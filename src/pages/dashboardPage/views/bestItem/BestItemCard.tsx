import { BestItemCardImage } from "@/pages/dashboardPage/views/bestItem/BestItemCardImage";

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

// Card UI
export const BestItemCard = ({ item, index }: BestItemCardProps) => {
  return (
    <div
      key={item.itemId}
      className={`relative flex flex-col items-center justify-center w-[400px] h-[512px] rounded-[50px] px-[33px] pb-9 ${cardBgClass[index + 1]}`}
      data-testid={`dashboard-bestItems-${index}`}
    >
      {/* 순위 뱃지 */}
      <div
        className={`absolute -top-[20px] -left-[20px] w-[56px] h-[56px] rounded-full text-white font-bold text-[30px] flex items-center justify-center ${badgeBgClass[index + 1]}`}
      >
        {index + 1}
      </div>

      {/* 상품 이미지 */}
      <div className="mb-2">
        <BestItemCardImage src={item.imagePath} alt={item.title} />
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
