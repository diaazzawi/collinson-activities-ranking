import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import {env} from "bun";
import Elysia from "elysia";
import {api} from "./api";
import {elysiaLogger} from "./internal-exports";

const app = new Elysia()
  .decorate("logger", elysiaLogger)
  .use(cors())
  .use(elysiaLogger.into())
  .use(api);

if (env.NODE_ENV === undefined || env.NODE_ENV === "development") {
  app.use(
    swagger({
      documentation: {
        info: {
          title: "Collinson Assessment - Activities Ranking Documentation",
          version: "1.0.0",
          contact: {
            name: "Dia Azzawi",
            email: "dia.azzawi@gmail.com",
          },
          description:
            "RESTful API hosted on Elysia server (powered by Bun) for the purpose of techincal assessment for a Client Solutions Architect position at Collinson Group.",
        },
      },
      exclude: ["/swagger", "/swagger/json"],
    }),
  );
}

export {app};
