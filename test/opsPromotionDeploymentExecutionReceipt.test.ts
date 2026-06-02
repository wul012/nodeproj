import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion deployment execution and receipt routes", () => {
  it("builds promotion deployment execution record as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyExecutionRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-execution-reviewer",
          note: "build deployment execution record",
        },
      });
      const changeRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record",
      });
      const changeRecordVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      });
      const executionRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record?format=markdown",
      });

      expect(emptyExecutionRecord.statusCode).toBe(200);
      expect(emptyExecutionRecord.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          changeRecordVerified: true,
          changeDigestValid: true,
          changeItemsValid: true,
          changeReferenceValid: true,
          closeoutReady: false,
          changeItemCount: 4,
          executionItemCount: 4,
        },
      });
      expect(emptyExecutionRecord.json().executionName).toMatch(/^promotion-deployment-execution-[a-f0-9]{12}$/);
      expect(emptyExecutionRecord.json().executionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyExecutionRecord.json().executionItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-change-record",
        "verified-deployment-change-record",
        "deployment-approval",
        "deployment-execution-state",
      ]);
      expect(emptyExecutionRecord.json().executionItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(changeRecord.statusCode).toBe(200);
      expect(changeRecordVerification.statusCode).toBe(200);
      expect(executionRecord.statusCode).toBe(200);
      expect(executionRecord.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          changeRecordVerified: true,
          changeDigestValid: true,
          changeItemsValid: true,
          changeReferenceValid: true,
          closeoutReady: false,
          changeItemCount: 4,
          executionItemCount: 4,
        },
      });
      expect(executionRecord.json().executionName).toMatch(/^promotion-deployment-execution-[a-f0-9]{12}$/);
      expect(executionRecord.json().executionDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(executionRecord.json().executionDigest.coveredFields).toEqual([
        "executionName",
        "changeRecordName",
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "changeReady",
        "executionReady",
        "changeDigest",
        "verifiedChangeDigest",
        "approvalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "executionItems",
        "nextActions",
      ]);
      expect(executionRecord.json().changeRecordName).toBe(changeRecord.json().changeRecordName);
      expect(executionRecord.json().changeDigest.value).toBe(changeRecord.json().changeDigest.value);
      expect(executionRecord.json().changeDigest.value).toBe(changeRecordVerification.json().recomputedChangeDigest.value);
      expect(executionRecord.json().executionItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(executionRecord.json().executionItems[1]).toMatchObject({
        name: "verified-deployment-change-record",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      });
      expect(executionRecord.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment execution record");
      expect(markdown.body).toContain("- Execution ready: false");
      expect(markdown.body).toContain(`- Execution digest: sha256:${executionRecord.json().executionDigest.value}`);
      expect(markdown.body).toContain("- Change record verified: true");
      expect(markdown.body).toContain("## Execution Items");
      expect(markdown.body).toContain("### verified-deployment-change-record");
    } finally {
      await app.close();
    }
  });

  it("verifies promotion deployment execution record as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-execution-verifier",
          note: "verify deployment execution record",
        },
      });
      const executionRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record",
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        checks: {
          executionDigestValid: true,
          coveredFieldsMatch: true,
          executionItemsValid: true,
          executionNameMatches: true,
          changeRecordNameMatches: true,
          changeDigestMatches: true,
          verifiedChangeDigestMatches: true,
          approvalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          executionItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          executionReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().executionDigest.value).toBe(emptyVerification.json().recomputedExecutionDigest.value);
      expect(emptyVerification.json().executionItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-change-record",
        "verified-deployment-change-record",
        "deployment-approval",
        "deployment-execution-state",
      ]);
      expect(emptyVerification.json().executionItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(emptyVerification.json().executionItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(executionRecord.statusCode).toBe(200);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        checks: {
          executionDigestValid: true,
          coveredFieldsMatch: true,
          executionItemsValid: true,
          executionNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          approvalReadyMatches: true,
          changeReadyMatches: true,
          executionReadyMatches: true,
          changeDigestMatches: true,
          verifiedChangeDigestMatches: true,
          approvalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          executionItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          executionReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().executionName).toBe(executionRecord.json().executionName);
      expect(verification.json().executionDigest.value).toBe(executionRecord.json().executionDigest.value);
      expect(verification.json().executionDigest.value).toBe(verification.json().recomputedExecutionDigest.value);
      expect(verification.json().executionItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().executionItems.every((item: { sourceMatches: boolean }) => item.sourceMatches)).toBe(true);
      expect(verification.json().executionItems[1]).toMatchObject({
        name: "verified-deployment-change-record",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment execution record verification");
      expect(markdown.body).toContain("- Execution digest valid: true");
      expect(markdown.body).toContain(`- Recomputed execution digest: sha256:${verification.json().recomputedExecutionDigest.value}`);
      expect(markdown.body).toContain("## Execution Items");
      expect(markdown.body).toContain("### verified-deployment-change-record");
      expect(markdown.body).toContain("## Summary");
    } finally {
      await app.close();
    }
  });

  it("builds promotion deployment execution receipt as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyReceipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-receipt-reviewer",
          note: "build deployment execution receipt",
        },
      });
      const executionRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record",
      });
      const executionRecordVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      });
      const executionReceipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt?format=markdown",
      });

      expect(emptyReceipt.statusCode).toBe(200);
      expect(emptyReceipt.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          executionRecordVerified: true,
          executionDigestValid: true,
          executionItemsValid: true,
          executionReferenceValid: true,
          closeoutReady: false,
          executionItemCount: 4,
          receiptItemCount: 4,
        },
      });
      expect(emptyReceipt.json().receiptName).toMatch(/^promotion-deployment-receipt-[a-f0-9]{12}$/);
      expect(emptyReceipt.json().receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyReceipt.json().receiptItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-execution-record",
        "verified-deployment-execution-record",
        "deployment-change-record",
        "deployment-receipt-state",
      ]);
      expect(emptyReceipt.json().receiptItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(executionRecord.statusCode).toBe(200);
      expect(executionRecordVerification.statusCode).toBe(200);
      expect(executionReceipt.statusCode).toBe(200);
      expect(executionReceipt.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          executionRecordVerified: true,
          executionDigestValid: true,
          executionItemsValid: true,
          executionReferenceValid: true,
          closeoutReady: false,
          executionItemCount: 4,
          receiptItemCount: 4,
        },
      });
      expect(executionReceipt.json().receiptName).toMatch(/^promotion-deployment-receipt-[a-f0-9]{12}$/);
      expect(executionReceipt.json().receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(executionReceipt.json().receiptDigest.coveredFields).toEqual([
        "receiptName",
        "executionName",
        "changeRecordName",
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptRecordName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "changeReady",
        "executionReady",
        "receiptReady",
        "executionDigest",
        "verifiedExecutionDigest",
        "changeDigest",
        "approvalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "receiptItems",
        "nextActions",
      ]);
      expect(executionReceipt.json().executionName).toBe(executionRecord.json().executionName);
      expect(executionReceipt.json().executionDigest.value).toBe(executionRecord.json().executionDigest.value);
      expect(executionReceipt.json().executionDigest.value).toBe(
        executionRecordVerification.json().recomputedExecutionDigest.value,
      );
      expect(executionReceipt.json().receiptRecordName).toBe(executionRecord.json().receiptName);
      expect(executionReceipt.json().receiptItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(executionReceipt.json().receiptItems[1]).toMatchObject({
        name: "verified-deployment-execution-record",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      });
      expect(executionReceipt.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment execution receipt");
      expect(markdown.body).toContain("- Receipt ready: false");
      expect(markdown.body).toContain(`- Receipt digest: sha256:${executionReceipt.json().receiptDigest.value}`);
      expect(markdown.body).toContain("- Execution record verified: true");
      expect(markdown.body).toContain("## Receipt Items");
      expect(markdown.body).toContain("### verified-deployment-execution-record");
    } finally {
      await app.close();
    }
  });

  it("verifies promotion deployment execution receipt as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-receipt-verifier",
          note: "verify deployment execution receipt",
        },
      });
      const receipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt",
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        checks: {
          receiptDigestValid: true,
          coveredFieldsMatch: true,
          receiptItemsValid: true,
          receiptNameMatches: true,
          executionNameMatches: true,
          executionDigestMatches: true,
          verifiedExecutionDigestMatches: true,
          changeDigestMatches: true,
          approvalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          receiptItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          executionReady: false,
          receiptReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().receiptDigest.value).toBe(emptyVerification.json().recomputedReceiptDigest.value);
      expect(emptyVerification.json().receiptItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-execution-record",
        "verified-deployment-execution-record",
        "deployment-change-record",
        "deployment-receipt-state",
      ]);
      expect(emptyVerification.json().receiptItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(emptyVerification.json().receiptItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(receipt.statusCode).toBe(200);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        checks: {
          receiptDigestValid: true,
          coveredFieldsMatch: true,
          receiptItemsValid: true,
          receiptNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          approvalReadyMatches: true,
          changeReadyMatches: true,
          executionReadyMatches: true,
          receiptReadyMatches: true,
          executionDigestMatches: true,
          verifiedExecutionDigestMatches: true,
          changeDigestMatches: true,
          approvalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          receiptItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          executionReady: false,
          receiptReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().receiptName).toBe(receipt.json().receiptName);
      expect(verification.json().receiptDigest.value).toBe(receipt.json().receiptDigest.value);
      expect(verification.json().receiptDigest.value).toBe(verification.json().recomputedReceiptDigest.value);
      expect(verification.json().receiptItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().receiptItems.every((item: { sourceMatches: boolean }) => item.sourceMatches)).toBe(true);
      expect(verification.json().receiptItems[1]).toMatchObject({
        name: "verified-deployment-execution-record",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment execution receipt verification");
      expect(markdown.body).toContain("- Receipt digest valid: true");
      expect(markdown.body).toContain(`- Recomputed receipt digest: sha256:${verification.json().recomputedReceiptDigest.value}`);
      expect(markdown.body).toContain("## Receipt Items");
      expect(markdown.body).toContain("### verified-deployment-execution-record");
      expect(markdown.body).toContain("## Summary");
    } finally {
      await app.close();
    }
  });

});
