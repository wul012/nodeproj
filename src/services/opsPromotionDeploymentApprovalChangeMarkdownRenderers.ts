import type {
  OpsPromotionDeploymentApproval,
  OpsPromotionDeploymentApprovalVerification,
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordVerification,
} from "./opsPromotionArchiveBundleTypes.js";
import {
  approvalCheckSpec,
  approvalSpec,
  changeRecordCheckSpec,
  changeRecordSpec,
} from "./promotionMarkdown/approval.js";
import { renderMarkdownSpec } from "./promotionMarkdownEngine.js";

export function renderOpsPromotionDeploymentApprovalMarkdown(
  approval: OpsPromotionDeploymentApproval,
): string {
  return renderMarkdownSpec(approvalSpec(approval));
}

export function renderOpsPromotionDeploymentApprovalVerificationMarkdown(
  verification: OpsPromotionDeploymentApprovalVerification,
): string {
  return renderMarkdownSpec(approvalCheckSpec(verification));
}

export function renderOpsPromotionDeploymentChangeRecordMarkdown(
  record: OpsPromotionDeploymentChangeRecord,
): string {
  return renderMarkdownSpec(changeRecordSpec(record));
}

export function renderOpsPromotionDeploymentChangeRecordVerificationMarkdown(
  verification: OpsPromotionDeploymentChangeRecordVerification,
): string {
  return renderMarkdownSpec(changeRecordCheckSpec(verification));
}
