import { Link } from '@/app/entities/link';

export class LinkMapper {
  static toDomain(data: Link): Link {
    return {
      id: data.id,
      originalUrl: data.originalUrl,
      shortCode: data.shortCode,
      accessCount: data.accessCount,
      createdAt: data.createdAt,
    };
  }
}
