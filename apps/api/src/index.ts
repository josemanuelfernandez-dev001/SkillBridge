import { buildServer } from "./app";

const server = buildServer();
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

server
  .listen({ port, host })
  .then(() => {
    server.log.info(`API listening on ${host}:${port}`);
  })
  .catch((error) => {
    server.log.error(error);
    process.exit(1);
  });
