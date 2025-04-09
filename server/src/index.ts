import "@dotenvx/dotenvx/config";
import {env} from "bun";
import open from "open";
import {app} from "./app";
import {elysiaLogger} from "./internal-exports";

const ELYSIA_VERSION = import.meta.require("elysia/package.json").version;

const startTime = performance.now();

// clear screen
process.stdout.write("\x1Bc\n");

app
  .onError(({error}) => {
    elysiaLogger.error(error);
  })
  .listen(
    {
      port: env.PORT,
      hostname: env.HOSTNAME,
    },
    async (server) => {
      elysiaLogger.info(`env.NODE_ENV: ${env.NODE_ENV}`);
      const duration = performance.now() - startTime;
      elysiaLogger.info(
        `🦊 Elysia v${ELYSIA_VERSION} started in ${duration.toFixed(2)} ms`,
      );
      elysiaLogger.info(`➜ Server: ${String(server.url)}`);
      if (env.NODE_ENV === "development") {
        await open(`${server.url}swagger`);
      }
    },
  );
