
import { Suspense } from "react";
import EditRequestPageContent from "./EditRequestPageContent";

export default function EditRequestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-80 animate-pulse rounded-2xl bg-[#E5ECE8]" />
      }
    >
      <EditRequestPageContent />
    </Suspense>
  );
}
