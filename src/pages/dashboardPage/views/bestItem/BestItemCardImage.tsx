import { useState } from "react";
import Skeleton from "@/components/ui/Skeleton";

type BestItemCardImageProps = {
  src: string;
  alt: string;
};

// 이미지 (Skeleton UI 포함)
const BestItemCardImage = ({ src, alt }: BestItemCardImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-[334px] h-[334px] mt-9 mb-3">
      {!isLoaded && <Skeleton />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default BestItemCardImage;
