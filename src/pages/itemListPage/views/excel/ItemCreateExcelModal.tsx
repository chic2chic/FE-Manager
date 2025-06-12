import { useItemCreate } from "@/hooks/useItemCreate";
import React, { useRef, useState } from "react";
import Button from "../@common/Button";
import FileDropArea from "../@common/FileDropArea";

type Props = {
  closeModal: () => void;
};

const ItemCreateExcelModal = ({ closeModal }: Props) => {
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
          <FileDropArea
            file={excelFile}
            onClick={handleClickInput}
            onChange={handleExcelUpload}
          />
        )}

        <div className="flex justify-end gap-3">
          {isSuccess ? (
            <Button size="sm" variant="success" onClick={closeModal}>
              확인
            </Button>
          ) : (
            <>
              <Button size="sm" variant="secondary" onClick={closeModal}>
                취소
              </Button>

              <Button
                size="sm"
                variant="success"
                onClick={handleExcelSubmit}
                disabled={!excelFile || isUploading}
              >
                {isUploading ? "전송중" : "전송"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ItemCreateExcelModal;
