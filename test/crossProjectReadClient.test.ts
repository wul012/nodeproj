import { createServer, type Server } from "node:http";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  buildCapstoneRouteCensus,
  CrossProjectReadClient,
} from "../src/integration/crossProjectReadClient.js";

describe("CrossProjectReadClient", () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createServer((request, response) => {
      response.setHeader("content-type", "application/json");
      if (request.url === "/actuator/health") {
        response.end(JSON.stringify({ status: "UP" }));
        return;
      }
      response.end(JSON.stringify({ evidenceVersion: "test-v1" }));
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (address === null || typeof address === "string") {
      throw new Error("test server did not expose a TCP address");
    }
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  });

  it("exposes only the two catalogued read methods", () => {
    const census = buildCapstoneRouteCensus();

    expect(census.public_methods).toEqual(["health", "opsEvidence"]);
    expect(census.route_count).toBe(2);
    expect(census.read_route_count).toBe(2);
    expect(census.write_route_count).toBe(0);
    expect(census.routes.every((route) => route.method === "GET")).toBe(true);
  });

  it("reads health and ops evidence as JSON", async () => {
    const client = new CrossProjectReadClient(baseUrl, 2_000);

    await expect(client.health()).resolves.toMatchObject({ statusCode: 200, data: { status: "UP" } });
    await expect(client.opsEvidence()).resolves.toMatchObject({
      statusCode: 200,
      data: { evidenceVersion: "test-v1" },
    });
  });
});
