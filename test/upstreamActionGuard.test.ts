import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AppHttpError } from "../src/errors.js";
import { assertUpstreamActionsEnabled } from "../src/services/upstreamActionGuard.js";

describe("assertUpstreamActionsEnabled", () => {
  it("allows calls when the action gate is enabled", () => {
    expect(() => assertUpstreamActionsEnabled(true, "mini-kv")).not.toThrow();
  });

  it("returns a stable 403 error when the action gate is disabled", () => {
    expect(() => assertUpstreamActionsEnabled(false, "mini-kv")).toThrow(AppHttpError);

    try {
      assertUpstreamActionsEnabled(false, "mini-kv");
    } catch (error) {
      expect(error).toBeInstanceOf(AppHttpError);
      expect((error as AppHttpError).statusCode).toBe(403);
      expect((error as AppHttpError).code).toBe("UPSTREAM_ACTIONS_DISABLED");
    }
  });
});

describe("upstream action route gate", () => {
  it("blocks Java and mini-kv proxy routes before touching upstreams", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const products = await app.inject({
        method: "GET",
        url: "/api/v1/order-platform/products",
      });
      const miniKvStatus = await app.inject({
        method: "GET",
        url: "/api/v1/mini-kv/status",
      });
      const runtimeConfig = await app.inject({
        method: "GET",
        url: "/api/v1/runtime/config",
      });

      expect(products.statusCode).toBe(403);
      expect(products.json()).toMatchObject({
        error: "UPSTREAM_ACTIONS_DISABLED",
      });
      expect(miniKvStatus.statusCode).toBe(403);
      expect(miniKvStatus.json()).toMatchObject({
        error: "UPSTREAM_ACTIONS_DISABLED",
      });
      expect(runtimeConfig.statusCode).toBe(200);
      expect(runtimeConfig.json().safety).toMatchObject({
        upstreamProbesEnabled: false,
        upstreamActionsEnabled: false,
      });
    } finally {
      await app.close();
    }
  });
});
