export type RequestStatus = "new" | "in_progress" | "completed";

export type RequestPriority = "low" | "medium" | "high";

export interface RequestItem {
  id: number;
  title: string;
  description: string;
  requester: string;
  priority: RequestPriority;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
  version: number;
}

export interface RequestsResponse {
  items: RequestItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface CreateRequestPayload {
  title: string;
  description: string;
  requester: string;
  priority: RequestPriority;
}

export interface UpdateRequestPayload {
  title?: string;
  description?: string;
  requester?: string;
  priority?: RequestPriority;
  status?: RequestStatus;
  expected_version?: number;
}
