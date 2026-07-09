import { RedirectLinkUseCase } from '@/app/use-cases/redirect-link/redirect-link-use-case';
import { DrizzleLinkRepository } from '@/infra/repositories/drizzle-link-repository';

export function makeRedirectLinkUseCase() {
  return new RedirectLinkUseCase(new DrizzleLinkRepository());
}
