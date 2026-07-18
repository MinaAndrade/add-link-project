import type { FastifyReply, FastifyRequest } from 'fastify';

import { makeRedirectLinkUseCase } from '../factories/make-redirect-link-use-case';

interface Params {
  shortCode: string;
}

export async function resolveLinkController(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  const { shortCode } = request.params;

  const useCase = makeRedirectLinkUseCase();

  const originalUrl = await useCase.execute(shortCode);

  return reply.status(200).send({ originalUrl });
}
