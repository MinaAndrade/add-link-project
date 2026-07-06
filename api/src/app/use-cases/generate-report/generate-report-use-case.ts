import { stringify } from 'csv-stringify/sync';

import { LinkRepository } from '@/app/repositories/link-repository';
import { FileStorage } from '@/app/storage/storage';

export class GenerateReportUseCase {
  constructor(
    private readonly repository: LinkRepository,
    private readonly storage: FileStorage
  ) {}

  async execute() {
    const links = await this.repository.findAll();

    const csv = stringify(
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

    const fileName = `reports/report-${Date.now()}.csv`;

    const reportUrl = await this.storage.upload({
      fileName,
      contentType: 'text/csv',
      body: Buffer.from(csv),
    });

    return {
      reportUrl,
    };
  }
}
