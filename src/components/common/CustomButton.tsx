type Props = {
  style: string;
  onClick: () => void;
  label: string;
  lang?: "en" | "ko";
};

export default function CustomButton({
  style,
  onClick,
  label,
  lang = "ko",
}: Props) {
  return (
    <button
      lang={lang}
      className={`rounded-[50px] ${style} cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
