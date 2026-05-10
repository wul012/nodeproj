import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AppHttpError } from "../src/errors.js";
import { assertMutationAllowed, mutationScope, MutationRateLimiter } from "../src/services/mutationRateLimiter.js";

describe("MutationRateLimiter", () => {
  it("limits mutation attempts per normalized scope", () => {
    const limiter = new MutationRateLimiter({
      windowMs: 1000,
      maxRequests: 2,
    });

    const first = limiter.consume(mutationScope("operation-intents:create", "Dev-Admin"), 1000);
    const second = limiter.consume(mutationScope("operation-intents:create", "dev-admin"), 1001);
    const third = limiter.consume(mutationScope("operation-intents:create", "dev-admin"), 1002);

    expect(first).toMatchObject({ allowed: true, remaining: 1, limit: 2 });
    expect(second).toMatchObject({ allowed: true, remaining: 0, limit: 2 });
    expect(third).toMatchObject({ allowed: false, remaining: 0, limit: 2 });
    expect(() => assertMutationAllowed(third)).toThrow(AppHttpError);
  });

  it("opens a fresh bucket after the window resets", () => {
    const limiter = new MutationRateLimiter({
      windowMs: 1000,
      maxRequests: 1,
    });

    expect(limiter.consume("scope", 1000).allowed).toBe(true);
    expect(limiter.consume("scope", 1500).allowed).toBe(false);
    expect(limiter.consume("scope", 2001).allowed).toBe(true);
  });
});

describe("mutation rate limit routes", () => {
  it("returns 429 for repeated intent creation by the same operator", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      MUTATION_RATE_LIMIT_MAX: "1",
      MUTATION_RATE_LIMIT_WINDOW_MS: "60000",
    }));

    try {
      const payload = {
        action: "kv-set",
        operatorId: "limited-dev",
        role: "admin",
      };
      const first = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload,
      });
      const second = await app.inject({
        method: "POST",
        url: "/api/v1/operation-intents",
        payload: {
          ...payload,
          action: "kv-delete",
        },
      });

      expect(first.statusCode).toBe(201);
      expect(first.headers["x-mutation-ratelimit-remaining"]).toBe("0");
      expect(second.statusCode).toBe(429);
      expect(second.headers["retry-after"]).toBeDefined();
      expect(second.json()).toMatchObject({
        error: "MUTATION_RATE_LIMITED",
        details: {
          limit: 1,
          remaining: 0,
          windowMs: 60000,
        },
      });
    } finally {
      await app.close();
    }
  });

  it("exposes the active mutation limit in runtime config", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      MUTATION_RATE_LIMIT_MAX: "7",
      MUTATION_RATE_LIMIT_WINDOW_MS: "45000",
    }));

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/runtime/config",
      });

      expect(response.statusCode).toBe(200);
      expect(response.json().mutationRateLimit).toMatchObject({
        maxRequests: 7,
        windowMs: 45000,
      });
    } finally {
      await app.close();
    }
  });
});
