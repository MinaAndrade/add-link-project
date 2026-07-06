import { stringify } from 'csv-stringify/sync';

import { LinkRepository } from '@/app/repositories/link-repository';

export class GenerateReportUseCase {
  constructor(private readonly repository: LinkRepository) {}

  async execute(): Promise<string> {
    const links = await this.repository.findAll();

    return stringify(
      links.map(link => ({
        id: link.id,
        originalUrl: link.originalUrl,
        shortCode: link.shortCode,
        accessCount: link.accessCount,
        createdAt: link.createdAt.toISOString(),
      })),
      {
        header: true,
        columns: ['id', 'originalUrl', 'shortCode', 'accessCount', 'createdAt'],
      }
    );
  }
}
