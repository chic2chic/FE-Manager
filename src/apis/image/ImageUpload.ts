import { api } from "../config/Axios";

export const getPresignedUrl = async (file: File) => {
  const typeRegex = /\/([a-z]+)/;
  const match = file.type.match(typeRegex);
  const extension = match ? match[1] : "";
  const fileName = file.name;

  const response = await api.post("/images/presigned-url", {
    fileName,
    extension,
  });
  return response.data;
};

export const uploadImageToS3 = async ({
  presignedUrl,
  file,
}: {
  presignedUrl: string;
  file: File;
}) => {
  try {
    await api.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`이미지 업로드 실패 ${errorMessage}`);
  }
};
