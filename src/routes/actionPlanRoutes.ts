import type { FastifyInstance } from "fastify";

import type { AppConfig } from "../config.js";
import { actionKeys, createActionPlan, listActionCatalog } from "../services/actionPlanner.js";
import type { ActionKey, ActionTarget } from "../services/actionPlanner.js";

interface ActionPlanRouteDeps {
  config: AppConfig;
}

interface ActionPlanBody {
  action: ActionKey;
  target?: ActionTarget;
}

const targetKeys = ["order-platform", "mini-kv"] as const;

export async function registerActionPlanRoutes(app: FastifyInstance, deps: ActionPlanRouteDeps): Promise<void> {
  app.get("/api/v1/action-plans/catalog", async () => ({
    targets: targetKeys.map((target) => ({
      target,
      actions: listActionCatalog().filter((action) => action.target === target),
    })),
  }));

  app.post<{ Body: ActionPlanBody }>("/api/v1/action-plans", {
    schema: {
      body: {
        type: "object",
        required: ["action"],
        properties: {
          action: { type: "string", enum: actionKeys },
          target: { type: "string", enum: targetKeys },
        },
        additionalProperties: false,
      },
    },
  }, async (request) => createActionPlan(deps.config, request.body));
}
