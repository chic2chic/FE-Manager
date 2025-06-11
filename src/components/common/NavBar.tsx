/**
 * @Description
 * 네비게이션 바 컴포넌트입니다.
 * - 로그인 여부에 따라 로그아웃 버튼을 표시하며, 로그인 상태에서만 사용 가능합니다.
 * - `popupId`가 설정된 경우, 알림용 WebSocket을 연결하여 실시간 알림 수신을 지원합니다.
 * - 알림 아이콘 클릭 시 알림 모달(noticeModal)을 띄우며, 새로운 알림이 있는 경우 빨간 점으로 표시합니다.
 */

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { NavigationItems } from "@/constants/NavigationItems";
import logoImage from "@/assets/webps/common/logo-manager.webp";
import alarmImage from "@/assets/webps/common/alarm.webp";
import { useEffect, useRef, useState } from "react";
import NoticeModal from "@/components/noticeModal/NoticeModal";
import { useAuth } from "@/hooks/useAuth";
import { usePopUpReadStore } from "@/stores/usePopUpReadStore";
import { connectNotificationSocket } from "@/utils/NotificationSocket";
import { useNotificationStore } from "@/stores/useNotificationStore";

const NavBar = () => {
  const { isLogin, logout } = useAuth();
  const navigate = useNavigate();
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const location = useLocation();
  const isNotPopUpListPage = !location.pathname.includes("popup-list");
  const { name, popupId } = usePopUpReadStore();
  const { hasNewNotification, clearNewFlag } = useNotificationStore();

  // WebSocket 연결 (NavBar가 처음 렌더링될 때)
  const connected = useRef(false);
  const managerId = 1; // api 응답 변경되면 수정

  useEffect(() => {
    if (popupId && !connected.current) {
      connectNotificationSocket(managerId, popupId);
      connected.current = true;
    }
  }, [managerId, popupId]);

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
                  clearNewFlag(); // 모달 열면 빨간 점 지우기
                }}
              >
                <img src={alarmImage} alt="alarm" width={24} height={24} />
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
};

export default NavBar;
