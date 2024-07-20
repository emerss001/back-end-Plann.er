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
import { updateTrip } from "./routes/trips/update-trip";
import { getTripDetails } from "./routes/trips/get-trips-details";
import { getParticipant } from "./routes/participants/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

// Rotas de trips
app.register(createTrip);
app.register(confirmTrip);
app.register(updateTrip);
app.register(getTripDetails);

// Rotas de atividades
app.register(createActivity);
app.register(getActivity);

// Rotas de links
app.register(createLink);
app.register(getLinks);

// Rotas de participants
app.register(confirmParticipant);
app.register(getParticipants);
app.register(getParticipant);

// Rotas de invite
app.register(createInvite);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running");
});
