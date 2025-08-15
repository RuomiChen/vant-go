import { SERVER_URL } from "./request";

export const getServerUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return SERVER_URL + url
}

/**
 * UTC 时间字符串转指定时区 24 小时制时间 HH:mm
 * @param utcString UTC 时间字符串，例如 "2025-08-15T06:56:18.782Z"
 * @param offset 时区偏移（单位小时），默认中国 UTC+8
 * @returns "HH:mm" 格式字符串
 */
export function formatUTCToHHMM(utcString: string, offset = 8): string {
  const date = new Date(utcString);
  
  // 转换到指定时区
  const localTime = new Date(date.getTime() + offset * 60 * 60 * 1000);

  const hours = localTime.getUTCHours().toString().padStart(2, '0');
  const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
