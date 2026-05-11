import type { FastifyInstance } from "fastify";

import { MiniKvClient, validateRawGatewayCommand } from "../clients/miniKvClient.js";
import { assertUpstreamActionsEnabled, assertUpstreamProbesEnabled } from "../services/upstreamActionGuard.js";

interface MiniKvRouteDeps {
  miniKv: MiniKvClient;
  upstreamProbesEnabled: boolean;
  upstreamActionsEnabled: boolean;
}

interface KeyParams {
  key: string;
}

interface SetKeyBody {
  value: string;
  ttlSeconds?: number;
}

interface RawCommandBody {
  command: string;
}

interface KeyInventoryQuery {
  prefix?: string;
}

interface ExplainCommandQuery {
  command: string;
}

export async function registerMiniKvRoutes(app: FastifyInstance, deps: MiniKvRouteDeps): Promise<void> {
  app.get<{ Querystring: KeyInventoryQuery }>("/api/v1/mini-kv/keys", {
    schema: {
      querystring: {
        type: "object",
        properties: {
          prefix: { type: "string", minLength: 1, maxLength: 160, pattern: "^[A-Za-z0-9:_-]+$" },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => {
    assertUpstreamProbesEnabled(deps.upstreamProbesEnabled, "mini-kv");
    return deps.miniKv.keysJson(request.query.prefix);
  });

  app.get<{ Querystring: ExplainCommandQuery }>("/api/v1/mini-kv/explain", {
    schema: {
      querystring: {
        type: "object",
        required: ["command"],
        properties: {
          command: { type: "string", minLength: 1, maxLength: 512, pattern: "^[^\\r\\n]+$" },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => {
    assertUpstreamProbesEnabled(deps.upstreamProbesEnabled, "mini-kv");
    return deps.miniKv.explainJson(request.query.command);
  });

  app.get("/api/v1/mini-kv/status", async () => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "mini-kv");
    const [ping, size] = await Promise.all([deps.miniKv.ping(), deps.miniKv.size()]);
    return {
      ping,
      size,
    };
  });

  app.get<{ Params: KeyParams }>("/api/v1/mini-kv/:key", async (request) => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "mini-kv");
    return deps.miniKv.getKey(request.params.key);
  });

  app.put<{ Params: KeyParams; Body: SetKeyBody }>("/api/v1/mini-kv/:key", {
    schema: {
      body: {
        type: "object",
        required: ["value"],
        properties: {
          value: { type: "string", minLength: 1, maxLength: 16384 },
          ttlSeconds: { type: "integer", minimum: 1, maximum: 604800 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "mini-kv");
    return deps.miniKv.setKey(request.params.key, request.body.value, request.body.ttlSeconds);
  });

  app.delete<{ Params: KeyParams }>("/api/v1/mini-kv/:key", async (request) => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "mini-kv");
    return deps.miniKv.deleteKey(request.params.key);
  });

  app.post<{ Body: RawCommandBody }>("/api/v1/mini-kv/commands", {
    schema: {
      body: {
        type: "object",
        required: ["command"],
        properties: {
          command: { type: "string", minLength: 1, maxLength: 16384 },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "mini-kv");
    validateRawGatewayCommand(request.body.command);
    return deps.miniKv.execute(request.body.command);
  });
}
