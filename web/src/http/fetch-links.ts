import { api } from '../lib/api';
import { type Link } from '../types/link';

export async function fetchLinks(): Promise<Link[]> {
  const { data } = await api.get('/links');

  return data;
}
