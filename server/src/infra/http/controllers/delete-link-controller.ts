import { FastifyReply, FastifyRequest } from 'fastify';

import { makeDeleteLinkUseCase } from '../factories/make-delete-link-use-case';

interface Params {
  id: string;
}

export async function deleteLinkController(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  const useCase = makeDeleteLinkUseCase();

  await useCase.execute(id);

  return reply.status(204).send();
}
