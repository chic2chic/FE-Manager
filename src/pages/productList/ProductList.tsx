import { useEffect, useState } from "react";
import productImage from "@/assets/webps/productList/product-img.webp";
import { Product } from "@/types/Product";

type Display = {
  name: string;
  products: Product[];
};

export default function ProductList() {
  const [displayList, setDisplayList] = useState<Display[]>([]);

  useEffect(() => {
    fetch("/products")
      .then(res => res.json())
      .then(data => setDisplayList(data))
      .catch(err => console.error("상품 데이터 호출 실패:", err));
  }, []);

  return (
    <div className="py-8">
      {/* 상단 버튼 */}
      <div className="flex justify-end gap-3 mb-10 px-10">
        <button className="px-4 py-2 bg-gray01 border border-gray10 text-gray09 rounded-full text-[20px] font-semibold hover:bg-gray10 hover:text-gray01 transition-colors duration-300">
          전체 상품 등록
        </button>
        <button className="px-4 py-2 bg-gray01 border border-gray10 text-gray09 rounded-full text-[20px] font-semibold hover:bg-gray10 hover:text-gray10 transition-colors duration-300">
          상품 등록
        </button>
      </div>

      {/* 매대별 리스트 */}
      {displayList.map(display => (
        <div key={display.name} className="mb-12">
          {/* 매대명 + 구분선 */}
          <div
            className="flex items-center gap-4 mb-4"
            style={{ paddingLeft: "161px", paddingRight: "180px" }}
          >
            <div className="w-20 h-[80px] flex items-center justify-center rounded-full bg-main01 text-gray10 text-[36px] font-semibold">
              {display.name}
            </div>

            <div className="flex-1 h-px bg-gray05" />
          </div>

          {/* 상품 카드 리스트 */}
          <div
            className="grid grid-cols-4 gap-6 gap-y-14 "
            style={{ paddingLeft: "272px", paddingRight: "180px" }}
          >
            {display.products.map(product => (
              <div
                key={product.id}
                //className="border border-gray-200 p-3 rounded-lg flex flex-col items-center"
              >
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-53 h-53 object-cover mb-3"
                />
                <p className="font-bold text-[20px] mb-1">{product.name}</p>
                <p className="text-[16px] text-gray08 mb-1">
                  {product.price.toLocaleString()}원
                </p>
                <p className="text-[16px] text-gray08 mb-2">
                  남은재고 : {product.stock}
                </p>
                <div className="flex gap-2" style={{ paddingLeft: "50px" }}>
                  <div className="flex justify-center gap-4 mt-2">
                    <button className="text-[14px] px-3 py-1 bg-gray10 text-gray01 rounded-full hover:opacity-90">
                      수정
                    </button>
                    <button className="text-[14px] px-3 py-1 border border-gray10 rounded-full hover:bg-gray10 hover:text-gray01 transition-colors duration-300">
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
