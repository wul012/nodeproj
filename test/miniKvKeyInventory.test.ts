import net from "node:net";
import type { AddressInfo } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const openServers: net.Server[] = [];

afterEach(async () => {
  await Promise.all(openServers.splice(0).map((server) => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  })));
});

describe("mini-kv key inventory route", () => {
  it("is blocked by default so read-only probes cannot touch mini-kv accidentally", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/mini-kv/keys?prefix=orderops:",
      });

      expect(response.statusCode).toBe(403);
      expect(response.json()).toMatchObject({
        error: "UPSTREAM_PROBES_DISABLED",
      });
    } finally {
      await app.close();
    }
  });

  it("reads mini-kv v47 KEYSJSON through a probe-gated route", async () => {
    const seenCommands: string[] = [];
    const server = net.createServer((socket) => {
      socket.setEncoding("utf8");
      socket.on("data", (chunk) => {
        const command = chunk.trim();
        seenCommands.push(command);
        socket.end('{"prefix":"orderops:","key_count":2,"keys":["orderops:1","orderops:2"],"truncated":false,"limit":1000}\n');
      });
    });
    openServers.push(server);

    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address() as AddressInfo;
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      MINIKV_HOST: "127.0.0.1",
      MINIKV_PORT: String(address.port),
      UPSTREAM_PROBES_ENABLED: "true",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/mini-kv/keys?prefix=orderops:",
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        command: "KEYSJSON orderops:",
        inventory: {
          prefix: "orderops:",
          key_count: 2,
          keys: ["orderops:1", "orderops:2"],
          truncated: false,
          limit: 1000,
        },
      });
      expect(seenCommands).toEqual(["KEYSJSON orderops:"]);
    } finally {
      await app.close();
    }
  });
});
