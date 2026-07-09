import { CreateLinkUseCase } from '@/app/use-cases/create-link/create-link-use-case';
import { DrizzleLinkRepository } from '@/infra/repositories/drizzle-link-repository';

export function makeCreateLinkUseCase() {
  const repository = new DrizzleLinkRepository();

  return new CreateLinkUseCase(repository);
}
