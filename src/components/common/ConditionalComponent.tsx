import React from "react";

function ConditionalComponent<T>({
  when,
  fallback,
  children,
}: {
  when: T | undefined | null | false | boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode | ((_data: T) => React.ReactNode);
}) {
  if (!when || (Array.isArray(when) && when.length === 0))
    return <>{fallback}</>;

  if (typeof children === "function" && typeof when !== "boolean") {
    return <>{children(when)}</>;
  }

  return <>{children}</>;
}

export default ConditionalComponent;
