const Label = ({
  text,
  position,
}: {
  text: string;
  position: "left" | "right";
}) => (
  <div
    className={`absolute top-[32px] ${position === "left" ? "left-[160px]" : "right-[160px]"} 
      text-[28px] text-gray09 font-pretendard font-semibold`}
  >
    {text}
  </div>
);

export default Label;
