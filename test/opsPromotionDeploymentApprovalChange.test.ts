import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("ops promotion deployment approval and change routes", () => {
  it("builds promotion deployment approval as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyApproval = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-approval-reviewer",
          note: "build deployment approval",
        },
      });
      const releaseArchive = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/release-archive",
      });
      const approval = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval?format=markdown",
      });

      expect(emptyApproval.statusCode).toBe(200);
      expect(emptyApproval.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          releaseArchiveVerified: true,
          releaseArchiveDigestValid: true,
          archiveItemsValid: true,
          releaseArchiveReferenceValid: true,
          closeoutReady: false,
          archiveItemCount: 4,
          approvalItemCount: 4,
        },
      });
      expect(emptyApproval.json().approvalName).toMatch(/^promotion-deployment-approval-[a-f0-9]{12}$/);
      expect(emptyApproval.json().approvalDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyApproval.json().approvalItems.map((item: { name: string }) => item.name)).toEqual([
        "release-archive",
        "verified-release-archive",
        "verified-release-evidence",
        "deployment-approval-state",
      ]);
      expect(emptyApproval.json().approvalItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(releaseArchive.statusCode).toBe(200);
      expect(approval.statusCode).toBe(200);
      expect(approval.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          releaseArchiveVerified: true,
          releaseArchiveDigestValid: true,
          archiveItemsValid: true,
          releaseArchiveReferenceValid: true,
          closeoutReady: false,
          archiveItemCount: 4,
          approvalItemCount: 4,
        },
      });
      expect(approval.json().approvalName).toMatch(/^promotion-deployment-approval-[a-f0-9]{12}$/);
      expect(approval.json().approvalDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(approval.json().approvalDigest.coveredFields).toEqual([
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
        "releaseArchiveDigest",
        "verifiedReleaseArchiveDigest",
        "evidenceDigest",
        "decision",
        "verification",
        "approvalItems",
        "nextActions",
      ]);
      expect(approval.json().releaseArchiveDigest.value).toBe(releaseArchive.json().releaseArchiveDigest.value);
      expect(approval.json().releaseArchiveDigest.value).toBe(approval.json().verifiedReleaseArchiveDigest.value);
      expect(approval.json().approvalItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(approval.json().approvalItems[1]).toMatchObject({
        name: "verified-release-archive",
        valid: true,
        source: "/api/v1/ops/promotion-archive/release-archive/verification",
      });
      expect(approval.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment approval");
      expect(markdown.body).toContain("- Approval ready: false");
      expect(markdown.body).toContain(`- Approval digest: sha256:${approval.json().approvalDigest.value}`);
      expect(markdown.body).toContain("- Release archive reference valid: true");
      expect(markdown.body).toContain("## Approval Items");
      expect(markdown.body).toContain("### verified-release-archive");
    } finally {
      await app.close();
    }
  });

  it("verifies promotion deployment approval as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-approval-verifier",
          note: "verify deployment approval",
        },
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        checks: {
          approvalDigestValid: true,
          coveredFieldsMatch: true,
          approvalItemsValid: true,
          approvalNameMatches: true,
          releaseArchiveNameMatches: true,
          evidenceNameMatches: true,
          completionNameMatches: true,
          closureNameMatches: true,
          receiptNameMatches: true,
          certificateNameMatches: true,
          packageNameMatches: true,
          archiveNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          approvalReadyMatches: true,
          releaseArchiveDigestMatches: true,
          verifiedReleaseArchiveDigestMatches: true,
          evidenceDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          approvalItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().approvalDigest.value).toBe(
        emptyVerification.json().recomputedApprovalDigest.value,
      );
      expect(emptyVerification.json().approvalItems.map((item: { name: string }) => item.name)).toEqual([
        "release-archive",
        "verified-release-archive",
        "verified-release-evidence",
        "deployment-approval-state",
      ]);
      expect(emptyVerification.json().approvalItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(emptyVerification.json().approvalItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        checks: {
          approvalDigestValid: true,
          coveredFieldsMatch: true,
          approvalItemsValid: true,
          approvalNameMatches: true,
          releaseArchiveNameMatches: true,
          evidenceNameMatches: true,
          completionNameMatches: true,
          closureNameMatches: true,
          receiptNameMatches: true,
          certificateNameMatches: true,
          packageNameMatches: true,
          archiveNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          approvalReadyMatches: true,
          releaseArchiveDigestMatches: true,
          verifiedReleaseArchiveDigestMatches: true,
          evidenceDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          approvalItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().approvalName).toMatch(/^promotion-deployment-approval-[a-f0-9]{12}$/);
      expect(verification.json().approvalDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(verification.json().approvalDigest.value).toBe(verification.json().recomputedApprovalDigest.value);
      expect(verification.json().approvalItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().approvalItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(verification.json().approvalItems[1]).toMatchObject({
        name: "verified-release-archive",
        valid: true,
        source: "/api/v1/ops/promotion-archive/release-archive/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment approval verification");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain(`- Approval digest: sha256:${verification.json().approvalDigest.value}`);
      expect(markdown.body).toContain("- Approval digest valid: true");
      expect(markdown.body).toContain("## Approval Items");
      expect(markdown.body).toContain("### verified-release-archive");
    } finally {
      await app.close();
    }
  });

  it("builds promotion deployment change record as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyChangeRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-change-reviewer",
          note: "build deployment change record",
        },
      });
      const approval = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-approval",
      });
      const changeRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record?format=markdown",
      });

      expect(emptyChangeRecord.statusCode).toBe(200);
      expect(emptyChangeRecord.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        decision: {
          totalDecisions: 0,
        },
        verification: {
          approvalVerified: true,
          approvalDigestValid: true,
          approvalItemsValid: true,
          approvalReferenceValid: true,
          closeoutReady: false,
          approvalItemCount: 4,
          changeItemCount: 4,
        },
      });
      expect(emptyChangeRecord.json().changeRecordName).toMatch(/^promotion-deployment-change-[a-f0-9]{12}$/);
      expect(emptyChangeRecord.json().changeDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(emptyChangeRecord.json().changeItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-approval",
        "verified-deployment-approval",
        "verified-release-archive",
        "deployment-change-state",
      ]);
      expect(emptyChangeRecord.json().changeItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(approval.statusCode).toBe(200);
      expect(changeRecord.statusCode).toBe(200);
      expect(changeRecord.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        decision: {
          latestDecisionId: decision.json().id,
          latestOutcome: "blocked",
        },
        verification: {
          approvalVerified: true,
          approvalDigestValid: true,
          approvalItemsValid: true,
          approvalReferenceValid: true,
          closeoutReady: false,
          approvalItemCount: 4,
          changeItemCount: 4,
        },
      });
      expect(changeRecord.json().changeRecordName).toMatch(/^promotion-deployment-change-[a-f0-9]{12}$/);
      expect(changeRecord.json().changeDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(changeRecord.json().changeDigest.coveredFields).toEqual([
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
        "approvalDigest",
        "verifiedApprovalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "changeItems",
        "nextActions",
      ]);
      expect(changeRecord.json().approvalDigest.value).toBe(approval.json().approvalDigest.value);
      expect(changeRecord.json().approvalDigest.value).toBe(changeRecord.json().verifiedApprovalDigest.value);
      expect(changeRecord.json().changeItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(changeRecord.json().changeItems[1]).toMatchObject({
        name: "verified-deployment-approval",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      });
      expect(changeRecord.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment change record");
      expect(markdown.body).toContain("- Change ready: false");
      expect(markdown.body).toContain(`- Change digest: sha256:${changeRecord.json().changeDigest.value}`);
      expect(markdown.body).toContain("- Approval reference valid: true");
      expect(markdown.body).toContain("## Change Items");
      expect(markdown.body).toContain("### verified-deployment-approval");
    } finally {
      await app.close();
    }
  });

  it("verifies promotion deployment change record as JSON or Markdown", async () => {
    const app = await buildApp(loadConfig({ LOG_LEVEL: "silent" }));

    try {
      const emptyVerification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      });
      const decision = await app.inject({
        method: "POST",
        url: "/api/v1/ops/promotion-decisions",
        payload: {
          reviewer: "deployment-change-verifier",
          note: "verify deployment change record",
        },
      });
      const changeRecord = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record",
      });
      const verification = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record/verification",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/ops/promotion-archive/deployment-change-record/verification?format=markdown",
      });

      expect(emptyVerification.statusCode).toBe(200);
      expect(emptyVerification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "not-started",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        checks: {
          changeDigestValid: true,
          coveredFieldsMatch: true,
          changeItemsValid: true,
          changeRecordNameMatches: true,
          approvalDigestMatches: true,
          verifiedApprovalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 0,
          changeItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          closeoutReady: false,
        },
      });
      expect(emptyVerification.json().changeDigest.value).toBe(emptyVerification.json().recomputedChangeDigest.value);
      expect(emptyVerification.json().changeItems.map((item: { name: string }) => item.name)).toEqual([
        "deployment-approval",
        "verified-deployment-approval",
        "verified-release-archive",
        "deployment-change-state",
      ]);
      expect(emptyVerification.json().changeItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(emptyVerification.json().changeItems.every((item: { digestMatches: boolean }) => item.digestMatches)).toBe(true);
      expect(decision.statusCode).toBe(201);
      expect(changeRecord.statusCode).toBe(200);
      expect(verification.statusCode).toBe(200);
      expect(verification.json()).toMatchObject({
        service: "orderops-node",
        valid: true,
        state: "blocked",
        handoffReady: false,
        approvalReady: false,
        changeReady: false,
        checks: {
          changeDigestValid: true,
          coveredFieldsMatch: true,
          changeItemsValid: true,
          changeRecordNameMatches: true,
          validMatches: true,
          stateMatches: true,
          handoffReadyMatches: true,
          approvalReadyMatches: true,
          changeReadyMatches: true,
          approvalDigestMatches: true,
          verifiedApprovalDigestMatches: true,
          releaseArchiveDigestMatches: true,
          decisionMatches: true,
          verificationMatches: true,
          nextActionsMatch: true,
        },
        summary: {
          totalDecisions: 1,
          latestDecisionId: decision.json().id,
          changeItemCount: 4,
          handoffReady: false,
          approvalReady: false,
          changeReady: false,
          closeoutReady: false,
        },
      });
      expect(verification.json().changeRecordName).toBe(changeRecord.json().changeRecordName);
      expect(verification.json().changeDigest.value).toBe(changeRecord.json().changeDigest.value);
      expect(verification.json().changeDigest.value).toBe(verification.json().recomputedChangeDigest.value);
      expect(verification.json().changeItems.every((item: { valid: boolean }) => item.valid)).toBe(true);
      expect(verification.json().changeItems.every((item: { sourceMatches: boolean }) => item.sourceMatches)).toBe(true);
      expect(verification.json().changeItems[1]).toMatchObject({
        name: "verified-deployment-approval",
        valid: true,
        source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      });
      expect(verification.json().nextActions).toContain(
        "Complete readiness, runbook, and baseline requirements before recording an approved promotion decision.",
      );
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Promotion deployment change record verification");
      expect(markdown.body).toContain("- Change digest valid: true");
      expect(markdown.body).toContain(`- Recomputed change digest: sha256:${verification.json().recomputedChangeDigest.value}`);
      expect(markdown.body).toContain("## Change Items");
      expect(markdown.body).toContain("### verified-deployment-approval");
      expect(markdown.body).toContain("## Summary");
    } finally {
      await app.close();
    }
  });

});
