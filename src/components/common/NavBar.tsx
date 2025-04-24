import { NavigationItems } from "@/constants/NavigationItems";
import { useAuth } from "@/hooks/useAuth";
import { NavLink } from "react-router-dom";
import logoImage from "@/assets/webps/common/logo_manager.webp";
import alarmImage from "@/assets/webps/common/alarm.webp";

export default function NavBar() {
  const { isLogin } = useAuth();
  return (
    <div className="flex h-[80px] items-center justify-between px-6 border-b border-gray04">
      <div className="flex items-center gap-[50px]">
        <img
          src={logoImage}
          alt="logo"
          width={225}
          height={36}
          className="cursor-pointer"
        />
        <div className="flex gap-[40px]">
          {NavigationItems.map((nav, idx) => (
            <NavLink
              key={idx}
              to={nav.url}
              className={({ isActive }) =>
                `font-semibold text-[20px] ${isActive ? "text-main07" : "text-gray09"} cursor-pointer`
              }
            >
              {nav.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex gap-[50px]">
        <img
          src={alarmImage}
          width={24}
          height={24}
          className="cursor-pointer"
        />
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
