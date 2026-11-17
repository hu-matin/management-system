import type {
  RequestStatus,
  RequestPriority,
} from "@/features/requests/types/request";

export const statusLabels: Record<RequestStatus, string> = {
  new: "جدید",
  in_progress: "در حال انجام",
  completed: "تکمیل‌شده",
};

export const statusColors: Record<RequestStatus, string> = {
  new: "bg-[#EDF4FA] text-[#5289B8]",
  in_progress: "bg-[#FFF4E5] text-[#D99A36]",
  completed: "bg-[#E8F3EF] text-[#287C68]",
};

export const priorityLabels: Record<RequestPriority, string> = {
  low: "کم",
  medium: "متوسط",
  high: "زیاد",
};

export const priorityColors: Record<RequestPriority, string> = {
  low: "text-[#84938C]",
  medium: "text-[#D99A36]",
  high: "text-[#D65B5B]",
};

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
