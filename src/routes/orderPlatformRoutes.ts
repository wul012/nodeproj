import type { FastifyInstance } from "fastify";

import { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import { AppHttpError } from "../errors.js";
import { assertUpstreamActionsEnabled, assertUpstreamProbesEnabled } from "../services/upstreamActionGuard.js";

interface OrderRouteDeps {
  orderPlatform: OrderPlatformClient;
  upstreamProbesEnabled: boolean;
  upstreamActionsEnabled: boolean;
}

interface OrderParams {
  orderId: string;
}

interface FailedEventParams {
  failedEventId: string;
}

export async function registerOrderPlatformRoutes(app: FastifyInstance, deps: OrderRouteDeps): Promise<void> {
  app.get<{ Params: FailedEventParams }>("/api/v1/order-platform/failed-events/:failedEventId/replay-readiness", {
    schema: {
      params: {
        type: "object",
        required: ["failedEventId"],
        properties: {
          failedEventId: { type: "string", pattern: "^[0-9]+$" },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => {
    assertUpstreamProbesEnabled(deps.upstreamProbesEnabled, "advanced-order-platform");
    const response = await deps.orderPlatform.failedEventReplayReadiness(request.params.failedEventId);
    return response.data;
  });

  app.get<{ Params: FailedEventParams }>("/api/v1/order-platform/failed-events/:failedEventId/replay-simulation", {
    schema: {
      params: {
        type: "object",
        required: ["failedEventId"],
        properties: {
          failedEventId: { type: "string", pattern: "^[0-9]+$" },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => {
    assertUpstreamProbesEnabled(deps.upstreamProbesEnabled, "advanced-order-platform");
    const response = await deps.orderPlatform.failedEventReplaySimulation(request.params.failedEventId);
    return response.data;
  });

  app.get<{ Params: FailedEventParams }>("/api/v1/order-platform/failed-events/:failedEventId/approval-status", {
    schema: {
      params: {
        type: "object",
        required: ["failedEventId"],
        properties: {
          failedEventId: { type: "string", pattern: "^[0-9]+$" },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => {
    assertUpstreamProbesEnabled(deps.upstreamProbesEnabled, "advanced-order-platform");
    const response = await deps.orderPlatform.failedEventApprovalStatus(request.params.failedEventId);
    return response.data;
  });

  app.get("/api/v1/order-platform/products", async () => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "advanced-order-platform");
    const response = await deps.orderPlatform.listProducts();
    return response.data;
  });

  app.get("/api/v1/order-platform/outbox/events", async () => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "advanced-order-platform");
    const response = await deps.orderPlatform.listOutboxEvents();
    return response.data;
  });

  app.get<{ Params: OrderParams }>("/api/v1/order-platform/orders/:orderId", async (request) => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "advanced-order-platform");
    const response = await deps.orderPlatform.getOrder(request.params.orderId);
    return response.data;
  });

  app.post("/api/v1/order-platform/orders", {
    schema: {
      headers: {
        type: "object",
        required: ["idempotency-key"],
        properties: {
          "idempotency-key": { type: "string", minLength: 1, maxLength: 120 },
        },
      },
      body: {
        type: "object",
        required: ["customerId", "items"],
        properties: {
          customerId: { type: "string", minLength: 1 },
          items: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              required: ["productId", "quantity"],
              properties: {
                productId: { type: "number" },
                quantity: { type: "number", minimum: 1 },
              },
              additionalProperties: false,
            },
          },
        },
        additionalProperties: false,
      },
    },
  }, async (request, reply) => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "advanced-order-platform");
    const idempotencyKey = request.headers["idempotency-key"];
    if (typeof idempotencyKey !== "string") {
      throw new AppHttpError(400, "IDEMPOTENCY_KEY_REQUIRED", "Idempotency-Key header is required");
    }

    const response = await deps.orderPlatform.createOrder(idempotencyKey, request.body);
    reply.code(response.statusCode);
    return response.data;
  });

  app.post<{ Params: OrderParams }>("/api/v1/order-platform/orders/:orderId/pay", async (request, reply) => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "advanced-order-platform");
    const response = await deps.orderPlatform.payOrder(request.params.orderId);
    reply.code(response.statusCode);
    return response.data;
  });

  app.post<{ Params: OrderParams }>("/api/v1/order-platform/orders/:orderId/cancel", async (request, reply) => {
    assertUpstreamActionsEnabled(deps.upstreamActionsEnabled, "advanced-order-platform");
    const response = await deps.orderPlatform.cancelOrder(request.params.orderId);
    reply.code(response.statusCode);
    return response.data;
  });
}
