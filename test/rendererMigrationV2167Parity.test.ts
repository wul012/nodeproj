import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  renderOperationApprovalEvidenceMarkdown,
  renderOperationApprovalEvidenceVerificationMarkdown,
} from "../src/services/operationApprovalEvidenceRenderer.js";
import type {
  OperationApprovalEvidenceReport,
  OperationApprovalEvidenceVerification,
} from "../src/services/operationApprovalEvidenceTypes.js";
import type { OpsPromotionReleaseAuditTrailRecord } from "../src/services/opsPromotionArchiveBundleTypes.js";
import {
  renderOpsPromotionReleaseAuditTrailRecordMarkdown,
} from "../src/services/opsPromotionReleaseAuditTrailMarkdownRenderer.js";

describe("v2167 renderer migration parity", () => {
  it("keeps operation approval evidence report and verification markdown byte-identical", () => {
    const reportMarkdown = renderOperationApprovalEvidenceMarkdown(operationApprovalReportFixture());
    const verificationMarkdown =
      renderOperationApprovalEvidenceVerificationMarkdown(operationApprovalVerificationFixture());

    expect(reportMarkdown.endsWith("\n")).toBe(true);
    expect((reportMarkdown.match(/^## /gm) ?? []).length).toBe(7);
    expect((reportMarkdown.match(/^### /gm) ?? []).length).toBe(1);
    expect(reportMarkdown.length).toBe(2090);
    expect(sha256(reportMarkdown)).toBe("19d864f7a32ef7b8a8a4f0c9b9c645eb3fdd8f5e409c4186ffc515cb4f28b199");

    expect(verificationMarkdown.endsWith("\n")).toBe(true);
    expect((verificationMarkdown.match(/^## /gm) ?? []).length).toBe(2);
    expect((verificationMarkdown.match(/^### /gm) ?? []).length).toBe(0);
    expect(verificationMarkdown.length).toBe(1004);
    expect(sha256(verificationMarkdown)).toBe("aa988caaa667c662c9a2ca5b1ee3a2fcfc39553f0f6d4a33582fe9932584185d");
  });

  it("keeps promotion release audit trail markdown byte-identical", () => {
    const markdown = renderOpsPromotionReleaseAuditTrailRecordMarkdown(promotionAuditTrailFixture());

    expect(markdown.endsWith("\n")).toBe(true);
    expect((markdown.match(/^## /gm) ?? []).length).toBe(4);
    expect((markdown.match(/^### /gm) ?? []).length).toBe(2);
    expect(markdown.length).toBe(2353);
    expect(sha256(markdown)).toBe("3d4f8b6becceb2aa7f3f81213aa3d13ab476e2d1551f26421aa377f0a608042c");
  });
});

function operationApprovalReportFixture(): OperationApprovalEvidenceReport {
  const summary: OperationApprovalEvidenceReport["summary"] = {
    action: "kv-set",
    target: "mini-kv",
    requestStatus: "approved",
    decision: "approved",
    reviewer: "ops-reviewer",
    upstreamTouched: false,
    readyForApprovalRequest: true,
    preflightDigest: digest("a"),
    previewDigest: digest("b"),
    decisionDigest: digest("c"),
    expectedSideEffectCount: 2,
    hardBlockerCount: 1,
    warningCount: 1,
    javaApprovalStatus: "not_applicable",
    javaExecutionContractStatus: "not_applicable",
    miniKvExplainCoverage: "available",
    miniKvSideEffects: ["store_write", "wal_append_when_enabled"],
    miniKvSchemaVersion: 1,
    miniKvCommandDigest: "fnv1a64:1234567890abcdef",
    miniKvSideEffectCount: 2,
    miniKvExecutionContractStatus: "available",
    miniKvCheckReadOnly: true,
    miniKvCheckExecutionAllowed: false,
    miniKvCheckDurability: "wal_backed",
  };

  return {
    service: "orderops-node",
    title: "Operation approval evidence report",
    generatedAt: "2026-07-07T00:00:00.000Z",
    requestId: "request-v2167",
    decisionId: "decision-v2167",
    intentId: "intent-v2167",
    state: "approved",
    evidenceDigest: {
      ...digest("e"),
      coveredFields: ["service", "requestId", "summary"],
    },
    summary,
    request: {
      service: "orderops-node",
      requestId: "request-v2167",
      intentId: "intent-v2167",
      action: "kv-set",
      target: "mini-kv",
      requestedBy: "local-admin",
      reviewer: "ops-reviewer",
      status: "approved",
      decisionReason: "reviewed deterministic renderer fixture",
      createdAt: "2026-07-07T00:00:00.000Z",
      updatedAt: "2026-07-07T00:00:00.000Z",
      expiresAt: "2026-07-07T00:10:00.000Z",
      preflightDigest: digest("a"),
      previewDigest: digest("b"),
      preflightState: "review-required",
      previewState: "review-required",
      readyForApprovalRequest: true,
      hardBlockers: ["mini-kv.store-would-mutate"],
      warnings: ["approval-required-before-real-execution"],
      expectedSideEffects: ["store_write", "wal_append_when_enabled"],
      preview: {} as OperationApprovalEvidenceReport["request"]["preview"],
    },
    upstreamEvidence: {
      javaApprovalStatus: {
        status: "not_applicable",
        message: "not applicable for mini-kv SET preview",
      },
      javaExecutionContract: {
        status: "not_applicable",
        message: "not applicable for mini-kv SET preview",
      },
      miniKvExplainCoverage: {
        status: "available",
        message: "EXPLAINJSON returned command shape",
      },
      miniKvExecutionContract: {
        status: "available",
        message: "CHECKJSON kept execution_allowed=false",
      },
    },
    nextActions: ["Archive this evidence before requesting any real execution."],
  };
}

function operationApprovalVerificationFixture(): OperationApprovalEvidenceVerification {
  return {
    service: "orderops-node",
    verifiedAt: "2026-07-07T00:01:00.000Z",
    valid: true,
    requestId: "request-v2167",
    decisionId: "decision-v2167",
    state: "approved",
    storedDigest: {
      ...digest("e"),
      coveredFields: ["service", "requestId", "summary"],
    },
    recomputedDigest: {
      ...digest("e"),
      coveredFields: ["service", "requestId", "summary"],
    },
    checks: {
      digestValid: true,
      requestMatches: true,
      decisionPresent: true,
      decisionMatchesRequest: true,
      requestPreviewDigestValid: true,
      decisionDigestValid: true,
      summaryMatches: true,
      upstreamEvidenceMatchesSummary: true,
      javaApprovalDigestEvidenceValid: true,
      javaExecutionContractEvidenceValid: true,
      miniKvCommandDigestEvidenceValid: true,
      miniKvSideEffectCountMatches: true,
      miniKvExecutionContractEvidenceValid: true,
      nextActionsMatch: true,
      upstreamUntouched: true,
    },
    summary: operationApprovalReportFixture().summary,
    nextActions: ["Keep approval evidence read-only until execution gate review completes."],
  };
}

function promotionAuditTrailFixture(): OpsPromotionReleaseAuditTrailRecord {
  return {
    service: "orderops-node",
    generatedAt: "2026-07-07T00:02:00.000Z",
    auditTrailName: "promotion-release-audit-v2167",
    receiptName: "deployment-execution-receipt-v2167",
    executionName: "deployment-execution-record-v2167",
    changeRecordName: "deployment-change-record-v2167",
    approvalName: "deployment-approval-v2167",
    releaseArchiveName: "release-archive-v2167",
    evidenceName: "release-evidence-v2167",
    completionName: "handoff-completion-v2167",
    closureName: "handoff-closure-v2167",
    receiptRecordName: "handoff-receipt-v2167",
    certificateName: "handoff-certificate-v2167",
    packageName: "handoff-package-v2167",
    archiveName: "promotion-archive-v2167",
    state: "blocked",
    valid: true,
    handoffReady: false,
    approvalReady: false,
    changeReady: false,
    executionReady: false,
    receiptReady: true,
    auditReady: false,
    auditDigest: {
      ...digest("a"),
      coveredFields: ["auditTrailName", "state", "auditItems"],
    },
    receiptDigest: digest("b"),
    verifiedReceiptDigest: digest("b"),
    executionDigest: digest("c"),
    changeDigest: digest("d"),
    approvalDigest: digest("e"),
    releaseArchiveDigest: digest("f"),
    decision: {
      totalDecisions: 1,
      latestDecisionId: "promotion-decision-v2167",
      latestOutcome: "blocked",
    },
    verification: {
      receiptVerified: true,
      receiptDigestValid: true,
      receiptItemsValid: true,
      receiptReferenceValid: true,
      closeoutReady: false,
      receiptItemCount: 4,
      auditItemCount: 2,
    },
    auditItems: [
      {
        name: "deployment-execution-receipt",
        valid: true,
        digest: digest("b"),
        source: "/receipt",
        detail: "receipt present",
      },
      {
        name: "verified-deployment-execution-receipt",
        valid: true,
        digest: digest("c"),
        source: "/receipt/verification",
        detail: "verification present",
      },
    ],
    nextActions: ["Complete readiness before recording an approved promotion decision."],
  };
}

function digest(value: string): { algorithm: "sha256"; value: string; coveredFields: string[] } {
  return {
    algorithm: "sha256",
    value: value.repeat(64),
    coveredFields: ["fixture"],
  };
}

function sha256(value: string): string {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}
