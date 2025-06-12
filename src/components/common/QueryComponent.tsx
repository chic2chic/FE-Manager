/**
 * @description
 * React Query 요청의 로딩, 에러, 빈 데이터 상태를 공통 처리하는 래퍼 컴포넌트입니다.
 * - `data`, `isLoading`, `isError` 상태에 따라 적절한 fallback UI를 렌더링하고,
 * - 데이터가 존재할 경우 `children` 함수로 실제 UI를 렌더링합니다.
 *
 * @example
 * <QueryComponent
 *   data={data}
 *   isLoading={isLoading}
 *   isError={isError}
 * >
 *   {(data) => <MyList data={data} />}
 * </QueryComponent>
 */

import React from "react";
import Skeleton from "../ui/Skeleton";
import NoDataComp from "../../pages/dashboardPage/views/@common/NoDataComp";

type Props<T> = {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode | ((_error: Error) => React.ReactNode);
  emptyFallback?: React.ReactNode;
  children: (_data: T) => React.ReactNode;
};

const QueryComponent = <T,>({
  data,
  isLoading,
  isError,
  loadingFallback = (
    <div className="h-[300px]">
      <Skeleton />
    </div>
  ),
  errorFallback,
  emptyFallback = <NoDataComp />,
  children,
}: Props<T>) => {
  if (isLoading) return <>{loadingFallback}</>;
  if (isError) return <>{errorFallback}</>;
  if (
    data === null ||
    data === undefined ||
    (Array.isArray(data) && data.length === 0)
  ) {
    return emptyFallback ? <>{emptyFallback}</> : null;
  }
  return <>{children(data)}</>;
};

export default QueryComponent;
