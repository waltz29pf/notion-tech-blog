import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// slugの作成
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// URLからIDを抽出
export function extractIdFromSlug(slug: string): string {
  const match = slug.match(/-([^-]+)$/);
  return match ? match[1] : slug;
}
