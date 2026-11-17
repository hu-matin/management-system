interface RequestPaginationProps {
  page: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
}

export default function RequestPagination({
  page,
  totalPages,
  loading,
  onPageChange,
}: RequestPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 border-t border-[#E5ECE8] px-4 py-4 sm:px-5">
      <button
        type="button"
        disabled={page === 1 || loading}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border border-[#E5ECE8] px-3 py-2 text-xs font-medium text-[#24352F] transition hover:bg-[#E8F3EF] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
      >
        قبلی
      </button>

      <span className="text-xs text-[#84938C] sm:text-sm">
        صفحه {page} از {totalPages}
      </span>

      <button
        type="button"
        disabled={page === totalPages || loading}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border border-[#E5ECE8] px-3 py-2 text-xs font-medium text-[#24352F] transition hover:bg-[#E8F3EF] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
      >
        بعدی
      </button>
    </div>
  );
}
