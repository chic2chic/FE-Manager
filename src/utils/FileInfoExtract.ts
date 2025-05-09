import { ImageType } from "@/types/ImageType";

export const FileInfoExtract = (file: File): ImageType => {
  const fileInfo = file.type;
  const type = fileInfo.split("/")[1].toUpperCase() as ImageType;

  return type;
};
