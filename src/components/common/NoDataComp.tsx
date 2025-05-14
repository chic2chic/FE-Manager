import sad from "@/assets/webps/dashboard/sad.webp";

export default function NoDataComp() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="mb-4">
        <img src={sad} width={40} />
      </div>
      <h3 className="text-[24px] font-semibold text-gray09 mb-2">
        조회된 데이터가 없습니다
      </h3>
      <p className="text-[18px] text-gray07">아직 데이터가 없어요</p>
    </div>
  );
}
