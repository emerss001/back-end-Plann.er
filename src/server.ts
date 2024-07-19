import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes/trips/create-trip";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/trips/confirm-trip";
import { confirmParticipant } from "./routes/participants/confirm-participant";
import { createActivity } from "./routes/activities/create-activity";
import { getActivity } from "./routes/activities/get-activities";
import { createLink } from "./routes/links/create-link";
import { getLinks } from "./routes/links/get-links";
import { getParticipants } from "./routes/participants/get-participants";
import { createInvite } from "./routes/invites/create-invites";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Rotas de trips
app.register(createTrip);
app.register(confirmTrip);

// Rotas de atividades
app.register(createActivity);
app.register(getActivity);

// Rotas de links
app.register(createLink);
app.register(getLinks);

// Rotas de participantes
app.register(confirmParticipant);
app.register(getParticipants);

// Rotas de convite
app.register(createInvite);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running");
});
