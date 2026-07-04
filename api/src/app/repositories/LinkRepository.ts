import { Link } from '../entities/Link';

export interface CreateLinkDTO {
  originalUrl: string;
  shortCode: string;
}

export interface LinkRepository {
  create(data: CreateLinkDTO): Promise<Link>;

  findById(id: string): Promise<Link | null>;

  findByShortCode(shortCode: string): Promise<Link | null>;

  findAll(): Promise<Link[]>;

  delete(id: string): Promise<void>;

  incrementAccessCount(id: string): Promise<void>;
}
