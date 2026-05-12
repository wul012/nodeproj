import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createUpstreamProductionEvidenceIntake,
  loadUpstreamProductionEvidenceIntake,
} from "../src/services/upstreamProductionEvidenceIntake.js";

describe("upstream production evidence intake", () => {
  it("loads Java ops evidence and mini-kv STORAGEJSON evidence as read-only upstream evidence", async () => {
    const intake = await loadUpstreamProductionEvidenceIntake(loadConfig({
      LOG_LEVEL: "silent",
    }));

    expect(intake).toMatchObject({
      service: "orderops-node",
      intakeVersion: "upstream-production-evidence-intake.v1",
      valid: true,
      readOnly: true,
      executionAllowed: false,
      checks: {
        javaEvidenceReadable: true,
        javaEvidenceVersionOk: true,
        javaReadOnly: true,
        javaExecutionBlocked: true,
        javaReplayNotAllowedByEvidence: true,
        javaApprovalDryRun: true,
        miniKvEvidenceReadable: true,
        miniKvSchemaVersionOk: true,
        miniKvReadOnly: true,
        miniKvExecutionBlocked: true,
        miniKvNotOrderAuthoritative: true,
        miniKvNoWriteCommandsExecuted: true,
        allSourcesReadOnly: true,
        executionStillBlocked: true,
      },
      summary: {
        sourceCount: 2,
        validSourceCount: 2,
        productionBlockerCount: 0,
        warningCount: 2,
      },
      normalized: {
        java: {
          serviceName: "advanced-order-platform",
          evidenceVersion: "java-ops-evidence.v1",
          realReplayAllowedByEvidence: false,
          requiredApprovalStatus: "APPROVED",
          dryRun: true,
        },
        miniKv: {
          version: "0.54.0",
          schemaVersion: 1,
          walEnabled: false,
          orderAuthoritative: false,
          sideEffectCount: 3,
        },
      },
    });
    expect(intake.normalized.miniKv.diagnosticNotes).toContain("not_order_authoritative");
  });

  it("blocks intake when upstream evidence would allow execution", () => {
    const intake = createUpstreamProductionEvidenceIntake({
      javaPath: "java.json",
      javaEvidence: {
        evidenceVersion: "java-ops-evidence.v1",
        readOnly: true,
        executionAllowed: true,
        failedEventReplay: {
          realReplayAllowedByEvidence: true,
        },
        approvalExecution: {
          dryRun: false,
        },
        evidenceEndpoints: [],
      },
      miniKvPath: "minikv.json",
      miniKvEvidence: {
        schema_version: 1,
        read_only: true,
        execution_allowed: true,
        store: {
          order_authoritative: true,
        },
        diagnostics: {
          write_commands_executed: true,
          order_authoritative: true,
          notes: [],
        },
        side_effects: ["metadata_read"],
        side_effect_count: 2,
      },
    });

    expect(intake.valid).toBe(false);
    expect(intake.checks.executionStillBlocked).toBe(false);
    expect(intake.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "JAVA_EXECUTION_ALLOWED",
      "JAVA_REPLAY_ALLOWED_BY_EVIDENCE",
      "JAVA_APPROVAL_NOT_DRY_RUN",
      "MINIKV_EXECUTION_ALLOWED",
      "MINIKV_ORDER_AUTHORITATIVE",
      "MINIKV_WRITE_EXECUTED",
      "MINIKV_SIDE_EFFECT_COUNT_MISMATCH",
      "UPSTREAM_EXECUTION_NOT_BLOCKED",
    ]));
  });

  it("exposes upstream production evidence intake routes in JSON and Markdown", async () => {
    const paths = await writeEvidenceSet();
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      JAVA_OPS_EVIDENCE_FIXTURE_PATH: paths.javaPath,
      MINIKV_STORAGE_EVIDENCE_FIXTURE_PATH: paths.miniKvPath,
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/upstreams/production-evidence-intake",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/upstreams/production-evidence-intake?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        valid: true,
        executionAllowed: false,
        checks: {
          javaEvidenceVersionOk: true,
          miniKvNoWriteCommandsExecuted: true,
          executionStillBlocked: true,
        },
        summary: {
          productionBlockerCount: 0,
          warningCount: 2,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Upstream production evidence intake");
      expect(markdown.body).toContain("java.evidenceVersion: java-ops-evidence.v1");
      expect(markdown.body).toContain("miniKv.version: 0.54.0");
      expect(markdown.body).toContain("upstreamProductionEvidenceIntakeJson");
    } finally {
      await app.close();
    }
  });
});

async function writeEvidenceSet(): Promise<{ javaPath: string; miniKvPath: string }> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-upstream-production-evidence-"));
  const javaPath = path.join(directory, "java-ops-evidence.json");
  const miniKvPath = path.join(directory, "mini-kv-storage-evidence.json");

  await writeFile(javaPath, `${JSON.stringify({
    evidenceVersion: "java-ops-evidence.v1",
    service: {
      name: "advanced-order-platform",
      version: "0.1.0-SNAPSHOT",
    },
    readOnly: true,
    executionAllowed: false,
    failedEventReplay: {
      replayBacklog: 0,
      realReplayAllowedByEvidence: false,
    },
    outbox: {
      pendingEvents: 0,
    },
    approvalExecution: {
      requiredApprovalStatus: "APPROVED",
      dryRun: true,
    },
    blockers: ["READ_ONLY_EVIDENCE_ENDPOINT"],
    warnings: [],
    evidenceEndpoints: [
      "/api/v1/ops/overview",
      "/api/v1/failed-events/summary",
      "/api/v1/failed-events/{id}/approval-status",
      "/api/v1/failed-events/{id}/replay-readiness",
      "/api/v1/failed-events/{id}/replay-execution-contract",
    ],
  })}\n`);
  await writeFile(miniKvPath, `${JSON.stringify({
    schema_version: 1,
    read_only: true,
    execution_allowed: false,
    version: "0.54.0",
    store: {
      live_keys: 0,
      order_authoritative: false,
    },
    wal: {
      enabled: false,
      status: "disabled",
    },
    snapshot: {
      supported: true,
    },
    side_effects: ["metadata_read", "store_read", "wal_metadata_read_when_enabled"],
    side_effect_count: 3,
    diagnostics: {
      read_only_command: true,
      write_commands_executed: false,
      order_authoritative: false,
      notes: ["read_only_storage_evidence", "not_order_authoritative"],
    },
  })}\n`);

  return { javaPath, miniKvPath };
}
