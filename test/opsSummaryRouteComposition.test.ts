import { createHash } from "node:crypto";

import type { FastifyInstance } from "fastify";
import { describe, expect, it } from "vitest";

import {
  registerOpsSummaryRoutes,
  type OpsSummaryRouteDeps,
} from "../src/routes/opsSummaryRoutes.js";

type RouteMethod = "DELETE" | "GET" | "POST" | "PUT";

interface RouteRegistration {
  method: RouteMethod;
  path: string;
  schema: unknown;
}

const EXPECTED_ROUTE_KEYS = [
  "GET /api/v1/ops/summary",
  "GET /api/v1/ops/readiness",
  "GET /api/v1/ops/promotion-archive",
  "GET /api/v1/ops/promotion-archive/manifest",
  "GET /api/v1/ops/promotion-archive/verification",
  "GET /api/v1/ops/promotion-archive/attestation",
  "GET /api/v1/ops/promotion-archive/attestation/verification",
  "GET /api/v1/ops/promotion-archive/handoff-package",
  "GET /api/v1/ops/promotion-archive/handoff-package/verification",
  "GET /api/v1/ops/promotion-archive/handoff-certificate",
  "GET /api/v1/ops/promotion-archive/handoff-certificate/verification",
  "GET /api/v1/ops/promotion-archive/handoff-receipt",
  "GET /api/v1/ops/promotion-archive/handoff-receipt/verification",
  "GET /api/v1/ops/promotion-archive/handoff-closure",
  "GET /api/v1/ops/promotion-archive/handoff-closure/verification",
  "GET /api/v1/ops/promotion-archive/handoff-completion",
  "GET /api/v1/ops/promotion-archive/handoff-completion/verification",
  "GET /api/v1/ops/promotion-archive/release-evidence",
  "GET /api/v1/ops/promotion-archive/release-evidence/verification",
  "GET /api/v1/ops/promotion-archive/release-archive",
  "GET /api/v1/ops/promotion-archive/release-archive/verification",
  "GET /api/v1/ops/promotion-archive/deployment-approval",
  "GET /api/v1/ops/promotion-archive/deployment-approval/verification",
  "GET /api/v1/ops/promotion-archive/deployment-change-record",
  "GET /api/v1/ops/promotion-archive/deployment-change-record/verification",
  "GET /api/v1/ops/promotion-archive/deployment-execution-record",
  "GET /api/v1/ops/promotion-archive/deployment-execution-record/verification",
  "GET /api/v1/ops/promotion-archive/deployment-execution-receipt",
  "GET /api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
  "GET /api/v1/ops/promotion-archive/release-audit-trail-record",
  "GET /api/v1/ops/promotion-review",
  "GET /api/v1/ops/promotion-decisions",
  "GET /api/v1/ops/promotion-decisions/integrity",
  "GET /api/v1/ops/promotion-decisions/:decisionId/verification",
  "GET /api/v1/ops/promotion-decisions/:decisionId/evidence",
  "GET /api/v1/ops/promotion-decisions/:decisionId",
  "POST /api/v1/ops/promotion-decisions",
  "GET /api/v1/ops/runbook",
  "GET /api/v1/ops/checkpoints",
  "GET /api/v1/ops/checkpoints/diff",
  "GET /api/v1/ops/baseline",
  "PUT /api/v1/ops/baseline",
  "DELETE /api/v1/ops/baseline",
  "GET /api/v1/ops/checkpoints/:checkpointId",
  "POST /api/v1/ops/checkpoints",
  "GET /api/v1/ops/handoff-report",
] as const;

describe("ops summary route composition", () => {
  it("preserves registration order, methods, paths, and schemas", async () => {
    const { app, registrations } = createRouteRecorder();

    await registerOpsSummaryRoutes(app, {} as OpsSummaryRouteDeps);

    const routeKeys = registrations.map(({ method, path }) => `${method} ${path}`);
    const serialized = JSON.stringify(registrations);

    expect(routeKeys).toEqual(EXPECTED_ROUTE_KEYS);
    expect(createHash("sha256").update(serialized).digest("hex")).toBe(
      "7de62deb53695ed355e38286b69ad101453a0d42d00ae7aca08daaa6defc1957",
    );
  });
});

function createRouteRecorder(): {
  app: FastifyInstance;
  registrations: RouteRegistration[];
} {
  const registrations: RouteRegistration[] = [];
  const recorder: Record<string, unknown> = {};
  const register = (method: RouteMethod) => (path: string, ...args: unknown[]) => {
    registrations.push({ method, path, schema: readSchema(args) });
    return recorder;
  };

  recorder.get = register("GET");
  recorder.post = register("POST");
  recorder.put = register("PUT");
  recorder.delete = register("DELETE");

  return {
    app: recorder as unknown as FastifyInstance,
    registrations,
  };
}

function readSchema(args: unknown[]): unknown {
  if (args.length < 2 || typeof args[0] !== "object" || args[0] === null) {
    return null;
  }

  return "schema" in args[0] ? args[0].schema : null;
}
