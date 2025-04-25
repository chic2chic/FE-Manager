type Props = {
  label: string;
  cssOption: string;
  onClick: () => void;
};

export default function CustomButton({ label, cssOption, onClick }: Props) {
  return (
    <button
      className={`rounded-full px-[20px] py-[10px] text-center cursor-pointer ${cssOption}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
