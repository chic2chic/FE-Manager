import React from "react";
import Skeleton from "./Skeleton";
import NoDataComp from "./NoDataComp";

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

export const QueryComponent = <T,>({
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
