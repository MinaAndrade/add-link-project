import { api } from "./api";
import { Link } from "./types";

export async function fetchLinks(): Promise<Link[]> {
  const response = await api.get("/links");

  return response.data;
}