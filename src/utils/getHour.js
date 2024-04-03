export function getHour(second, nanosecond) {
  const date = new Date(second * 1000 + nanosecond / 1000000);
  const hour = date.getHours();
  const hourValue = hour < 10 ? `0${hour}` : `${hour}`;
  const minute = date.getMinutes();
  const minuteValue = minute < 10 ? `0${minute}` : `${minute}`;

  return `${hourValue}:${minuteValue}`;
}
