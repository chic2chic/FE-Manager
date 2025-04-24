import { useRef, useState } from "react";
import rightArrowImg from "@/assets/webps/onBoarding/right-arrow.webp";
import OnBoardingHeader from "./views/OnBoardingHeader";
import OnBoardingContents from "./views/OnBoardingContents";
import { ContentDesc } from "@/constants/onboarding/ContentDesc";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import type { Swiper as SwiperType } from "swiper/types";
import OnBoradingLogin from "./views/OnBoradingLogin";

export default function OnBorading() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeidx, setActiveidx] = useState<number>(0);

  const handlePrev = (): void => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = (): void => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col h-[590px] border bg-gray10">
        <OnBoardingHeader />
        <div className="flex-1 relative flex justify-center items-center text-white">
          <button
            className="absolute left-10 cursor-pointer"
            onClick={handlePrev}
          >
            <img
              src={rightArrowImg}
              width={36}
              height={36}
              alt="왼쪽 화살표"
              className="rotate-180"
            />
          </button>
          <div className="w-full max-w-[1100px]">
            <Swiper
              onSwiper={(swiper: SwiperType) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper: SwiperType) => {
                setActiveidx(swiper.activeIndex);
              }}
              className="w-full"
              slidesPerView={1}
            >
              {ContentDesc.map(content => (
                <SwiperSlide key={content.id}>
                  <OnBoardingContents info={content} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="absolute bottom-5 flex gap-2 justify-center">
            {ContentDesc.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === activeidx ? "bg-white" : "bg-gray-500"}`}
              />
            ))}
          </div>
          <button
            className="absolute right-10 cursor-pointer"
            onClick={handleNext}
          >
            <img
              src={rightArrowImg}
              width={36}
              height={36}
              alt="오른쪽 화살표"
            />
          </button>
        </div>
      </div>
      <OnBoradingLogin />
    </div>
  );
}
