import React from "react";

type Props = {
  placeholder: string;
  cssOption?: string;
  isOnlyNumber?: boolean;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PopUpInput({
  placeholder,
  cssOption,
  isOnlyNumber = false,
  onChange,
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
    <input
      className={`rounded-full placeholder:text-gray08 border-gray05 border px-[24px] py-[16px] text-[16px] font-medium ${cssOption} transition-all duration-200 focus:border-gray09 focus:outline-none`}
      placeholder={`${placeholder}`}
      onChange={onChange}
      onInput={isOnlyNumber ? numberHandler : undefined}
    />
  );
}
