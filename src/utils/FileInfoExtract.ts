export const FileInoExtract = (file: File) => {
  const typeRegex = /\/([a-z]+)/;
  const match = file.type.match(typeRegex);
  const extension = match ? match[1] : "";
  const fileName = file.name;

  return { fileName, extension };
};
