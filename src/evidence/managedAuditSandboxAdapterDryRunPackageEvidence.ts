import {
  historicalEvidenceExists as existsSync,
  readHistoricalEvidenceFile as readFileSync,
} from "../services/historicalEvidenceResolver.js";
import { parseJsonEvidence } from "../services/jsonEvidenceUtils.js";

export const JAVA_V82_RUNBOOK = "D:/javaproj/advanced-order-platform/c/82/\u89e3\u91ca/\u8bf4\u660e.md";

export const JAVA_V82_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/86-version-82-release-approval-managed-audit-sandbox-adapter-approval-schema-guard-receipt.md";

export const JAVA_V82_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxAdapterApprovalSchemaGuardReceiptBuilder.java";

export const MINI_KV_V91_RUNBOOK = "D:/C/mini-kv/c/91/\u89e3\u91ca/\u8bf4\u660e.md";

export const MINI_KV_V91_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/147-version-91-sandbox-adapter-runtime-evidence-guard.md";

export const MINI_KV_V92_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/148-version-92-managed-audit-receipt-formatter-split.md";

export const MINI_KV_V93_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/149-version-93-runtime-evidence-receipt-formatter-split.md";

export const MINI_KV_V95_WALKTHROUGH =
  "D:/C/mini-kv/\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/151-version-95-string-utils-and-version-sweep.md";

export const MINI_KV_RUNTIME_SMOKE = "D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json";

export const MINI_KV_VERIFICATION_MANIFEST = "D:/C/mini-kv/fixtures/release/verification-manifest.json";

export const MINI_KV_CURRENT_RELEASES_WITH_SANDBOX_RECEIPT = Object.freeze(["v98", "v99", "v100", "v101", "v102"]);

export const MINI_KV_SANDBOX_RECEIPT_DIGESTS = Object.freeze([
  "fnv1a64:9e89d248ca215706",
  "fnv1a64:e718f4de6ca49014",
  "fnv1a64:3a5d3e7f4a3092f6",
  "fnv1a64:eea9770f26d0bade",
  "fnv1a64:f0cae7a4ce0674c2",
]);

export const MINI_KV_CURRENT_ARTIFACT_PATH_HINTS_WITH_SANDBOX_RECEIPT = Object.freeze([
  "c/98/",
  "c/99/",
  "c/100/",
  "c/101/",
  "c/102/",
]);

export const ENDPOINTS = Object.freeze({
  sandboxAdapterDryRunPackageJson: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package",
  sandboxAdapterDryRunPackageMarkdown: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package?format=markdown",
  sourceNodeV224Json: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan",
  javaV82Runbook: JAVA_V82_RUNBOOK,
  miniKvRuntimeSmokeEvidence: MINI_KV_RUNTIME_SMOKE,
  miniKvVerificationManifest: MINI_KV_VERIFICATION_MANIFEST,
  activePlan: "docs/plans/v223-post-external-adapter-readiness-roadmap.md",
});

export interface MiniKvRuntimeSmokeEvidence extends Record<string, unknown> {
  managed_audit_sandbox_adapter_non_participation_receipt?: Record<string, unknown>;
}

export function readMiniKvRuntimeSmokeEvidence(): MiniKvRuntimeSmokeEvidence {
  if (!existsSync(MINI_KV_RUNTIME_SMOKE)) {
    return {};
  }
  return parseJsonEvidence(readFileSync(MINI_KV_RUNTIME_SMOKE, "utf8")) as MiniKvRuntimeSmokeEvidence;
}
