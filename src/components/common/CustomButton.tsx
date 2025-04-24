type Props = {
  style: string;
  onClick: () => void;
  label: string;
  lang?: "en" | "ko";
  isActive: boolean;
};

export default function CustomButton({
  style,
  onClick,
  label,
  lang = "ko",
  isActive = false,
}: Props) {
  return (
    <button
      lang={lang}
      className={`rounded-[50px] ${style} ${isActive ? "cursor-pointer" : ""}`}
      onClick={onClick}
      disabled={!isActive}
    >
      {label}
    </button>
  );
}
