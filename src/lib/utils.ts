import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function escapeHtml(html: string) {
  const text = document.createTextNode(html);
  const p = document.createElement("p");
  p.appendChild(text);
  return p.innerText;
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}

export function prettyDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

export function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}
