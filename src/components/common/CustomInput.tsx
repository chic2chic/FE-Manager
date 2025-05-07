/**
 * @Description
 * 온보딩 로그인 페이지에서 사용되는 타이틀 & 인풋 태그입니다
 * 온보딩 페이지와 상품 등록 페이지에서 공통적으로 사용됩니다
 */

import React from "react";

type Props = {
  inputType?: "password";
  isOnlyNumber?: boolean;
  title: string;
  titleType?: "ko" | "en";
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  placeholder: string;
  width?: number;
  height?: number;
};

export default function CustomInput({
  inputType,
  isOnlyNumber = false,
  title,
  titleType = "ko",
  onChange,
  value,
  placeholder,
  width = 500,
  height = 60,
}: Props) {
  const numberHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (isOnlyNumber) {
      const input = e.currentTarget;
      const numericValue = input.value.replace(/[^0-9]/g, "");

      if (input.value !== numericValue) {
        input.value = numericValue;

        const event = new Event("input", { bubbles: true });
        input.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p lang={titleType} className="text-[20px] font-semibold">
        {title}
      </p>
      <input
        className="border rounded-full pl-[24px] border-gray05 bg-gray02 placeholder:text-gray07 text-gray10 text-[19px] transition-all duration-200 focus:border-gray09 focus:outline-none"
        style={{ width: `${width}px`, height: `${height}px` }}
        type={inputType || "text"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onInput={isOnlyNumber ? numberHandler : undefined}
      />
    </div>
  );
}
