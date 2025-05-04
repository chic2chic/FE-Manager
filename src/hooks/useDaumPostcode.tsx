import { useEffect, useRef, useState } from "react";
import ReadingClassesImg from "@/assets/webps/common/reading-glasses.webp";

declare global {
  interface Window {
    daum: any;
  }
}

export type AddressResultType = {
  address: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
};

export function useDaumPostcode() {
  const postcodeRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [addressInfo, setAddressInfo] = useState<AddressResultType>({
    address: "",
    detailAddress: "",
    latitude: 0,
    longitude: 0,
  });

  const openPostcode = () => {
    setIsOpen(true);
  };

  const closePostcode = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && postcodeRef.current) {
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          const addr = data.jibunAddress;
          const geocoder = new window.daum.maps.services.Geocoder();

          geocoder.addressSearch(addr, function (results: any, status: any) {
            if (status === window.daum.maps.services.Status.OK) {
              const result = results[0];
              setAddressInfo(prev => ({
                ...prev,
                address: addr,
                latitude: result.y,
                longitude: result.x,
              }));
            }
          });

          closePostcode();
        },

        width: "100%",
        height: "100%",
      }).embed(postcodeRef.current);
    }
  }, [isOpen]);

  const PostCode = () => (
    <div className="relative">
      <div
        className="flex items-center justify-between border border-gray05 rounded-full px-5 w-[480px] h-[54px]"
        onClick={openPostcode}
      >
        <input
          placeholder="주소 검색"
          className="cursor-pointer focus:outline-none w-full h-[54px] bg-transparent"
          value={addressInfo.address}
          readOnly
        />
        <img
          className="cursor-pointer ml-3"
          width={20}
          height={20}
          src={ReadingClassesImg}
          alt="검색"
        />
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-110 flex items-center justify-center bg-gray10/50"
          onClick={closePostcode}
        >
          <div
            className="bg-white p-4 rounded-[20px] relative w-[600px] h-[600px]"
            onClick={e => e.stopPropagation}
          >
            <button
              onClick={closePostcode}
              className="absolute right-4 top-4 text-gray08 hover:text-gray10"
            >
              X
            </button>
            <div ref={postcodeRef} className="w-full h-full"></div>
          </div>
        </div>
      )}
    </div>
  );

  return { addressInfo, PostCode };
}
