import React, { useEffect } from "react";

export default function useClickOutside(
  refs: React.RefObject<HTMLElement>[],
  isOpenStates: boolean[],
  onClickOutside: (_index: number) => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      refs.forEach((ref, index) => {
        if (
          isOpenStates[index] &&
          ref.current &&
          !ref.current.contains(event.target as Node)
        ) {
          onClickOutside(index);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, isOpenStates, onClickOutside]);
}
