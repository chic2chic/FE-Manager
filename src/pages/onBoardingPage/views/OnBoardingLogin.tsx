import CustomInput from "@/components/common/CustomInput";
import Modal from "@/components/common/Modal";
import React, { useState } from "react";
import bin from "@/assets/webps/common/bin.webp";
import { useAuth } from "@/hooks/useAuth";
import { LoginErrorMsg } from "@/constants/Message";
import { useNavigate } from "react-router-dom";

export default function OnBoradingLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const isActive: boolean = Boolean(username && password);

  const handleLogin = () => {
    login({ username, password })
      .then(() => navigate("/popup-list"))
      .catch(() => setIsOpenModal(true));
  };

  const handleCloseModalAll = () => {
    setUsername("");
    setPassword("");
    setIsOpenModal(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 엔터 키의 기본 동작 방지
      handleLogin();
    }
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
          onKeyDown={handleKeyDown}
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
        isOpen={isOpenModal}
        content={LoginErrorMsg}
        image={bin}
        onConfirm={handleCloseModalAll}
        setIsOpen={() => {}}
      />
    </div>
  );
}
