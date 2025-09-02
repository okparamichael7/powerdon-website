import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstName = (fullName: string | undefined) => {
  if (!fullName) {
    return "";
  }
  const nameParts = fullName.trim().split(" ");
  return nameParts[0] || "";
};

export function generateRequestId(prefix = "FR") {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${randomSuffix}`;
}
