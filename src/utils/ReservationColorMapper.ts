import { Colors } from "@/constants/dashboard/Colors";
import { ReservationChartResponse } from "@/types/api/ApiResponseType";

/**
 * 요일별 예약자 수 데이터에 value 기준으로 색상을 매핑합니다.
 * @param data - 예약 차트 데이터 배열
 * @returns 색상 정보가 추가된 데이터 배열
 */

// ⭐️ value 기준 오름차순으로 color 매칭시키기 ⭐️
export function reservationColorMapper(data: ReservationChartResponse[]) {
  // 1. value 기준 오름차순 정렬
  const sortedData = [...data].sort((a, b) => a.value - b.value);

  // 2. 요일 -> 색상 매칭
  const dayToColorMap = new Map(
    sortedData.map((entry, index) => [entry.day, Colors[index]]),
  );

  // 3. 원래 data에 색상 입히기
  return data.map(entry => ({
    ...entry,
    fill: dayToColorMap.get(entry.day),
  }));
}
