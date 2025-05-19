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
  isPatchMode?: boolean;
  onKeyDown?: (_e: React.KeyboardEvent) => void;
  maxValue?: number;
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
  isPatchMode = false,
  onKeyDown,
  maxValue,
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

  const adjustedValue =
    maxValue !== undefined && typeof value === "number"
      ? value > maxValue
        ? maxValue
        : value
      : value;

  return (
    <div className="flex flex-col gap-2">
      <p lang={titleType} className="text-[20px] font-semibold">
        {title}
      </p>
      {isPatchMode ? (
        <div
          className="relative"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="border rounded-full pl-[24px] border-gray05 bg-gray02 placeholder:text-gray07 text-gray10 text-[19px] focus:border-gray09 focus:outline-none absolute w-full h-full flex items-center">
            {value}
          </div>
          <div className="absolute inset-0 rounded-full bg-gray10/30 flex items-center justify-center z-10" />
        </div>
      ) : (
        <input
          className="border rounded-full pl-[24px] border-gray05 bg-gray02 placeholder:text-gray07 text-gray10 text-[19px] transition-all duration-200 focus:border-gray09 focus:outline-none"
          style={{ width: `${width}px`, height: `${height}px` }}
          type={inputType || "text"}
          placeholder={placeholder}
          onChange={onChange}
          value={adjustedValue}
          onInput={isOnlyNumber ? numberHandler : undefined}
          onKeyDown={onKeyDown ? onKeyDown : () => {}}
        />
      )}
    </div>
  );
}
