import CustomInput from "@/components/common/CustomInput";
import React, { useState } from "react";

export default function OnBoradingLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isActive: boolean = Boolean(username && password);

  const handleLogin = () => {};

  return (
    <div className="flex flex-col my-[50px] gap-[34px] items-center">
      <div className="flex flex-col gap-4">
        <CustomInput
          title="Email"
          titleType="en"
          placeholder="아이디를 입력해주세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          width={500}
          height={60}
        />
        <CustomInput
          title="PW"
          titleType="en"
          inputType="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          width={500}
          height={60}
        />
      </div>
      <button
        lang="en"
        className={`w-[500px] h-[60px] text-[22px] font-medium rounded-[50px] ${isActive ? "bg-main07 cursor-pointer" : "bg-main04"} text-gray02`}
        disabled={!isActive}
        onClick={handleLogin}
      >
        login
      </button>
    </div>
  );
}
