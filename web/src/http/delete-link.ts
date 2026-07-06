import { api } from "./api";

export async function deleteLink(id: string) {
  await api.delete(`/links/${id}`);
}