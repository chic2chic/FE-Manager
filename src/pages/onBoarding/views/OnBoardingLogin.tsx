import CustomInput from "@/components/common/CustomInput";
import Modal from "@/components/common/Modal";
import { useAuth } from "@/hooks/api/useAuth";
import React, { useState } from "react";
import bin from "@/assets/webps/common/bin.webp";

export default function OnBoradingLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, LoginErrorMsg, showErrorModal, handleCloseModal } = useAuth();

  const isActive: boolean = Boolean(username && password);

  const handleLogin = async () => {
    try {
      await login.mutateAsync({ username, password });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModalAll = () => {
    handleCloseModal();
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex flex-col gap-[34px] items-center">
      <div className="flex flex-col gap-4">
        <CustomInput
          title="Email"
          titleType="en"
          placeholder="아이디를 입력해주세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          value={username}
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
          value={password}
          width={500}
          height={60}
        />
      </div>
      <button
        lang="en"
        className={`w-[500px] h-[60px] text-[22px] font-medium rounded-full ${isActive ? "bg-main07 cursor-pointer" : "bg-main04"} text-gray02`}
        disabled={!isActive}
        onClick={handleLogin}
      >
        login
      </button>
      <Modal
        isOpen={showErrorModal}
        content={LoginErrorMsg}
        image={bin}
        onConfirm={handleCloseModalAll}
        setIsOpen={() => {}}
      />
    </div>
  );
}
