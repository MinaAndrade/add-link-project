import { api } from "./api";

export async function generateReport() {
  const response = await api.get("/links/report", {
    responseType: "blob",
  });

  return response.data;
}