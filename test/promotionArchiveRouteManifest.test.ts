import { describe, expect, it } from "vitest";

import {
  PROMOTION_ARCHIVE_ROUTES,
  validatePromotionRoutes,
  type PromotionArchiveRoute,
} from "../src/routes/promotionArchive/routeManifest.js";

const EXPECTED_ROUTES = [
  ["/api/v1/ops/promotion-archive", "bundle"],
  ["/api/v1/ops/promotion-archive/manifest", "manifest"],
  ["/api/v1/ops/promotion-archive/verification", "archiveVerification"],
  ["/api/v1/ops/promotion-archive/attestation", "attestation"],
  ["/api/v1/ops/promotion-archive/attestation/verification", "attestationVerification"],
  ["/api/v1/ops/promotion-archive/handoff-package", "handoffPackage"],
  ["/api/v1/ops/promotion-archive/handoff-package/verification", "handoffPackageVerification"],
  ["/api/v1/ops/promotion-archive/handoff-certificate", "certificate"],
  ["/api/v1/ops/promotion-archive/handoff-certificate/verification", "certificateVerification"],
  ["/api/v1/ops/promotion-archive/handoff-receipt", "receipt"],
  ["/api/v1/ops/promotion-archive/handoff-receipt/verification", "receiptVerification"],
  ["/api/v1/ops/promotion-archive/handoff-closure", "closure"],
  ["/api/v1/ops/promotion-archive/handoff-closure/verification", "closureVerification"],
  ["/api/v1/ops/promotion-archive/handoff-completion", "completion"],
  ["/api/v1/ops/promotion-archive/handoff-completion/verification", "completionVerification"],
  ["/api/v1/ops/promotion-archive/release-evidence", "releaseEvidence"],
  ["/api/v1/ops/promotion-archive/release-evidence/verification", "releaseEvidenceVerification"],
  ["/api/v1/ops/promotion-archive/release-archive", "releaseArchive"],
  ["/api/v1/ops/promotion-archive/release-archive/verification", "releaseArchiveVerification"],
  ["/api/v1/ops/promotion-archive/deployment-approval", "deploymentApproval"],
  ["/api/v1/ops/promotion-archive/deployment-approval/verification", "deploymentApprovalVerification"],
  ["/api/v1/ops/promotion-archive/deployment-change-record", "deploymentChangeRecord"],
  ["/api/v1/ops/promotion-archive/deployment-change-record/verification", "deploymentChangeRecordVerification"],
  ["/api/v1/ops/promotion-archive/deployment-execution-record", "deploymentExecutionRecord"],
  ["/api/v1/ops/promotion-archive/deployment-execution-record/verification", "deploymentExecutionRecordVerification"],
  ["/api/v1/ops/promotion-archive/deployment-execution-receipt", "deploymentExecutionReceipt"],
  ["/api/v1/ops/promotion-archive/deployment-execution-receipt/verification", "deploymentExecutionReceiptVerification"],
  ["/api/v1/ops/promotion-archive/release-audit-trail-record", "releaseAuditTrailRecord"],
] as const;

describe("promotion archive route manifest", () => {
  it("owns the exact ordered method, path, and artifact mapping", () => {
    expect(PROMOTION_ARCHIVE_ROUTES).toHaveLength(28);
    expect(PROMOTION_ARCHIVE_ROUTES.map(({ method, path, artifactKey }) => [
      method,
      path,
      artifactKey,
    ])).toEqual(EXPECTED_ROUTES.map(([path, artifactKey]) => ["GET", path, artifactKey]));
    expect(Object.isFrozen(PROMOTION_ARCHIVE_ROUTES)).toBe(true);
    expect(PROMOTION_ARCHIVE_ROUTES.every(Object.isFrozen)).toBe(true);
  });

  it("rejects empty, duplicate, missing, and unknown route definitions", () => {
    const first = PROMOTION_ARCHIVE_ROUTES[0] as PromotionArchiveRoute;
    const last = PROMOTION_ARCHIVE_ROUTES.at(-1) as PromotionArchiveRoute;
    const missing = PROMOTION_ARCHIVE_ROUTES.slice(0, -1);
    const duplicatePath = [
      ...PROMOTION_ARCHIVE_ROUTES.slice(0, -1),
      { ...last, path: first.path },
    ] as PromotionArchiveRoute[];
    const duplicateKey = [
      ...PROMOTION_ARCHIVE_ROUTES.slice(0, -1),
      { ...last, artifactKey: first.artifactKey },
    ] as PromotionArchiveRoute[];
    const unknownKey = [
      ...PROMOTION_ARCHIVE_ROUTES.slice(0, -1),
      { ...last, artifactKey: "unknown" },
    ] as unknown as PromotionArchiveRoute[];

    expect(() => validatePromotionRoutes([])).toThrow("exactly 28");
    expect(() => validatePromotionRoutes(missing)).toThrow("exactly 28");
    expect(() => validatePromotionRoutes(duplicatePath)).toThrow("Duplicate promotion archive route");
    expect(() => validatePromotionRoutes(duplicateKey)).toThrow("Duplicate promotion archive artifact key");
    expect(() => validatePromotionRoutes(unknownKey)).toThrow("Unknown promotion archive artifact key");
  });
});
