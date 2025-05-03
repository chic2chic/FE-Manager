import { api } from "../config/Axios";

export const getPresignedUrl = async ({ file }: { file: File }) => {
  const typeRegex = /.[a-z]+/;
  const fileName = file.name;
  const extension = file.type.match(typeRegex);

  console.log(extension);

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
    throw new Error(`이미지 업로드 실패`);
  }
};
