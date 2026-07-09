import { LinkRepository } from '@/app/repositories/link-repository';
import { LinkNotFoundError } from '@/app/errors/link-not-found-error';

export class RedirectLinkUseCase {
  constructor(private readonly repository: LinkRepository) {}

  async execute(shortCode: string): Promise<string> {
    const link = await this.repository.findByShortCode(shortCode);

    if (!link) {
      throw new LinkNotFoundError();
    }

    await this.repository.incrementAccessCount(link.id);

    return link.originalUrl;
  }
}
