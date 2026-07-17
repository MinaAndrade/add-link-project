import { api } from '../lib/api';
import type { LinkId } from '../types/link';

export async function deleteLink(id: LinkId) {
  await api.delete(`/links/${id}`);
}
