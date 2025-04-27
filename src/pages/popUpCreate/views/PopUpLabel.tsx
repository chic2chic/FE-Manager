type Props = {
  label: string;
  cssOption?: string;
};

export default function PopUpLabel({ label, cssOption }: Props) {
  return (
    <label
      className={`w-[154px] h-[32px] font-medium text-[20px] ${cssOption}`}
    >
      {label}
    </label>
  );
}
