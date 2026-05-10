import { buildApp } from "./app.js";
import { loadConfig } from "./config.js";

const config = loadConfig();
const app = await buildApp(config);

const close = async (signal: string) => {
  app.log.info({ signal }, "shutting down");
  await app.close();
};

process.on("SIGINT", () => {
  void close("SIGINT").finally(() => process.exit(0));
});

process.on("SIGTERM", () => {
  void close("SIGTERM").finally(() => process.exit(0));
});

try {
  await app.listen({ host: config.host, port: config.port });
  app.log.info(
    {
      url: `http://${config.host}:${config.port}`,
      orderPlatformUrl: config.orderPlatformUrl,
      miniKv: `${config.miniKvHost}:${config.miniKvPort}`,
    },
    "orderops-node started",
  );
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
