// Types
export interface VideoStats {
  packetsLost: number;
  totalPackets: number;
  jitter: number;
  rtt: number;
  codec?: string;
  bitrate?: number;
  size?: {
    width: number;
    height: number;
    framerate?: number;
  };
  currentSpatialLayer?: number;
  currentTemporalLayer?: number;
  preferredSpatialLayer?: number;
  preferredTemporalLayer?: number;
}

export interface SideBarModes {
  PARTICIPANTS: string;
  CHAT: string;
  WHITEBOARD: string;

}

export const sideBarModes: SideBarModes = {
  PARTICIPANTS: "PARTICIPANTS",
  CHAT: "CHAT",
  WHITEBOARD: "WHITEBOARD",

};

/**
 * Verifies if a string is valid JSON
 * @param s - The string to verify
 * @returns True if valid JSON, false otherwise
 */
export const json_verify = (s: string): boolean => {
  try {
    JSON.parse(s);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Calculates quality score based on WebRTC stats
 * Score ranges from 0-10 where 10 is excellent and 0 is poor
 * @param stats - Video/Audio statistics object
 * @returns Quality score between 0 and 10
 */
export function getQualityScore(stats: VideoStats): number {
  const packetLossPercent = stats.packetsLost / stats.totalPackets || 0;
  const jitter = stats.jitter;
  const rtt = stats.rtt;

  let score = 100;

  // Packet loss penalty (max 50 points)
  score -= packetLossPercent * 50 > 50 ? 50 : packetLossPercent * 50;

  // Jitter penalty (max 25 points)
  score -= ((jitter / 30) * 25 > 25 ? 25 : (jitter / 30) * 25) || 0;

  // RTT penalty (max 25 points)
  score -= ((rtt / 300) * 25 > 25 ? 25 : (rtt / 300) * 25) || 0;

  // Return score on a 0-10 scale
  return score / 10;
}

/**
 * Formats a date to AM/PM time format
 * @param date - The date to format
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export function formatAMPM(date: Date): string {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? parseInt("0" + minutes) : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

/**
 * Truncates a text string to a maximum length with ellipsis
 * @param text - The text to truncate (default: "")
 * @returns Truncated text
 */
export const trimSnackBarText = (text: string = ""): string => {
  const maxLength = 52;
  return text.length > maxLength ? `${text.substr(0, maxLength - 5)}...` : text;
};

/**
 * Truncates a name to a specified length with ellipsis
 * @param name - The name to truncate
 * @param truncatedLength - The maximum length before truncation
 * @returns Truncated name
 */
export const nameTructed = (name: string, truncatedLength: number): string => {
  if (!name) return "";

  if (name.length > truncatedLength) {
    if (truncatedLength === 15) {
      return `${name.substr(0, 12)}...`;
    } else {
      return `${name.substr(0, truncatedLength)}...`;
    }
  } else {
    return name;
  }
};

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param immediate - Whether to execute the function immediately
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null;

  return function executedFunction(...args: Parameters<T>): void {
    const later = function () {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
}