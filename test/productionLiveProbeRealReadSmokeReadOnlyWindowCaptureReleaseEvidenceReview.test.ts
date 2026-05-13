import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { MiniKvClient } from "../src/clients/miniKvClient.js";
import { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import { loadProductionConnectionDryRunChangeRequest } from "../src/services/productionConnectionDryRunChangeRequest.js";
import { ProductionConnectionDryRunApprovalLedger } from "../src/services/productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview,
} from "../src/services/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.js";

describe("production live probe real-read smoke read-only window capture release evidence review", () => {
  it("combines v158 archive verification with Java v51 and mini-kv v60 field guides", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-read-only-release-review-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v159 release evidence review");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-release-evidence-review.v1",
        reviewState: "reviewed-read-only-skipped-capture",
        readyForReadOnlyCaptureReleaseEvidenceReview: true,
        readyForProductionPassEvidence: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        review: {
          archiveVerificationProfileVersion: "production-live-probe-real-read-smoke-read-only-window-capture-archive-verification.v1",
          archiveVerificationState: "verified-read-only-skipped-capture-archive",
          captureState: "captured-skipped",
          archivedAsProductionPassEvidence: false,
          releaseSemantics: "non-pass-local-evidence",
          javaFieldGuideTag: "v51订单平台ops-evidence-field-guide",
          javaFieldGuideVersion: "java-ops-evidence-field-guide.v1",
          miniKvFieldGuideTag: "第六十版运行时只读字段说明",
          miniKvFieldGuideVersion: "mini-kv-runtime-read-field-guide.v1",
          upstreamActionsEnabled: false,
          automaticUpstreamStart: false,
          mutatesUpstreamState: false,
          runtimeFileRead: false,
        },
        checks: {
          archiveVerificationReady: true,
          archiveVerificationDigestValid: true,
          captureArchiveDigestValid: true,
          archiveVerificationProfileVersionValid: true,
          archiveVerificationChecksAllPassed: true,
          javaV51FieldGuideReady: true,
          miniKvV60FieldGuideReady: true,
          javaFieldGuideExplainsNonPassOnly: true,
          miniKvFieldGuideExplainsNonPassOnly: true,
          skippedOrMixedNotProductionPass: true,
          upstreamActionsStillDisabled: true,
          noAutomaticUpstreamStart: true,
          readyForProductionOperationsStillFalse: true,
          releaseReviewDoesNotAuthorizeExecution: true,
          readyForReadOnlyCaptureReleaseEvidenceReview: true,
        },
        summary: {
          upstreamFieldGuideCount: 2,
          productionBlockerCount: 0,
        },
      });
      expect(profile.review.releaseReviewDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.review.archiveVerificationDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.review.captureArchiveDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.warnings.map((warning) => warning.code)).toContain("RELEASE_REVIEW_READY");
      expect(profile.warnings.map((warning) => warning.code)).toContain("NON_PASS_LOCAL_EVIDENCE");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 30000);

  it("blocks release evidence review when upstream actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-read-only-release-review-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v159 blocked release evidence review");
      const profile = await loadProductionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.reviewState).toBe("blocked");
      expect(profile.readyForReadOnlyCaptureReleaseEvidenceReview).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("ARCHIVE_VERIFICATION_BLOCKED");
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 30000);

  it("exposes release evidence review routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-read-only-release-review-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const changeRequest = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-dry-run-change-request",
        headers,
      });
      await app.inject({
        method: "POST",
        url: "/api/v1/production/connection-dry-run-approvals",
        headers,
        payload: {
          decision: "approve",
          reviewer: "approver-1",
          reason: "approve v159 route release review",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-release-evidence-review",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-read-only-window-capture-release-evidence-review?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        reviewState: "reviewed-read-only-skipped-capture",
        readyForReadOnlyCaptureReleaseEvidenceReview: true,
        checks: {
          javaV51FieldGuideReady: true,
          miniKvV60FieldGuideReady: true,
          skippedOrMixedNotProductionPass: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke read-only window capture release evidence review");
      expect(markdown.body).toContain("v51订单平台ops-evidence-field-guide");
      expect(markdown.body).toContain("第六十版运行时只读字段说明");
      expect(markdown.body).toContain("NON_PASS_LOCAL_EVIDENCE");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);
});

async function approveCurrentChangeRequest(
  config: ReturnType<typeof loadConfig>,
  runtime: ReturnType<typeof createAuditStoreRuntime>,
  ledger: ProductionConnectionDryRunApprovalLedger,
  reason: string,
): Promise<void> {
  const changeRequest = await loadProductionConnectionDryRunChangeRequest({
    config,
    auditLog: runtime.auditLog,
    auditStoreRuntime: runtime.description,
  });
  await ledger.create({
    decision: "approve",
    reviewer: "read-only-capture-release-review",
    reason,
    changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
  }, {
    config,
    auditLog: runtime.auditLog,
    auditStoreRuntime: runtime.description,
  });
}

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
