import Link from "next/link";
import { Eye } from "lucide-react";

import type { RequestItem } from "@/features/requests/types/request";
import { Small } from "@/components/Ui/typography/Typography";

import {
  statusLabels,
  statusColors,
  priorityLabels,
  priorityColors,
  formatDate,
} from "../utils/request.utils";

interface RecentRequestsTableProps {
  requests: RequestItem[];
}

export default function RecentRequestsTable({
  requests,
}: RecentRequestsTableProps) {
  return (
    <div className="w-full">
      <table className="w-full table-fixed text-right">
        <thead className="bg-[#F8FAF9]">
          <tr className="text-xs text-[#84938C]">
            <th className="w-[45%] px-3 py-4 font-medium sm:w-auto sm:px-5">
              عنوان
            </th>

            <th className="hidden px-5 py-4 font-medium sm:table-cell">
              درخواست‌دهنده
            </th>

            <th className="hidden px-5 py-4 font-medium md:table-cell">
              اولویت
            </th>

            <th className="w-[30%] px-2 py-4 font-medium sm:w-auto sm:px-5">
              وضعیت
            </th>

            <th className="hidden px-5 py-4 font-medium lg:table-cell">
              تاریخ ثبت
            </th>

            <th className="w-[15%] px-2 py-4 text-center font-medium sm:w-auto sm:px-5">
              جزئیات
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E5ECE8]">
          {requests.map((request) => (
            <tr
              key={request.id}
              className="text-xs transition hover:bg-[#F8FAF9] sm:text-sm"
            >
              <td className="truncate px-3 py-4 font-medium text-[#24352F] sm:px-5">
                {request.title}
              </td>

              <td className="hidden px-5 py-4 text-[#84938C] sm:table-cell">
                {request.requester}
              </td>

              <td className="hidden px-5 py-4 md:table-cell">
                <span className={priorityColors[request.priority]}>
                  {priorityLabels[request.priority]}
                </span>
              </td>

              <td className="px-2 py-4 sm:px-5">
                <span
                  className={`whitespace-nowrap rounded-lg px-2 py-1.5 text-[10px] font-medium sm:px-3 sm:text-xs ${statusColors[request.status]}`}
                >
                  {statusLabels[request.status]}
                </span>
              </td>

              <td className="hidden px-5 py-4 text-[#84938C] lg:table-cell">
                {formatDate(request.created_at)}
              </td>

              <td className="px-2 py-4 text-center sm:px-5">
                <Link
                  href={`/requests/${request.id}`}
                  aria-label={`مشاهده درخواست ${request.title}`}
                  className="inline-flex items-center justify-center rounded-lg p-2 text-[#287C68] transition hover:bg-[#E8F3EF]"
                >
                  <Eye size={17} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
