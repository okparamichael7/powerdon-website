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
