import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";
import nodemailer from "nodemailer";
import { getMailClient } from "../lib/mail";

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips",
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
        }),
      },
    },
    async (request) => {
      const { destination, ends_at, starts_at, owner_name, owner_email } =
        request.body;

      if (dayjs(starts_at).isBefore(new Date())) {
        throw new Error("Data de início de viagem inválida.");
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new Error("Data de final de viagem inválida.");
      }

      const trip = await prisma.trip.create({
        data: {
          destination,
          starts_at,
          ends_at,
        },
      });

      const mail = await getMailClient();

      const message = await mail.sendMail({
        from: {
          name: "Equipe Plann.er",
          address: "equipe@plann.ner",
        },
        to: {
          name: owner_name,
          address: owner_email,
        },
        subject: "Testando envio de e-mail",
        html: `<p>Teste do envio de email</p>`,
      });

      console.log(nodemailer.getTestMessageUrl(message));

      return { tripId: trip.id };
    }
  );
}
