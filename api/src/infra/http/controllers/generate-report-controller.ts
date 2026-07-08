import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGenerateReportUseCase } from '../factories/make-generate-report-use-case';

export async function generateReportController(
  _: FastifyRequest,
  reply: FastifyReply
) {
  const useCase = makeGenerateReportUseCase();

  const result = await useCase.execute();

  return reply.send(result);
}
