import { api } from '../lib/api';
import type { Link } from '../types/link';

interface CreateLinkRequest {
  originalUrl: string;
  shortCode: string;
}

export async function createLink(body: CreateLinkRequest): Promise<Link> {
  const { data } = await api.post('/links', body);

  return data;
}
