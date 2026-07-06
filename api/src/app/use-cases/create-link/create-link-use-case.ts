import { uuidv7 } from 'uuidv7';

import { Link } from '../../entities/link';
import { LinkRepository } from '../../repositories/link-repository';

import { generateShortCode } from '@/shared/utils/generate-short-code';

export class CreateLinkUseCase {
  constructor(private readonly repository: LinkRepository) {}

  async execute(originalUrl: string): Promise<Link> {
    new URL(originalUrl);

    let shortCode = generateShortCode();

    while (await this.repository.findByShortCode(shortCode)) {
      shortCode = generateShortCode();
    }

    return this.repository.create({
      id: uuidv7(),
      originalUrl,
      shortCode,
    });
  }
}
