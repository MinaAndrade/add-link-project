import { api } from "./api";

export async function fetchLinks() {
  const response = await api.get("/links");

  return response.data;
}