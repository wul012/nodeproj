import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadRollbackWindowReadinessChecklist,
} from "../src/services/rollbackWindowReadinessChecklist.js";

describe("rollback window readiness checklist", () => {
  it("combines Java v57 and mini-kv v66 handoffs into a manual rollback window checklist", () => {
    const profile = loadRollbackWindowReadinessChecklist(
      loadTestConfig("memory://rollback-window-readiness-checklist"),
    );

    expect(profile).toMatchObject({
      profileVersion: "rollback-window-readiness-checklist.v1",
      checklistState: "ready-for-manual-window-review",
      readyForRollbackWindowReadinessChecklist: true,
      readyForProductionRollback: false,
      readyForProductionOperations: false,
      readOnly: true,
      dryRunOnly: true,
      executionAllowed: false,
      checklist: {
        previousBundleGateVersion: "cross-project-release-bundle-gate.v1",
        javaVersion: "Java v57",
        javaHandoffVersion: "java-rollback-approval-handoff.v1",
        miniKvVersion: "mini-kv v66",
        miniKvHandoffVersion: "mini-kv-restore-compatibility-handoff.v1",
        nodeBaselineTag: "v165",
        windowMode: "manual-readiness-checklist-only",
        nodeMayRenderChecklist: true,
        nodeMayTriggerJavaRollback: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayModifyRuntimeConfig: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayExecuteMiniKvAdminCommands: false,
        upstreamActionsEnabled: false,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionRollbackAuthorized: false,
      },
      checks: {
        previousBundleGateReady: true,
        previousGateDoesNotAuthorizeReleaseOrRollback: true,
        javaV57HandoffReady: true,
        javaHandoffVersionReady: true,
        javaRequiredConfirmationsComplete: true,
        javaNodeCannotTriggerRollback: true,
        javaCannotExecuteRollbackSql: true,
        javaCannotReadSecrets: true,
        javaBoundariesClosed: true,
        javaForbiddenOperationsComplete: true,
        javaArchiveRootUsesC: true,
        miniKvV66HandoffReady: true,
        miniKvHandoffVersionReady: true,
        miniKvManualConfirmationsComplete: true,
        miniKvRestoreSmokeReadOnly: true,
        miniKvDangerousCommandsExplainedOnly: true,
        miniKvWriteAdminRestoreNotExecuted: true,
        miniKvBoundariesClosed: true,
        miniKvArchiveRootUsesC: true,
        checklistStepsDryRunOnly: true,
        forbiddenOperationsCovered: true,
        upstreamActionsStillDisabled: true,
        noAutomaticUpstreamStart: true,
        readyForProductionRollbackStillFalse: true,
        readyForProductionOperationsStillFalse: true,
        readyForRollbackWindowReadinessChecklist: true,
      },
      artifacts: {
        javaRollbackApprovalHandoff: {
          plannedVersion: "Java v57",
          evidenceTag: "v57订单平台rollback-approval-handoff-sample",
          handoffEndpoint: "/contracts/rollback-approval-handoff.sample.json",
          approvalMode: "OPERATOR_CONFIRMATION_REQUIRED",
          requiredConfirmationFields: [
            "artifact-version-target",
            "runtime-config-profile",
            "configuration-secret-source",
            "database-migration-direction",
            "release-bundle-manifest",
            "deployment-rollback-evidence",
          ],
          nodeMayRenderChecklist: true,
          nodeMayTriggerRollback: false,
          nodeMayExecuteRollbackSql: false,
          nodeMayReadSecretValues: false,
          requiresProductionDatabase: false,
          requiresProductionSecrets: false,
          connectsMiniKv: false,
          archivePath: "c/57",
        },
        miniKvRestoreCompatibilityHandoff: {
          plannedVersion: "mini-kv v66",
          evidenceTag: "第六十六版恢复兼容交接样本",
          projectVersion: "0.66.0",
          releaseVersion: "v66",
          manualConfirmationIds: [
            "binary-compatibility",
            "wal-compatibility",
            "snapshot-compatibility",
            "fixture-compatibility",
          ],
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          restoreExecutionAllowed: false,
          orderAuthoritative: false,
          connectedToJavaTransactionChain: false,
          archivePath: "c/66",
        },
      },
      summary: {
        checklistCheckCount: 26,
        passedChecklistCheckCount: 26,
        handoffCount: 2,
        checklistStepCount: 6,
        forbiddenOperationCount: 8,
        productionBlockerCount: 0,
      },
    });
    expect(profile.checklist.checklistDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.checklist.previousBundleGateDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.checklistSteps.every((step) => (
      step.dryRunOnly
      && step.readOnly
      && !step.mutatesState
      && !step.executesRollback
      && !step.executesRestore
    ))).toBe(true);
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Trigger Java rollback from Node v166",
    );
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Execute mini-kv restore or admin commands",
    );
    expect(profile.recommendations.map((recommendation) => recommendation.code)).toContain("START_POST_V166_PLAN");
  });

  it("blocks the rollback window checklist when upstream actions are enabled", () => {
    const profile = loadRollbackWindowReadinessChecklist(loadTestConfig(
      "memory://rollback-window-readiness-checklist-blocked",
      { UPSTREAM_ACTIONS_ENABLED: "true" },
    ));

    expect(profile.checklistState).toBe("blocked");
    expect(profile.readyForRollbackWindowReadinessChecklist).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.checklist.upstreamActionsEnabled).toBe(true);
    expect(profile.checklist.productionRollbackAuthorized).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
  });

  it("exposes rollback window readiness checklist routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-rollback-window-checklist-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/rollback-window-readiness-checklist",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/rollback-window-readiness-checklist?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        checklistState: "ready-for-manual-window-review",
        readyForRollbackWindowReadinessChecklist: true,
        checks: {
          javaCannotExecuteRollbackSql: true,
          miniKvWriteAdminRestoreNotExecuted: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Rollback window readiness checklist");
      expect(markdown.body).toContain("Java v57");
      expect(markdown.body).toContain("mini-kv v66");
      expect(markdown.body).toContain("START_POST_V166_PLAN");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});

function loadTestConfig(auditStorePath: string, overrides: Record<string, string> = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    AUDIT_STORE_KIND: "file",
    AUDIT_STORE_PATH: auditStorePath,
    AUDIT_STORE_URL: "managed-audit://contract-only",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    ...overrides,
  });
}
