import { PopUpCardType } from "@/mocks/popUpList/PopUpCards";

export default function PopUpCard({ title, imagePath }: PopUpCardType) {
  return (
    <>
      <div className="w-[286px] flex justify-center">
        <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
            <img
              src={imagePath}
              alt="poster"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <span
        lang="en"
        className="w-[286px] break-words block text-center justify-center text-[34px] mt-[22px]"
      >
        {title}
      </span>
    </>
  );
}
