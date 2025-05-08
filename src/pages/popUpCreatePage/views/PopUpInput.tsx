import React, { useState } from "react";

type Props = {
  placeholder: string;
  cssOption?: string;
  isOnlyNumber?: boolean;
  isTimeFormat?: boolean;
  isLimit?: boolean;
  minTime?: number;
  maxTime?: number;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PopUpInput({
  placeholder,
  cssOption,
  isOnlyNumber = false,
  isTimeFormat = false,
  isLimit = false,
  minTime = 0,
  maxTime = 24,
  onChange,
}: Props) {
  const [value, setValue] = useState("");

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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if ((isTimeFormat || isLimit) && e.target.value) {
      const numValue = parseInt(e.target.value, 10);
      let correctedValue = numValue;

      if (numValue < minTime) correctedValue = minTime;
      if (numValue > maxTime) correctedValue = maxTime;

      if (numValue !== correctedValue) {
        setValue(String(correctedValue));

        const syntheticEvent = {
          target: { value: String(correctedValue) },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <input
      className={`rounded-full placeholder:text-gray08 border-gray05 border px-[24px] py-[16px] text-[16px] font-medium ${cssOption} transition-all duration-200 focus:border-gray09 focus:outline-none`}
      placeholder={`${placeholder}`}
      value={value}
      onChange={handleChange}
      onInput={isOnlyNumber ? numberHandler : undefined}
      onBlur={isTimeFormat || isLimit ? handleBlur : undefined}
      maxLength={isTimeFormat ? 2 : undefined}
    />
  );
}
