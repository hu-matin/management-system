import { api } from "@/features/services/api";

import type {
  RequestItem,
  RequestsResponse,
  CreateRequestPayload,
  UpdateRequestPayload,
} from "../types/request";

interface GetRequestsParams {
  q?: string;
  status?: string;
  priority?: string;
  page?: number;
  page_size?: number;
}

export const requestService = {
  async getAll(params: GetRequestsParams = {}) {
    const response = await api.get<RequestsResponse>("/requests", { params });

    return response.data;
  },

  async getById(id: number) {
    const response = await api.get<RequestItem>(`/requests/${id}`);

    return response.data;
  },

  async create(data: CreateRequestPayload) {
    const response = await api.post<RequestItem>("/requests", data);

    return response.data;
  },

  async update(id: number, data: UpdateRequestPayload) {
    const response = await api.patch<RequestItem>(`/requests/${id}`, data);

    return response.data;
  },
};
