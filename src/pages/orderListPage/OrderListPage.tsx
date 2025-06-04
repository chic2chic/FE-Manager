import { useGetOrderListApi } from "@/hooks/api/useOrderListApi";

export default function OrderListPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetOrderListApi({ size: 5 });
  const orderList = data?.pages.flatMap(item => item.data.content);

  const getStateText = (state: string) => {
    switch (state) {
      case "PENDING":
        return (
          <div className="flex w-full justify-center gap-2">
            <button className="cursor-pointer px-4 py-2 border rounded-full bg-gray10 text-gray01 hover:bg-gray08">
              승인
            </button>
            <button className="cursor-pointer px-4 py-2 border rounded-full hover:bg-gray03">
              취소
            </button>
          </div>
        );
      case "CONFIRMED":
        return <span>완료</span>;
      case "CANCELLED":
        return <span>취소</span>;
      default:
        return state;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="bg-gray01 rounded-lg border border-gray04 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray04">
          <h2 className="text-3xl font-semibold text-gray10">주문 목록</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray02 border-b border-gray04">
                <th className="px-6 py-4 text-left text-xl font-medium text-gray10 uppercase">
                  번호
                </th>
                <th className="px-6 py-4 text-left text-xl font-medium text-gray10 uppercase">
                  상품명
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-gray10 uppercase">
                  추천 개수
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-gray10 uppercase">
                  실제 발주 개수
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-gray10 uppercase">
                  최근 입고일시
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-gray10 uppercase">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray01 divide-y divide-gray04">
              {orderList && orderList.length > 0 ? (
                orderList.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray02 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray10">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-medium text-gray10">
                        {item.itemName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-lg font-semibold text-gray10">
                        {item.recommendQuantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <input
                        className="text-lg font-semibold text-gray10 w-20 px-2 py-1 border border-gray05 rounded bg-gray01 text-center"
                        placeholder={String(item.realQuantity)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-lg text-gray09">
                      {formatDate(item.lastUpdated)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStateText(item.state)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray08">
                      <p className="text-sm">주문 데이터가 없습니다.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center">
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-3 bg-main07 text-gray01 text-xl rounded-full hover:bg-main05 disabled:opacity-50"
          >
            {isFetchingNextPage ? "로딩 중" : "더보기"}
          </button>
        ) : (
          <p className="text-gray08 text-xl">모든 주문을 확인했습니다.</p>
        )}
      </div>
    </div>
  );
}
