const genderColorCodes = ["#90C5FF", "#F48FB1"];
const ageColorCodes = ["#F48FB1", "#C5CCFF", "#90C5FF", "#B2EBF2"];

export const mapGenderData = (rawData: { name: string; count: number }[]) =>
  rawData.map((d, i) => ({
    ...d,
    fillId: `genderGrad${i}`, // 그래디언트용 id
    rawFill: genderColorCodes[i], // 실제 헥스 컬러
  }));

export const mapAgeData = (rawData: { name: string; count: number }[]) =>
  rawData.map((d, i) => ({
    ...d,
    fillId: `ageGrad${i}`,
    rawFill: ageColorCodes[i],
  }));
