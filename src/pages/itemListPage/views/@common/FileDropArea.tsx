import React, { useRef } from "react";

type Props = {
  file: File | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const FileDropArea = ({ file, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className="border-2 border-dashed border-gray03 rounded-lg cursor-pointer hover:border-main03 transition-colors mb-5"
    >
      <div className="flex flex-col items-center justify-center py-8">
        {file ? (
          <div className="text-sm text-gray08 text-center">{file.name}</div>
        ) : (
          <>
            <p className="text-sm text-gray08 mb-1 text-center">
              Excel 파일을 클릭하여 업로드
            </p>
            <p className="text-xs text-gray07 text-center">
              .xlsx, .xls, .csv 형식
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FileDropArea;
