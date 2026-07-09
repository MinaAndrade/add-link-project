import { GenerateReportUseCase } from '@/app/use-cases/generate-report/generate-report-use-case';
import { DrizzleLinkRepository } from '@/infra/repositories/drizzle-link-repository';
import { R2Storage } from '@/infra/storage/r2-storage';

export function makeGenerateReportUseCase() {
  return new GenerateReportUseCase(
    new DrizzleLinkRepository(),
    new R2Storage()
  );
}
