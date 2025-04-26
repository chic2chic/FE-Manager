import { useEffect, useState } from "react";
import productImage from "@/assets/webps/productList/product-img.webp";
import { Product } from "@/types/Product";
import Modal from "@/components/common/Modal"; // 모달 import
import { useNavigate } from "react-router-dom";
import bin from "@/assets/webps/common/bin.webp";
import check from "@/assets/webps/common/check.webp";

type Display = {
  name: string;
  products: Product[];
};

export default function ProductList() {
  const [displayList, setDisplayList] = useState<Display[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);


  const handleDelete = () => {
    // 삭제 처리 로직
    console.log("상품 삭제 완료!");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("삭제 취소");
    setIsModalOpen(false);
  };

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
        <button className="px-4 py-2 bg-gray01 border border-gray10 text-gray10 rounded-full text-[20px] font-semibold hover:bg-gray10 hover:text-gray01 transition-colors duration-300">
          전체 상품 등록
        </button>
        <button
          onClick={() => navigate("/products/create")}
          className="px-4 py-2 bg-gray01 border border-gray10 text-gray10 rounded-full text-[20px] font-semibold hover:bg-gray10 hover:text-gray01 transition-colors duration-300"
        >
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
            <div className="w-15 h-15 flex items-center justify-center rounded-full bg-main01 text-gray10 text-[36px] font-semibold">
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
              <div key={product.id} className="flex flex-col items-center">
                {/* 상품 이미지 */}
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-53 h-53 object-cover mb-3"
                />

                {/* 상품명 + 버튼 */}
                <p className="font-bold text-[20px] mb-1">{product.name}</p>
                <p className="text-[16px] text-gray08 mb-1">
                  {product.price.toLocaleString()}원
                </p>
                <p className="text-[16px] text-gray08 mb-2">
                  남은재고 : {product.stock}
                </p>
                <div className="flex gap-2" >
                  <div className="flex justify-center gap-4 mt-2">
                    <button className="text-[18px] px-4 py-1 cursor-pointer bg-gray10 text-gray01 rounded-full hover:opacity-90">
                      수정
                    </button>
                    <button
                      className="text-[18px] px-4 py-1 cursor-pointer border border-gray10 rounded-full hover:bg-gray10 hover:text-gray01 transition-colors duration-300"
                      onClick={() => {
                        setSelectedProduct(product); // 어떤 상품을 삭제할지 저장
                        setIsModalOpen(true); // 모달 열기
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 삭제 확인 모달 */}
      {selectedProduct && (
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          content={`"${selectedProduct.name} 상품을 삭제하시겠어요?`}
          image={bin}
          confirmText="삭제"
          cancelText="취소"
          onConfirm={() => {
            console.log(`${selectedProduct.name} 삭제`);
            // 삭제 API 호출 또는 displayList 업데이트 추가 예정
            setIsModalOpen(false);
            setIsDeleteConfirmOpen(true);   // 두 번째(삭제완료) 모달 열기
          }}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        />
      )}

      <Modal
        isOpen={isDeleteConfirmOpen}
        setIsOpen={setIsDeleteConfirmOpen}
        content="상품이 삭제되었습니다."
        image={check}
        confirmText="확인"
        onConfirm={() => {
          setIsDeleteConfirmOpen(false);
        }}
      />
    </div>
  );
}
