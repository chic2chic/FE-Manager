import LogoImage from "@/assets/webps/common/logo-manager.webp";

export default function OnBoardingHeader() {
  return (
    <div className="flex px-[40px] h-[80px] items-center">
      <img
        src={LogoImage}
        width={255}
        height={36}
        onClick={() => window.location.reload()}
        className="cursor-pointer"
      />
    </div>
  );
}
