"use client";

import { useParams } from "next/navigation";
import RequestDetails from "./RequestDetails";

export default function RequestDetailsPageContent() {
  const params = useParams<{ id: string }>();

  return <RequestDetails id={params.id} />;
}
