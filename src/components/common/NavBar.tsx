import { NavLink, useNavigate } from "react-router-dom";
import { NavigationItems } from "@/constants/NavigationItems";
import { useAuth } from "@/hooks/useAuth";
import logoImage from "@/assets/webps/common/logo-manager.webp";
import alarmImage from "@/assets/webps/common/alarm.webp";
import { useState } from "react";
import NoticeModal from "@/components/noticeModal/NoticeModal";

export default function NavBar() {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  return (
    <div className="fixed z-100 top-0 w-screen flex h-[80px] items-center justify-between px-10 border-b border-gray04 bg-gray01">
      <div className="flex items-center gap-[50px]">
        <img
          src={logoImage}
          alt="logo"
          width={225}
          height={36}
          className="cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <div className="flex gap-[40px]">
          {NavigationItems.map((nav, idx) => (
            <NavLink
              key={idx}
              to={nav.url}
              className={({ isActive }) =>
                `font-semibold text-[20px] transition duration-200 hover:text-main05 ${isActive ? "text-main07" : "text-gray09"} cursor-pointer`
              }
            >
              {nav.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex gap-[44px] items-center">
        <div className="relative">
          <div
            className={`${isNoticeModalOpen ? "bg-gray03" : "hover:bg-gray03"} transition rounded-[8px] w-9 h-9 flex justify-center items-center cursor-pointer`}
            onClick={() => setIsNoticeModalOpen(true)}
          >
            <img src={alarmImage} width={24} height={24} />
          </div>
          {isNoticeModalOpen && (
            <NoticeModal onClose={() => setIsNoticeModalOpen(false)} />
          )}
        </div>
        <div>
          {isLogin ? (
            <button
              lang="en"
              className="text-[16px] font-medium text-gray09 cursor-pointer"
            >
              logout
            </button>
          ) : (
            <button>로그인</button>
          )}
        </div>
      </div>
    </div>
  );
}
