import { api } from '../lib/api';
import type { Link, ShortCode } from '../types/link';

interface CreateLinkRequest {
  originalUrl: string;
  shortCode: ShortCode;
}

export async function createLink(body: CreateLinkRequest): Promise<Link> {
  const { data } = await api.post('/links', body);

  return data;
}
