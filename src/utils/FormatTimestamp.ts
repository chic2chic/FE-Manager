export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  const year = String(date.getFullYear()).slice(2); // YY
  const month = String(date.getMonth() + 1).padStart(2, "0"); // MM
  const day = String(date.getDate()).padStart(2, "0"); // DD
  const hours = String(date.getHours()).padStart(2, "0"); // HH
  const minutes = String(date.getMinutes()).padStart(2, "0"); // MM

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export function getTimeValue(timeString: string): number {
  if (!timeString || timeString === "00:00:00") return 0;
  return parseInt(timeString.split(":")[0]);
}
