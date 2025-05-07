export const FileInfoExtract = (file: File) => {
  const typeRegex = /\/([a-z]+)/;
  const match = file.type.match(typeRegex);
  const extension = match ? match[1] : "";

  const nameWithoutExt = file.name.split(".")[0];

  return { fileName: nameWithoutExt, extension };
};
