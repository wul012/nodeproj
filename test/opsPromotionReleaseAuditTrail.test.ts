import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion release audit trail routes", () => {
  it("builds promotion release audit trail record as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyAuditTrail = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-audit-trail-record",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "release-audit-reviewer",
          note: "build release audit trail record",
        },
      });
      const receipt = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt",
      });
      const receiptVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
      });
      const auditTrail = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-audit-trail-record",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-audit-trail-record?format=markdown",
      });

      expect(emptyAuditTrail.statusCode).toBe(200);
      expect(emptyAuditTrail.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        auditReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          receiptVerified: true,
          receiptDigestValid: true,
          receiptItemsValid: true,
          receiptReferenceValid: true,
          closeoutReady: false,
          receiptItemCount: 4,
          auditItemCount: 4,
        },
      });
      expect(emptyAuditTrail.json().auditTrailName).toMatch(/^promotion-release-audit-[a-f0-9]{12}$/);
      expect(emptyAuditTrail.json().auditDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyAuditTrail.json().auditItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-execution-receipt",
        "verified-deployment-execution-receipt",
        "deployment-execution-record",
        "release-audit-state",
      ]);
      expect(emptyAuditTrail.json().auditItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(receipt.statusCode).toBe(200);
      expect(receiptVerification.statusCode).toBe(200);
      expect(auditTrail.statusCode).toBe(200);
      expect(auditTrail.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        executionReady: false,
        receiptReady: false,
        auditReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          receiptVerified: true,
          receiptDigestValid: true,
          receiptItemsValid: true,
          receiptReferenceValid: true,
          closeoutReady: false,
          receiptItemCount: 4,
          auditItemCount: 4,
        },
      });
      expect(auditTrail.json().auditTrailName).toMatch(/^promotion-release-audit-[a-f0-9]{12}$/);
      expect(auditTrail.json().auditDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(auditTrail.json().auditDigest.coveredFields).toEqual([
        "auditTrailName",
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
        "auditReady",
        "receiptDigest",
        "verifiedReceiptDigest",
        "executionDigest",
        "changeDigest",
        "approvalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "auditItems",
        "nextActions",
      ]);
      expect(auditTrail.json().receiptName).toBe(receipt.json().receiptName);
      expect(auditTrail.json().receiptDigest.value).toBe(receipt.json().receiptDigest.value);
      expect(auditTrail.json().receiptDigest.value).toBe(receiptVerification.json().recomputedReceiptDigest.value);
      expect(auditTrail.json().auditItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(auditTrail.json().auditItems[1]).toMatchObject({
        name: "verified-deployment-execution-receipt",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
      });
      expect(auditTrail.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion release audit trail record");
      expect(markdown.body).toContain("- Audit ready: false");
      expect(markdown.body).toContain(`- Audit digest: sha256:${auditTrail.json().auditDigest.value}`);
      expect(markdown.body).toContain("- Receipt verified: true");
      expect(markdown.body).toContain("## Audit Items");
      expect(markdown.body).toContain("### verified-deployment-execution-receipt");
    } finally {
      await app.close();
    }
  });

});
