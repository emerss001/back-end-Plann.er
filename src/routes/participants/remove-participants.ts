import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function removeParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/trips/:tripId/participants/remove",
    {
      schema: {
        body: z.object({
          participantsId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { participantsId } = request.body;

      await prisma.participant.deleteMany({
        where: {
          id: participantsId,
        },
      });

      reply.send("removed");
    }
  );
}
