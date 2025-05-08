import { FileExtension } from "@/types/ImageExtenstionType";

export const FileInfoExtract = (file: File): FileExtension => {
  const fileInfo = file.type;
  const type = fileInfo.split("/")[1].toUpperCase() as FileExtension;

  return type;
};
