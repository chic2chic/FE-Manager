import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { NavigationItems } from "@/constants/NavigationItems";
import logoImage from "@/assets/webps/common/logo-manager.webp";
import alarmImage from "@/assets/webps/common/alarm.webp";
import { useEffect, useRef, useState } from "react";
import NoticeModal from "@/components/noticeModal/NoticeModal";
import { useAuth } from "@/hooks/useAuth";
import { useStockNotificationListApi } from "@/hooks/api/useStockNotificationListApi";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";

export default function NavBar() {
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const previousLength = useRef(0);
  const location = useLocation();
  const isNotPopUpListPage = !location.pathname.includes("popup-list");
  const { name } = usePopUpReadStore();

  const { notifications = [] } = useStockNotificationListApi();

  useEffect(() => {
    if (notifications.length > previousLength.current) {
      setHasNewNotification(true);
    }

    previousLength.current = notifications.length;
  }, [notifications]);

  return (
    <div
      className={`fixed z-100 top-0 w-screen flex h-[80px] items-center justify-between px-10 ${isNotPopUpListPage ? "bg-gray01 border-b border-gray04" : "bg-gray03"}`}
    >
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
          {isNotPopUpListPage &&
            NavigationItems.map((nav, idx) => (
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
        <div className="flex items-center gap-6">
          {isNotPopUpListPage && (
            <NavLink
              to={"/popup-list"}
              className={({ isActive }) =>
                `font-medium text-[20px] transition duration-200 hover:text-main05 ${isActive ? "text-main07" : "text-gray09"} cursor-pointer`
              }
            >
              {name}
            </NavLink>
          )}
          {isNotPopUpListPage && (
            <div className="relative">
              <div
                className={`${isNoticeModalOpen ? "bg-gray03" : "hover:bg-gray03"} transition rounded-[8px] w-9 h-9 flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  setIsNoticeModalOpen(true);
                  setHasNewNotification(false);
                }}
              >
                <img src={alarmImage} width={24} height={24} />
                {hasNewNotification && (
                  <span className="absolute top-[2px] right-[2px] w-[8px] h-[8px] bg-main07 rounded-full" />
                )}
              </div>
              {isNoticeModalOpen && (
                <NoticeModal onClose={() => setIsNoticeModalOpen(false)} />
              )}
            </div>
          )}
          {isLogin ? (
            <button
              lang="en"
              className="text-[16px] font-medium text-gray09 cursor-pointer mx-2 hover:text-main05"
              onClick={logout}
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
