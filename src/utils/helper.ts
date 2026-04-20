/**
 * Truncates a text string to a maximum length with ellipsis
 * @param text - The text to truncate
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