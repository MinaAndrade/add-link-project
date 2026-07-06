import { ListLinksUseCase } from '@/app/use-cases/list-links/list-links-use-case';
import { DrizzleLinkRepository } from '@/infra/repositories/drizzle-link-repository';

export function makeListLinksUseCase() {
  return new ListLinksUseCase(new DrizzleLinkRepository());
}
