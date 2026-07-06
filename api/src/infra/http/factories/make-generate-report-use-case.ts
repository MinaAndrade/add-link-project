import { GenerateReportUseCase } from '@/app/use-cases/generate-report/generate-report-use-case';
import { DrizzleLinkRepository } from '@/infra/repositories/drizzle-link-repository';

export function makeGenerateReportUseCase() {
  return new GenerateReportUseCase(new DrizzleLinkRepository());
}
