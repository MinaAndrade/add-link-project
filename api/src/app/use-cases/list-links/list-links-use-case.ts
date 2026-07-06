import { Link } from '@/app/entities/link';
import { LinkRepository } from '@/app/repositories/link-repository';

export class ListLinksUseCase {
  constructor(private readonly repository: LinkRepository) {}

  async execute(): Promise<Link[]> {
    return this.repository.findAll();
  }
}
