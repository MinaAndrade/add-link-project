import { FastifyReply, FastifyRequest } from 'fastify';

import { makeListLinksUseCase } from '../factories/make-list-links-use-case';

export async function listLinksController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const useCase = makeListLinksUseCase();

  const links = await useCase.execute();

  return reply.send(links);
}
