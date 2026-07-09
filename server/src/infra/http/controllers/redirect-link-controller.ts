import { FastifyReply, FastifyRequest } from 'fastify';

import { makeRedirectLinkUseCase } from '../factories/make-redirect-link-use-case';

interface Params {
  shortCode: string;
}

export async function redirectLinkController(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  const { shortCode } = request.params;

  const useCase = makeRedirectLinkUseCase();

  const originalUrl = await useCase.execute(shortCode);

  return reply.redirect(originalUrl);
}
