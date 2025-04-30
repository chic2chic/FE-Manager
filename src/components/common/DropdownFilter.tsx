import { useState, useRef, useEffect } from "react";
import optionBar from "@/assets/webps/common/option-bar.webp";

interface DropdownFilterProps {
  value: string;
  options: readonly string[];
  onChange: (_value: string) => void;
  buttonGap?: string;
}

export function DropdownFilter({
  value,
  options,
  onChange,
  buttonGap,
}: DropdownFilterProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center ${buttonGap ?? "gap-2"}
        border ${open ? "border-gray09" : "border-gray07"}
        ${value ? "text-gray10" : "text-gray09"}
        px-4 py-2 rounded-full text-[20px] cursor-pointer
        transition-colors duration-200`}
        onClick={() => setOpen(!open)}
      >
        {value}
        <img
          src={optionBar}
          alt="옵션 화살표"
          className="w-5 h-5 object-contain"
        />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 w-full bg-gray01 border border-gray09 rounded-3xl shadow-md z-10">
          {options.map(option => (
            <button
              type="button"
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-[20px] rounded-3xl text-center cursor-pointer hover:bg-gray03 transition-colors duration-300
                ${option === value ? "text-gray10 " : "text-gray07"}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
