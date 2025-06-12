import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "dark";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
}: ButtonProps) => {
  const sizeClass =
    size === "lg"
      ? "px-4 py-2 text-[20px]"
      : size === "md"
        ? "px-4 py-2 text-[18px]"
        : "px-4 py-2 text-sm";

  const variantClass = {
    primary:
      "bg-gray01 border border-gray10 text-gray10 hover:bg-gray10 hover:text-gray01",
    secondary:
      "border border-gray10 text-gray10 hover:bg-gray10 hover:text-gray01",
    dark: "bg-gray10 text-gray01 hover:opacity-90",
    success: "bg-main06 text-gray01 hover:bg-main04",
  }[variant];

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded-full font-semibold transition-colors duration-300 ${sizeClass} ${variantClass} ${disabledClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
