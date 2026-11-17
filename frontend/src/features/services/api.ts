import axios from "axios";

export const api = axios.create({
  baseURL: "/api/proxy",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
