import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CustomErrorFallback from "./CustomErrorFallback";

type Props = {
  children: React.ReactNode;
};

export default function CustomErrorBoundary({ children }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={CustomErrorFallback}>
          <Suspense fallback={<div>로딩 컴포넌트</div>}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
