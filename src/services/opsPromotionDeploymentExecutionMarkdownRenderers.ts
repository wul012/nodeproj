import type {
  OpsPromotionDeploymentExecutionReceipt,
  OpsPromotionDeploymentExecutionReceiptVerification,
  OpsPromotionDeploymentExecutionRecord,
  OpsPromotionDeploymentExecutionRecordVerification,
} from "./opsPromotionArchiveBundleTypes.js";
import {
  executionReceiptCheckSpec,
  executionReceiptSpec,
  executionRecordCheckSpec,
  executionRecordSpec,
} from "./promotionMarkdown/execution.js";
import { renderMarkdownSpec } from "./promotionMarkdownEngine.js";

export function renderOpsPromotionDeploymentExecutionRecordMarkdown(
  record: OpsPromotionDeploymentExecutionRecord,
): string {
  return renderMarkdownSpec(executionRecordSpec(record));
}

export function renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown(
  verification: OpsPromotionDeploymentExecutionRecordVerification,
): string {
  return renderMarkdownSpec(executionRecordCheckSpec(verification));
}

export function renderOpsPromotionDeploymentExecutionReceiptMarkdown(
  receipt: OpsPromotionDeploymentExecutionReceipt,
): string {
  return renderMarkdownSpec(executionReceiptSpec(receipt));
}

export function renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown(
  verification: OpsPromotionDeploymentExecutionReceiptVerification,
): string {
  return renderMarkdownSpec(executionReceiptCheckSpec(verification));
}
