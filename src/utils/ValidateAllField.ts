/**
 * 객체의 모든 필드가 null, undefined가 아닌지 검증하는 유틸함수입니다.
 *
 * @param data 검증할 객체
 * @param allowZero 0 값을 허용할지 여부 (기본값: true)
 * @param allowEmptyString 빈 문자열을 허용할지 여부 (기본값: false)
 * @returns 모든 필드가 유효하면 true, 아니면 false
 */
export const ValidateAllField = (
  data: object,
  allowZero: boolean = true,
  allowEmptyString: boolean = false,
): boolean => {
  return Object.values(data).every(value => {
    // null 또는 undefined 검사
    if (value === null || value === undefined) {
      return false;
    }

    // 숫자 0 검사
    if (value === 0) {
      return allowZero;
    }

    // 빈 문자열 검사
    if (value === "") {
      return allowEmptyString;
    }

    return true;
  });
};

/**
 * 객체에서 유효하지 않은 필드를 찾아 반환하는 유틸함수입니다.
 *
 * @param data 검증할 객체
 * @param allowZero 0 값을 허용할지 여부 (기본값: true)
 * @param allowEmptyString 빈 문자열을 허용할지 여부 (기본값: false)
 * @returns 유효하지 않은 필드명의 배열, 모두 유효하면 빈 배열
 */
export const FindInvalidFields = (
  data: object,
  allowZero: boolean = true,
  allowEmptyString: boolean = false,
): string[] => {
  return Object.entries(data)
    .filter(([, value]) => {
      // null 또는 undefined 검사
      if (value === null || value === undefined) {
        return true;
      }

      // 숫자 0 검사
      if (value === 0 && !allowZero) {
        return true;
      }

      // 빈 문자열 검사
      if (value === "" && !allowEmptyString) {
        return true;
      }

      return false;
    })
    .map(([key]) => key);
};
