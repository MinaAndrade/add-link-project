import { uuidv7 } from 'uuidv7';

import { Link } from '../../entities/link';
import { LinkRepository } from '../../repositories/link-repository';

import { InvalidShortCodeError } from '@/app/errors/invalid-short-code-error';
import { InvalidUrlError } from '@/app/errors/invalid-url-error';
import { ShortCodeAlreadyExistsError } from '@/app/errors/short-code-already-exists-error';

const SHORT_CODE_PATTERN = /^[a-zA-Z0-9_-]{3,10}$/;

export class CreateLinkUseCase {
  constructor(private readonly repository: LinkRepository) {}

  async execute(originalUrl: string, shortCode: string): Promise<Link> {
    try {
      new URL(originalUrl);
    } catch {
      throw new InvalidUrlError();
    }

    if (!SHORT_CODE_PATTERN.test(shortCode)) {
      throw new InvalidShortCodeError();
    }

    const linkWithSameShortCode = await this.repository.findByShortCode(
      shortCode
    );

    if (linkWithSameShortCode) {
      throw new ShortCodeAlreadyExistsError();
    }

    return this.repository.create({
      id: uuidv7(),
      originalUrl,
      shortCode,
    });
  }
}
