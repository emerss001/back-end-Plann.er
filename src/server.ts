import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes/trips/create-trip";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/trips/confirm-trip";
import { confirmParticipant } from "./routes/confirm-participant";
import { createActivity } from "./routes/activities/create-activity";
import { getActivity } from "./routes/activities/get-activities";
import { createLink } from "./routes/links/create-link";
import { getLinks } from "./routes/links/get-links";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(createActivity);
app.register(getActivity);
app.register(createLink);
app.register(getLinks);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running");
});
