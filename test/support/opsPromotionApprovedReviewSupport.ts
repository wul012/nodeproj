import { buildApp } from "../../src/app.js";
import { loadConfig } from "../../src/config.js";

type TestApp = Awaited<ReturnType<typeof buildApp>>;

export async function buildApprovedPromotionTestApp(): Promise<TestApp> {
  return buildApp(loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_ACTIONS_ENABLED: "true",
    UPSTREAM_PROBES_ENABLED: "true",
  }));
}

export async function recordApprovedPromotionDecision(app: TestApp) {
  const created = await app.inject({
    method: "POST",
    url: "/api/v1/operation-intents",
    payload: {
      action: "kv-status",
      operatorId: "decision-viewer",
      role: "viewer",
      reason: "v19 decision approved test",
    },
  });
  await app.inject({
    method: "POST",
    url: `/api/v1/operation-intents/${created.json().id}/confirm`,
    payload: {
      operatorId: "decision-viewer",
      confirmText: created.json().confirmation.requiredText,
    },
  });
  await app.inject({
    method: "POST",
    url: "/api/v1/operation-dispatches",
    payload: {
      intentId: created.json().id,
      requestedBy: "decision-viewer",
    },
  });
  const checkpoint = await app.inject({
    method: "POST",
    url: "/api/v1/ops/checkpoints",
    payload: {
      actor: "decision-viewer",
      note: "approved evidence",
    },
  });
  await app.inject({
    method: "PUT",
    url: "/api/v1/ops/baseline",
    payload: {
      checkpointId: checkpoint.json().id,
      actor: "decision-viewer",
      note: "approved baseline",
    },
  });
  return app.inject({
    method: "POST",
    url: "/api/v1/ops/promotion-decisions",
    payload: {
      reviewer: "decision-viewer",
      note: "approved decision",
    },
  });
}
