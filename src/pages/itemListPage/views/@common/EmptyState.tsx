const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <p className="text-[32px] text-gray10 font-medium">
        등록된 상품이 아직 없습니다
      </p>
      <p className="mt-4 text-[20px] text-gray10">
        우측 상단 <span className="text-main06">상품 등록 버튼</span>을 눌러
        상품을 등록해주세요!
      </p>
    </div>
  );
};
export default EmptyState;
