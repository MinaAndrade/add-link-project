import { LinkNotFoundError } from '@/app/errors/link-not-found-error';
import { LinkRepository } from '@/app/repositories/link-repository';

export class DeleteLinkUseCase {
  constructor(private readonly repository: LinkRepository) {}

  async execute(id: string): Promise<void> {
    const link = await this.repository.findById(id);

    if (!link) {
      throw new LinkNotFoundError();
    }

    await this.repository.delete(id);
  }
}
