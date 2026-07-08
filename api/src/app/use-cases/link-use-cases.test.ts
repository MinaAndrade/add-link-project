import { beforeEach, describe, expect, it } from 'vitest';

import { Link } from '../entities/link';
import { CreateLinkDTO, LinkRepository } from '../repositories/link-repository';
import { FileStorage, UploadParams } from '../storage/storage';

import { InvalidUrlError } from '@/app/errors/invalid-url-error';
import { LinkNotFoundError } from '@/app/errors/link-not-found-error';
import { CreateLinkUseCase } from '@/app/use-cases/create-link/create-link-use-case';
import { DeleteLinkUseCase } from '@/app/use-cases/delete-link/delete-link-use-case';
import { GenerateReportUseCase } from '@/app/use-cases/generate-report/generate-report-use-case';
import { ListLinksUseCase } from '@/app/use-cases/list-links/list-links-use-case';
import { RedirectLinkUseCase } from '@/app/use-cases/redirect-link/redirect-link-use-case';

class InMemoryLinkRepository implements LinkRepository {
  public links: Link[] = [];

  async create(data: CreateLinkDTO): Promise<Link> {
    const link: Link = {
      id: data.id,
      originalUrl: data.originalUrl,
      shortCode: data.shortCode,
      accessCount: 0,
      createdAt: new Date('2026-07-07T10:00:00.000Z'),
    };

    this.links.push(link);

    return link;
  }

  async findById(id: string): Promise<Link | null> {
    return this.links.find(link => link.id === id) ?? null;
  }

  async findByShortCode(shortCode: string): Promise<Link | null> {
    return this.links.find(link => link.shortCode === shortCode) ?? null;
  }

  async findAll(): Promise<Link[]> {
    return this.links;
  }

  async delete(id: string): Promise<void> {
    this.links = this.links.filter(link => link.id !== id);
  }

  async incrementAccessCount(id: string): Promise<void> {
    const link = await this.findById(id);

    if (link) {
      link.accessCount += 1;
    }
  }
}

class InMemoryFileStorage implements FileStorage {
  public uploads: UploadParams[] = [];

  async upload(data: UploadParams): Promise<string> {
    this.uploads.push(data);

    return `https://pub-example.r2.dev/${data.fileName}`;
  }
}

describe('link use cases', () => {
  let repository: InMemoryLinkRepository;

  beforeEach(() => {
    repository = new InMemoryLinkRepository();
  });

  it('creates a shortened link', async () => {
    const useCase = new CreateLinkUseCase(repository);

    const link = await useCase.execute('https://example.com');

    expect(link).toEqual(
      expect.objectContaining({
        originalUrl: 'https://example.com',
        accessCount: 0,
      })
    );

    expect(link.shortCode).toHaveLength(6);
  });

  it('rejects an invalid original url', async () => {
    const useCase = new CreateLinkUseCase(repository);

    await expect(useCase.execute('example.com')).rejects.toBeInstanceOf(
      InvalidUrlError
    );
  });

  it('redirects to the original url and increments access count', async () => {
    repository.links.push({
      id: 'link-1',
      originalUrl: 'https://example.com',
      shortCode: 'abc123',
      accessCount: 0,
      createdAt: new Date('2026-07-07T10:00:00.000Z'),
    });

    const useCase = new RedirectLinkUseCase(repository);

    const originalUrl = await useCase.execute('abc123');

    expect(originalUrl).toBe('https://example.com');
    expect(repository.links[0].accessCount).toBe(1);
  });

  it('throws when redirecting a missing short code', async () => {
    const useCase = new RedirectLinkUseCase(repository);

    await expect(useCase.execute('missing')).rejects.toBeInstanceOf(
      LinkNotFoundError
    );
  });

  it('deletes an existing link', async () => {
    repository.links.push({
      id: 'link-1',
      originalUrl: 'https://example.com',
      shortCode: 'abc123',
      accessCount: 0,
      createdAt: new Date('2026-07-07T10:00:00.000Z'),
    });

    const useCase = new DeleteLinkUseCase(repository);

    await useCase.execute('link-1');

    expect(repository.links).toHaveLength(0);
  });

  it('throws when deleting a missing link', async () => {
    const useCase = new DeleteLinkUseCase(repository);

    await expect(useCase.execute('missing')).rejects.toBeInstanceOf(
      LinkNotFoundError
    );
  });

  it('lists all registered links', async () => {
    repository.links.push(
      {
        id: 'link-1',
        originalUrl: 'https://example.com',
        shortCode: 'abc123',
        accessCount: 3,
        createdAt: new Date('2026-07-07T10:00:00.000Z'),
      },
      {
        id: 'link-2',
        originalUrl: 'https://rocketseat.com.br',
        shortCode: 'def456',
        accessCount: 5,
        createdAt: new Date('2026-07-08T10:00:00.000Z'),
      }
    );

    const useCase = new ListLinksUseCase(repository);

    const links = await useCase.execute();

    expect(links).toHaveLength(2);
    expect(links).toEqual(repository.links);
  });

  it('returns an empty list when there are no links', async () => {
    const useCase = new ListLinksUseCase(repository);

    const links = await useCase.execute();

    expect(links).toEqual([]);
  });

  it('generates a csv report and uploads it to storage', async () => {
    repository.links.push({
      id: 'link-1',
      originalUrl: 'https://example.com',
      shortCode: 'abc123',
      accessCount: 3,
      createdAt: new Date('2026-07-07T10:00:00.000Z'),
    });

    const storage = new InMemoryFileStorage();
    const useCase = new GenerateReportUseCase(repository, storage);

    const result = await useCase.execute();

    expect(result.reportUrl).toMatch(
      /^https:\/\/pub-example\.r2\.dev\/reports\/report-\d+\.csv$/
    );
    expect(storage.uploads).toHaveLength(1);
    expect(storage.uploads[0]).toEqual(
      expect.objectContaining({
        contentType: 'text/csv',
      })
    );
    expect(storage.uploads[0].body.toString()).toContain(
      'id,originalUrl,shortCode,accessCount,createdAt'
    );
    expect(storage.uploads[0].body.toString()).toContain(
      'link-1,https://example.com,abc123,3,2026-07-07T10:00:00.000Z'
    );
  });
});
