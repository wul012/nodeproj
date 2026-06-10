import { describe, expect, it } from "vitest";

import {
  renderOpsPromotionDeploymentApprovalMarkdown as renderApprovalFromEntry,
  renderOpsPromotionDeploymentApprovalVerificationMarkdown as renderApprovalVerificationFromEntry,
  renderOpsPromotionDeploymentChangeRecordMarkdown as renderChangeRecordFromEntry,
  renderOpsPromotionDeploymentChangeRecordVerificationMarkdown as renderChangeRecordVerificationFromEntry,
  renderOpsPromotionDeploymentExecutionReceiptMarkdown as renderExecutionReceiptFromEntry,
  renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown as renderExecutionReceiptVerificationFromEntry,
  renderOpsPromotionDeploymentExecutionRecordMarkdown as renderExecutionRecordFromEntry,
  renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown as renderExecutionRecordVerificationFromEntry,
  renderOpsPromotionReleaseArchiveMarkdown as renderReleaseArchiveFromEntry,
  renderOpsPromotionReleaseArchiveVerificationMarkdown as renderReleaseArchiveVerificationFromEntry,
  renderOpsPromotionReleaseAuditTrailRecordMarkdown as renderAuditTrailFromEntry,
  renderOpsPromotionReleaseEvidenceMarkdown as renderReleaseEvidenceFromEntry,
  renderOpsPromotionReleaseEvidenceVerificationMarkdown as renderReleaseEvidenceVerificationFromEntry,
} from "../src/services/opsPromotionArchiveReleaseDeploymentRenderers.js";
import {
  renderOpsPromotionDeploymentApprovalMarkdown as renderApprovalFromModule,
  renderOpsPromotionDeploymentApprovalVerificationMarkdown as renderApprovalVerificationFromModule,
  renderOpsPromotionDeploymentChangeRecordMarkdown as renderChangeRecordFromModule,
  renderOpsPromotionDeploymentChangeRecordVerificationMarkdown as renderChangeRecordVerificationFromModule,
} from "../src/services/opsPromotionDeploymentApprovalChangeMarkdownRenderers.js";
import {
  renderOpsPromotionDeploymentExecutionReceiptMarkdown as renderExecutionReceiptFromModule,
  renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown as renderExecutionReceiptVerificationFromModule,
  renderOpsPromotionDeploymentExecutionRecordMarkdown as renderExecutionRecordFromModule,
  renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown as renderExecutionRecordVerificationFromModule,
} from "../src/services/opsPromotionDeploymentExecutionMarkdownRenderers.js";
import {
  renderOpsPromotionReleaseArchiveMarkdown as renderReleaseArchiveFromModule,
  renderOpsPromotionReleaseArchiveVerificationMarkdown as renderReleaseArchiveVerificationFromModule,
  renderOpsPromotionReleaseEvidenceMarkdown as renderReleaseEvidenceFromModule,
  renderOpsPromotionReleaseEvidenceVerificationMarkdown as renderReleaseEvidenceVerificationFromModule,
} from "../src/services/opsPromotionReleaseArchiveMarkdownRenderers.js";
import {
  renderOpsPromotionReleaseAuditTrailRecordMarkdown as renderAuditTrailFromModule,
} from "../src/services/opsPromotionReleaseAuditTrailMarkdownRenderer.js";

describe("ops promotion archive release deployment renderer entrypoint", () => {
  it("keeps stable renderer re-exports after module split", () => {
    expect(renderReleaseEvidenceFromEntry).toBe(renderReleaseEvidenceFromModule);
    expect(renderReleaseEvidenceVerificationFromEntry).toBe(renderReleaseEvidenceVerificationFromModule);
    expect(renderReleaseArchiveFromEntry).toBe(renderReleaseArchiveFromModule);
    expect(renderReleaseArchiveVerificationFromEntry).toBe(renderReleaseArchiveVerificationFromModule);
    expect(renderApprovalFromEntry).toBe(renderApprovalFromModule);
    expect(renderApprovalVerificationFromEntry).toBe(renderApprovalVerificationFromModule);
    expect(renderChangeRecordFromEntry).toBe(renderChangeRecordFromModule);
    expect(renderChangeRecordVerificationFromEntry).toBe(renderChangeRecordVerificationFromModule);
    expect(renderExecutionRecordFromEntry).toBe(renderExecutionRecordFromModule);
    expect(renderExecutionRecordVerificationFromEntry).toBe(renderExecutionRecordVerificationFromModule);
    expect(renderExecutionReceiptFromEntry).toBe(renderExecutionReceiptFromModule);
    expect(renderExecutionReceiptVerificationFromEntry).toBe(renderExecutionReceiptVerificationFromModule);
    expect(renderAuditTrailFromEntry).toBe(renderAuditTrailFromModule);
  });
});
