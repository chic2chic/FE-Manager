import { OnBoardingContentType } from "@/constants/onboarding/ContentDesc";

type Props = {
  info: OnBoardingContentType;
};

export default function OnBoardingContents({ info }: Props) {
  return (
    <div className="flex gap-[74px] items-center">
      <div>
        <img
          src={info.imagePath}
          className="rounded-[30px] max-w-[460px] h-auto"
        />
      </div>
      <div>
        <p className="font-bold text-[40px]  text-main06">0{info.id}</p>
        <p className="font-bold text-[44px]">{info.title}</p>
        <div className="text-[26px] font-medium">
          {info.desc.map((item, idx, arr) => {
            if (item.startsWith("PoPI")) {
              return (
                <span
                  key={idx}
                  lang="en"
                  className="text-[28px] md:text-[22px] text-main04"
                >
                  {item}
                </span>
              );
            } else if (idx > 0 && arr[idx - 1].startsWith("PoPI")) {
              return (
                <span className="md:text-[22px]" key={idx}>
                  {item}
                </span>
              );
            } else {
              return (
                <p key={idx} className="text-[26px] md:text-[22px] font-medium">
                  {item}
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
