import { api } from "./api";

interface CreateLinkRequest {
  originalUrl: string;
}

export async function createLink(data: CreateLinkRequest) {
  const response = await api.post("/links", data);

  return response.data;
}