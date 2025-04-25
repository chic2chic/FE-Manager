import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import logoImage from "@/assets/webps/common/logo-manager.webp";
import plusWhite from "@/assets/webps/common/plus-white.webp";
import popUpPoster01 from "@/assets/webps/popUpList/pop-up-poster-01.webp";
import leftArrowGray09 from "@/assets/webps/common/left-arrow-gray09.webp";
import rightArrowGray09 from "@/assets/webps/common/right-arrow-gray09.webp";

export default function PopUpList() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray03 min-h-screen pb-20">
      <img
        src={logoImage}
        alt="logo"
        width={225}
        height={36}
        className="pt-[22px] ml-10 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      />
      <div className="mt-[80px] mx-auto w-[1360px] min-h-[600px] bg-gray01 pb-14 rounded-[50px]">
        <div className="flex items-start justify-between">
          <div className="ml-11 mt-[52px] flex items-center">
            <span className="text-[36px] tracking-[-2%] text-gray10">
              나의 팝업
            </span>
            <span lang="en" className="ml-4 text-[36px] text-main07">
              List
            </span>
          </div>
          <div className="cursor-pointer flex justify-center items-center w-[70px] h-[70px] rounded-full bg-main07 mt-[50px] mr-11">
            <img src={plusWhite} alt="plus button" width={36} height={36} />
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <div className="relative mx-auto w-[1296px]">
            <Swiper
              className="popup-swiper w-[1010px] mx-auto"
              centeredSlides={true}
              slidesPerView={3}
              spaceBetween={72}
              loop={true}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              modules={[Pagination, Navigation]}
            >
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  2025 BLACKPINK Special POP-UP
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  TOMORROW X TOGETHERzzzzzzzz zzzdfddzfdzfdzfzz
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  2025 BLACKPINK Special POP-UP
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  TOMORROW X TOGETHERzzzzzzzz zzzdfddzfdzfdzfzz
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  2025 BLACKPINK Special POP-UP
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  TOMORROW X TOGETHERzzzzzzzz zzzdfddzfdzfdzfzz
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  2025 BLACKPINK Special POP-UP
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  TOMORROW X TOGETHERzzzzzzzz zzzdfddzfdzfdzfzz
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  2025 BLACKPINK Special POP-UP
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  TOMORROW X TOGETHERzzzzzzzz zzzdfddzfdzfdzfzz
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  2025 BLACKPINK Special POP-UP
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  TOMORROW X TOGETHERzzzzzzzz zzzdfddzfdzfdzfzz
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  2025 BLACKPINK Special POP-UP
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  TOMORROW X TOGETHERzzzzzzzz zzzdfddzfdzfdzfzz
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  2025 BLACKPINK Special POP-UP
                </span>
              </SwiperSlide>
              <SwiperSlide className="h-[342px] w-[286px] flex flex-col justify-center items-center">
                <div className="w-[286px] flex justify-center">
                  <div className="cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] bg-gradient-to-br from-black via-gray08 to-black h-[240px] w-[240px] rounded-[62px] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                      <img
                        src={popUpPoster01}
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
                  TOMORROW X TOGETHERzzzzzzzz zzzdfddzfdzfdzfzz
                </span>
              </SwiperSlide>
            </Swiper>
            <div className="custom-prev absolute top-[110px] -translate-y-1/2 left-0 z-10 cursor-pointer">
              <img
                src={leftArrowGray09}
                alt="prev"
                className="w-[35px] h-[35px]"
              />
            </div>
            <div className="custom-next absolute top-[110px] -translate-y-1/2 right-0 z-10 cursor-pointer">
              <img
                src={rightArrowGray09}
                alt="next"
                className="w-[35px] h-[35px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
