import { DeleteLinkUseCase } from '@/app/use-cases/delete-link/delete-link-use-case';
import { DrizzleLinkRepository } from '@/infra/repositories/drizzle-link-repository';

export function makeDeleteLinkUseCase() {
  return new DeleteLinkUseCase(new DrizzleLinkRepository());
}
