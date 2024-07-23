import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteLink(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/trips/:tripId/links/:linkId",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
          linkId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId, linkId } = request.params;

      await prisma.link.delete({
        where: {
          id: linkId,
          trip_id: tripId,
        },
      });
      reply.redirect(`/trips/${tripId}/`).send("ok");
    }
  );
}
