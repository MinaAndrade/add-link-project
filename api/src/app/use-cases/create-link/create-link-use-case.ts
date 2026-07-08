import { uuidv7 } from 'uuidv7';

import { Link } from '../../entities/link';
import { LinkRepository } from '../../repositories/link-repository';

import { InvalidUrlError } from '@/app/errors/invalid-url-error';
import { generateShortCode } from '@/shared/utils/generate-short-code';

export class CreateLinkUseCase {
  constructor(private readonly repository: LinkRepository) {}

  async execute(originalUrl: string): Promise<Link> {
    try {
      new URL(originalUrl);
    } catch {
      throw new InvalidUrlError();
    }

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
