import { api } from '../lib/api';

export async function generateReport() {
  const response = await api.get<{ reportUrl: string }>('/links/report');

  return response.data.reportUrl;
}
