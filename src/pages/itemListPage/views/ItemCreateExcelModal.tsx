import { useItemCreate } from "@/hooks/useItemCreate";
import React, { useRef, useState } from "react";

type Props = {
  closeModal: () => void;
};

export default function ItemCreateExcelModal({ closeModal }: Props) {
  const { createItemExcel } = useItemCreate(); // 100이면 완료되었음을 의미 (성공)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setExcelFile(e.target.files[0]);
    }
  };

  const handleClickInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleExcelSubmit = async () => {
    if (!excelFile) return null;

    setIsUploading(true);
    const status = await createItemExcel(excelFile);

    if (status === 201) {
      setIsSuccess(true);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 w-screen h-screen bg-gray10 opacity-50 z-101"
        onClick={closeModal}
      />

      <div className="fixed z-102 top-1/2 left-1/2 bg-gray01 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Excel 파일 업로드</h3>
        </div>
        <div className="h-px bg-gray05 mb-5" />

        {isSuccess ? (
          <div className="border-2 border-dashed border-main03 rounded-lg mb-5">
            <div className="flex flex-col items-center justify-center py-10">
              <div className="text-lg font-medium text-gray08 text-center">
                업로드가 완료되었습니다
              </div>
            </div>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-gray03 rounded-lg cursor-pointer hover:border-main03 transition-colors mb-5"
            onClick={handleClickInput}
          >
            <div className="flex flex-col items-center justify-center py-8">
              {excelFile ? (
                <div className="text-sm text-gray08 text-center">
                  {excelFile.name}
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray08 mb-1 text-center">
                    Excel 파일을 클릭하여 업로드
                  </p>
                  <p className="text-xs text-gray07 text-center">
                    .xlsx, .xls, .csv 형식
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleExcelUpload}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          {isSuccess ? (
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray01 bg-main06 rounded-md hover:bg-main04 cursor-pointer focus:outline-none transition-colors"
            >
              확인
            </button>
          ) : (
            <>
              <button
                onClick={closeModal}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray09 bg-gray-100 rounded-md hover:bg-gray05 focus:outline-none transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleExcelSubmit}
                disabled={!excelFile || isUploading}
                className={`px-4 py-2 text-sm font-medium text-gray01 rounded-md focus:outline-none transition-colors ${
                  !excelFile || isUploading
                    ? "bg-gray07"
                    : "bg-main06 hover:bg-main04 cursor-pointer"
                }`}
              >
                {isUploading ? "전송중" : "전송"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
