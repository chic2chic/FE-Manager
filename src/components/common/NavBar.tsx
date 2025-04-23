import { NavigationItems } from "@/constants/NavigationItems";
import { useAuth } from "@/hooks/useAuth";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const { isLogin } = useAuth();
  return (
    <div className="flex h-[80px] items-center justify-between px-6">
      <div className="flex items-center gap-16">
        <img src="/logo.svg" alt="logo" />
        <div className="flex gap-12">
          {NavigationItems.map((nav, idx) => (
            <NavLink
              key={idx}
              to={nav.url}
              className={({ isActive }) =>
                `font-semibold text-[22px] ${isActive ? "text-main07" : "text-gray09"}`
              }
            >
              {nav.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-8 gap-4"></div>
      <div>
        {isLogin ? (
          <button lang="en" className="text-[22px] font-medium text-gray09">
            logout
          </button>
        ) : (
          <button>로그인</button>
        )}
      </div>
    </div>
  );
}
