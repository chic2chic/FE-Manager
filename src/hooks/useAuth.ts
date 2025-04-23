import { useState } from "react";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return { isLogin };
};
